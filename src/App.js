import Navbar from './components/navbar';
import Home from './pages/home';
import React from 'react';
import SignUp from './pages/auth/signin';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './components/profile';
import { AuthProvider } from './pages/auth/auth';
import { Login } from './pages/auth/signin';
import { RequireAuth } from './components/RequireAuth';
function App() {
  return (
    <AuthProvider>
  <div className="app">
    <Navbar/>
    
    <Routes>
        <Route index element={<Login />} />

        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login/>} />
        
      </Routes>

    
  </div>
  </AuthProvider>
  );
}

export default App;
