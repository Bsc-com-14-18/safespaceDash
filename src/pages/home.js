import { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './auth/auth';
import db from '../firebase';
import { auth } from '../firebase';


const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [documentCount, setDocumentCount] = useState(null);

 
 

  const [caseType, setCaseType] = useState('');
  
  const [matchingCases, setMatchingCases] = useState([]);

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
        setCaseType(handlerCaseType.trim());

      // Retrieve cases with matching caseTypeId, assignedTo, and other conditions
      const casesQuery = query(collection(db, 'cases'), 
        where('type', '==', 'harassement')
        // Add more conditions if needed
      );

      const casesSnapshot = await getDocs(casesQuery);
      const cases = casesSnapshot.docs.map(doc => doc.data());
      setMatchingCases(cases);
      console.log('Cases:', cases);
      } catch (error) {
        console.error('Error fetching handler case type:', error);
      }
    }; 

    fetchHandlerCaseType();
  }, []);


 
  return (
    <div className="A">
      <h1>hello</h1>
      <h2>Handler's Case Type: {caseType}</h2>

      <ul>
        {matchingCases.map((caseData) => (
          <li key={caseData.client_id}>{caseData.description}</li>
        ))}
      </ul>
      {/* {!loader ? (
        <table className="cases-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((caseItem) => (
              <tr key={caseItem.client_id}>
                <td>{caseItem.type}</td>
                <td>{caseItem.status}</td>
                <td>{caseItem.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default Home;
