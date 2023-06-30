import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

import db from '../../firebase';

function CasesTable() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [editModal, setEditModal] = useState(false);

  // Fetch cases data from Firebase
  const fetchCases = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cases'));
      const casesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCases(casesData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  // Delete a case from Firebase
  const deleteCase = async (caseId) => {
    try {
      await deleteDoc(doc(db, 'cases', caseId));
      // Perform any necessary actions after successful deletion
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  // Update the status of a case in Firebase
  const updateCaseStatus = async (caseId, newStatus) => {
    try {
      const caseRef = doc(db, 'cases', caseId);
      await updateDoc(caseRef, { status: newStatus });
      // Perform any necessary actions after successful update
      fetchCases(); // Fetch updated cases data
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

  useEffect(() => {
    fetchCases();
  }, []);

  const getStatusBadgeColor = (status) => {
    if (status === 'resolved') {
      return 'success';
    } else if (status === 'not resolved') {
      return 'primary';
    }
    return 'primary';
  };

  const getStatusBadgeLabel = (status) => {
    if (status === 'resolved') {
      return 'resolved';
    } else if (status === 'not resolved') {
      return 'not resolved';
    }
    return 'not resolved';
  };

  return (
    <div>
      <h2>Cases Table</h2>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col' className='fw-bold'>#</th> {/* New column for numbering */}
            {/* <th scope='col' className='fw-bold'>Client ID</th> */}
            <th scope='col'>phone number</th>
            <th scope='col'>Description</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Location</th>
            <th scope='col'>Status</th>
            <th scope='col'>Type</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {cases.map((caseItem, index) => (
            <tr key={caseItem.id}>
              <td>{index + 1}</td> {/* Display the index + 1 */}
              {/* <td>{caseItem.client_id}</td> */}
              <td>{caseItem.phone_number}</td>
              <td>{caseItem.description}</td>
              <td>{caseItem.gender}</td>
              <td>{caseItem.assignedTo}</td>
              <td>
                <MDBBadge color={getStatusBadgeColor(caseItem.status)} pill>
                  {getStatusBadgeLabel(caseItem.status)}
                </MDBBadge>
              </td>
              <td>{caseItem.type}</td>
              <td>
                {/* Add buttons for editing and deleting the case */}
                <MDBBtn color='link' rounded size='sm' onClick={() => openEditModal(caseItem)}>
                  Edit
                </MDBBtn>
                <MDBBtn color='link' rounded size='sm' onClick={() => deleteCase(caseItem.id)}>
                  Delete
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
              {selectedCase && selectedCase.status === 'resolved' ? 'not resolved' : 'resolved'}?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={closeEditModal}>
                Cancel
              </MDBBtn>
              <MDBBtn
                onClick={() =>
                  updateCaseStatus(
                    selectedCase.id,
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
}

export default CasesTable;
