import Navbar from './components/navbar';
import Home from './pages/home';
import db from "./firebase";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const ref = db.collection("cases");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [documentCount, setDocumentCount] = useState(null);

  const getDocumentCount = async () => {
    const querySnapshot = await getDocs(collection(db, 'cases'));
    return querySnapshot.size;
  };

  console.log(ref);

  const fetchDocumentCount = async () => {
    const count = await getDocumentCount('cases');
    setDocumentCount(count);
    console.log(count);
  };

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    fetchDocumentCount();
    getData();
  }, []);

  return (
    <div className="App">
      <Navbar/>
      {!loader && (
        <table className="cases-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dev) => (
              <tr key={dev.client_id}>
                <td>{dev.type}</td>
                <td>{dev.status}</td>
                <td>{dev.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="content">

      <div>
      {documentCount !== null ? (
        <p>number of cases: {documentCount}</p>
      ) : (
        <p>Loading document count...</p>
      )}
    </div>
        {/* <Home/> */}
      </div>
    </div>
  );
}

export default App;
