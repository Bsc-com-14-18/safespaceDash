import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { auth } from '../../firebase';
import logo from './white.png';
import { toast, ToastContainer } from 'react-toastify';
import './sign.css'

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

    <div class="text-center">
    
    <main class="form-signin">
     
        <img class="mb-4" src={logo} alt="" width="72" height="57"/>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}/>
          <label for="floatingInput">Email address</label>
        </div>
        <br/>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}/>
          <label for="floatingPassword">Password</label>
        </div>
    
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit"
        onClick={handleLogin}>Sign in</button>
        
     
    </main>
    
    
        
      </div>
    

  );
};


    // <div className="login-container">
    //   <div className="login-form">
    //     <img src={logo} alt="Logo" className="logo" />
    //     <label>
    //       Email: <input type="email" onChange={(e) => setEmail(e.target.value)} />
    //     </label>
    //     <label>
    //       Password: <input type="password" onChange={(e) => setPassword(e.target.value)} />
    //     </label>
    //     <button onClick={handleLogin}>Login</button>
    //   </div>
    // </div>