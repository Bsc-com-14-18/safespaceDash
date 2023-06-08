import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { auth } from '../../firebase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      login(email); // Assuming you want to use the email as the user identifiers
     
      
      navigate('/');
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <label>
        Email: <input type='email' onChange={e => setEmail(e.target.value)} />
      </label>{' '}
      <label>
        Password: <input type='password' onChange={e => setPassword(e.target.value)} />
      </label>{' '}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
