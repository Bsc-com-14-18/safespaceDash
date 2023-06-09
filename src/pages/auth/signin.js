import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { auth } from '../../firebase';
import logo from './white.png';
import { toast, ToastContainer } from 'react-toastify';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      login(email); // Assuming you want to use the email as the user identifier
      
      // Display success toast
      toast.success('Successfully logged in');
      
      // Clear email and password inputs
      setEmail('');
      setPassword('');
      
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
   // Empty dependency array to ensure the effect runs only once

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="logo" />
        <label>
          Email: <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
