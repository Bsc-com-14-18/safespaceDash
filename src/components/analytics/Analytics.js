import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import db from '../../firebase';

function CasesTable() {
  const [cases, setCases] = useState([]);

  // Fetch cases data from Firebase
  const fetchCases = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cases'));
      const casesData = querySnapshot.docs.map((doc) => doc.data());
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


  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Client ID</th>
            <th>Description</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.id}>
              <td>{caseItem.assignedTo}</td>
              <td>{caseItem.client_id}</td>
              <td>{caseItem.description}</td>
              <td>{caseItem.gender}</td>
              <td>{caseItem.location}</td>
              <td>{caseItem.status}</td>
              <td>{caseItem.type}</td>
              <td>
                {/* Add buttons for editing and deleting the case */}
                <button>Edit</button>
                <button >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CasesTable;
