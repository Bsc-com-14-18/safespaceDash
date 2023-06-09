import React, { useEffect, useState } from 'react';
import { useAuth } from '../pages/auth/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase'; // Replace with your Firebase configuration
import { auth } from '../firebase';

const Profile = () => {
  const auth1 = useAuth();
  const navigate = useNavigate();
  const [handlerData, setHandlerData] = useState(null);
  

  const handleLogout = () => {
    auth1.logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchHandlerData = async () => {
      try {
        const handlerId = auth.currentUser.uid;
        console.log(handlerId)

        const q = query(collection(db, 'handlers'), where('handlerId', '==', handlerId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        const handler = querySnapshot.docs[0].data();
        setHandlerData(handler);
      } catch (error) {
        console.error('Error fetching handler data:', error);
      }
    };

    fetchHandlerData();
  }, [auth.currentUser]);

  return (
    <div >
      {handlerData ? (
        <div>
          <h2>Welcome {handlerData.name}</h2>
          <p>Email: {handlerData.email}</p>
          <p>Handler ID: {handlerData.handlerId}</p>
          {/* Render other handler details */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading handler data...</p>
      )}
    </div>
  );
};

export default Profile;













// import React from 'react'
// import { useAuth } from '../pages/auth/auth'
// import { useNavigate, useLocation } from 'react-router-dom'

// const Profile = () => {
//   const auth = useAuth()
//   const navigate = useNavigate()
//   const handleLogout = () => {
//     auth.logout()
//     navigate('/')
//   }
//   return (
//     <div>welcome {auth.user}
//     <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default Profile