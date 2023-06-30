import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { firebaseApp } from '../../firebase'; // Importing firebaseApp from your Firebase setup
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './white.png';
import './sign.css';

const auth = getAuth(firebaseApp);

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading state to true

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the user's role from the 'handlers' collection
      const handlersRef = firebaseApp.firestore().collection('handlers');
      const userSnapshot = await handlersRef.doc(user.uid).get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data();

        if (userData.role === 'admin') {
          // User is an admin, proceed with login
          login(email);

          // Display success toast
          toast.success('Successfully logged in');

          // Clear email and password inputs
          setEmail('');
          setPassword('');

          navigate('/dashboard');
          return;
        }
      }

      // User is not an admin or doesn't exist in the 'handlers' collection
      throw new Error('Unauthorized access');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false
    }

    // Display error toast after setting loading state to false
    toast.error('Unauthorized access');

    // Clear email and password inputs
    setEmail('');
    setPassword('');
  };

  return (
    <div className="text-center">
      <main className="form-signin">
        <img className="mb-4" src={logo} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          onClick={handleLogin}
          disabled={loading} // Disable the button while loading
        >
          {loading ? ( // Display loading spinner if loading, otherwise display "Sign in" text
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </main>
      <ToastContainer /> {/* Add ToastContainer outside the main element */}
    </div>
  );
};
