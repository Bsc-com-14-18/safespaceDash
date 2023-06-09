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
    <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
            <img
                    className="mx-auto w-48"
                    src={process.env.PUBLIC_URL + '/white.png'}
                    alt="logo" />
                     <h4 className="mb-12 mt-1 pb-1 text-xl text-indigo-400 font-semibold text-center">
                    Login to your account
                  </h4>

                <form  onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password' 
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                    <button type="submit" class="rounded-3xl bg-blue-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-[#00FF00]">Login</button>
                    </div>
                </form>
            </div>
        </div>
  );
};
