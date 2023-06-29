import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from './auth/auth';
import db, { auth } from '../firebase';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [documentCount, setDocumentCount] = useState(null);
  const [caseType, setCaseType] = useState('');
  const [matchingCases, setMatchingCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    const fetchHandlerCaseType = async () => {
      try {
        const handlerId = auth.currentUser.uid;
        const q = query(collection(db, 'hanlderCaseType'), where('handlerId', '==', handlerId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        const handlerCaseType = querySnapshot.docs[0].data().caseTypeId;
        const trimmedCaseType = handlerCaseType.trim();
        setCaseType(trimmedCaseType);

        // Retrieve cases with matching caseTypeId, assignedTo, and other conditions
        const casesQuery = query(collection(db, 'cases'), where('type', '==', trimmedCaseType));
        // Add more conditions if needed

        const casesSnapshot = await getDocs(casesQuery);
        const cases = casesSnapshot.docs.map((doc) => doc.data());
        setMatchingCases(cases);
        console.log('Cases:', cases);
      } catch (error) {
        console.error('Error fetching handler case type:', error);
      }
    };

    fetchHandlerCaseType();
  }, []);

  const getStatusBadgeColor = (status) => {
    if (status === 'resolved') {
      return 'success';
    } else if (status === 'unresolved') {
      return 'primary';
    }
    return 'primary';
  };

  const getStatusBadgeLabel = (status) => {
    if (status === 'resolved') {
      return 'resolved';
    } else if (status === 'unresolved') {
      return 'unresolved';
    }
    return 'unresolved';
  };

  // Update the status of a case in Firebase
  const updateCaseStatus = async (caseId, newStatus) => {
    try {
      const caseRef = doc(db, 'cases', caseId);
      await updateDoc(caseRef, { status: newStatus });
      // Perform any necessary actions after successful update
      const updatedCases = matchingCases.map((caseData) => {
        if (caseData.client_id === caseId) {
          return { ...caseData, status: newStatus };
        }
        return caseData;
      });
      setMatchingCases(updatedCases);
      closeEditModal();
    } catch (error) {
      console.error('Error updating case status:', error);
    }
  };

  // Open the edit modal for the selected case
  const openEditModal = (caseItem) => {
    setSelectedCase(caseItem);
    setEditModal(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setSelectedCase(null);
    setEditModal(false);
  };

  return (
    <div>
      <h2>my cases</h2>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Client ID</th>
            <th scope='col'>Description</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Location</th>
            <th scope='col'>Status</th>
            <th scope='col'>Type</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {matchingCases.map((caseData, index) => (
            <tr key={caseData.client_id}>
              <td>
                <div className='d-flex align-items-center'>{caseData.client_id}</div>
              </td>
              <td>{caseData.description}</td>
              <td>{caseData.gender}</td>
              <td>{caseData.location}</td>
              <td>
                <MDBBadge color={getStatusBadgeColor(caseData.status)} pill>
                  {getStatusBadgeLabel(caseData.status)}
                </MDBBadge>
              </td>
              <td>{caseData.type}</td>
              <td>
                <MDBBtn color='link' rounded size='sm' onClick={() => openEditModal(caseData)}>
                  Edit
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Edit Modal */}
      <MDBModal show={editModal} onHide={closeEditModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Case Status</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeEditModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Are you sure you want to change the status of this case to{' '}
              {selectedCase && selectedCase.status === 'resolved' ? 'unresolved' : 'resolved'}?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={closeEditModal}>
                Cancel
              </MDBBtn>
              <MDBBtn
                onClick={() =>
                  updateCaseStatus(
                    selectedCase.client_id,
                    selectedCase && selectedCase.status === 'resolved' ? 'unresolved' : 'resolved'
                  )
                }
              >
                Change Status
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Home;
