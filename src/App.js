import Navbar from './components/navbar';
import Home from './pages/home';
import './index.css'
import React from 'react';
import SignUp from './pages/auth/signin';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './components/profile';
import { AuthProvider } from './pages/auth/auth';
import { Login } from './pages/auth/signin';
import { RequireAuth } from './components/RequireAuth';
import Sidebar from './components/sidebar';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/dashboard';
import CasesTable from './components/analytics/Analytics';

function App() {
  return (
    <AuthProvider>
  <div className="app">
    <Header/>
  
    
    
    <Routes>
        <Route index element={<Login />} />
       

        <Route
          path='/dashboard'
          element={
            <RequireAuth>
                  
<section>
  <Dashboard/>
</section>
            </RequireAuth>
          }
        />
<Route
  path="/allcases"
  element={
    <RequireAuth>
      <section style={{ marginLeft: '20%' }}>
        <CasesTable />
      </section>
    </RequireAuth>
  }
/>
<Route
  path="/unreadcases"
  element={
    <RequireAuth>
      <section style={{ marginLeft: '20%' }}>
        <Home />
      </section>
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
