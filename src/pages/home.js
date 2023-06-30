import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './auth/auth';
import db, { auth } from '../firebase';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

const Home = () => {
  const { user } = useAuth();
  const [matchingCases, setMatchingCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchHandlerCaseType = async () => {
      try {
        const handlerId = auth.currentUser.uid;
        const querySnapshot = await getDocs(query(collection(db, 'hanlderCaseType'), where('handlerId', '==', handlerId)));
    
        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return;
        }
    
        const handlerCaseType = querySnapshot.docs[0].data().caseTypeId.trim();
        const casesQuery = query(collection(db, 'cases'), where('type', '==', handlerCaseType), where('status', '==', 'not resolved'));
        const unsubscribe = onSnapshot(casesQuery, (snapshot) => {
          const cases = snapshot.docs.map((doc) => {
            const caseData = doc.data();
            const formattedTimestamp = new Date(caseData.timestamp).toLocaleString('en-US', { timeZone: 'Europe/Paris' }); // Adjust the timeZone as needed
            const formattedDateSent = new Date(caseData.dateSent).toLocaleString('en-US', { timeZone: 'Europe/Paris' }); // Adjust the timeZone as needed
            return { ...caseData, formattedTimestamp, formattedDateSent };
          });
          setMatchingCases(cases);
          console.log('Cases:', cases);
        });
    
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching handler case type:', error);
      }
    };
    
    fetchHandlerCaseType();
    
  }, []);

  const getStatusBadgeColor = (status) => {
    return status === 'resolved' ? 'success' : 'primary';
  };

  const getStatusBadgeLabel = (status) => {
    return status === 'resolved' ? 'resolved' : 'not resolved';
  };

  const updateCaseStatus = async (caseId, newStatus) => {
    try {
      const caseRef = doc(db, 'cases', caseId);
      await updateDoc(caseRef, { status: newStatus });

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

  const openEditModal = (caseItem) => {
    setSelectedCase(caseItem);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCase(null);
    setEditModalOpen(false);
  };

  return (
    <div>
    <h2>My Cases</h2>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Client ID</th>
          <th scope='col'>Description</th>
          <th scope='col'>Gender</th>
          <th scope='col'>Location</th>
          <th scope='col'>Phone Number</th>
          <th scope='col'>Status</th>
          <th scope='col'>Type</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {matchingCases.map((caseData, index) => (
          <tr key={caseData.client_id}>
            <td>{index + 1}</td>
            <td>{caseData.client_id}</td>
            <td>{caseData.description}</td>
            <td>{caseData.gender}</td>
            <td>{caseData.assignedTo}</td>
            <td>{caseData.phone_number}</td>
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

    <MDBModal show={editModalOpen} onHide={closeEditModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Edit Case Status</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={closeEditModal}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            Are you sure you want to change the status of this case to{' '}
            {selectedCase && selectedCase.status === 'resolved' ? 'not resolved' : 'resolved'}?
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={closeEditModal}>
              Cancel
            </MDBBtn>
            <MDBBtn
              onClick={() =>
                updateCaseStatus(
                  selectedCase.client_id,
                  selectedCase && selectedCase.status === 'resolved' ? 'not resolved' : 'resolved'
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
