import Navbar from './components/navbar';
import firebase from "./firebase";
import Home from './pages/home';
import { useState, useEffect } from 'react';

function App() {
  const ref = firebase.firestore().collection("cases");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

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
        {/* <Home/> */}
      </div>
    </div>
  );
}

export default App;
