import React from 'react'
import logo from '../../images/purple.png';
import './Header.css'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/auth';
import './index'
import Dashboard from '../dashboard/dashboard';

function Header() {
  const auth = useAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };
  return (
    <div className='header'>Header
      <nav>
        <div className="logo-name">
          <div className="logo-image">
            <img src={logo} alt="" />
          </div>
          <span className="logo_name">
            safeSpace
          </span>
        </div>
        

        <div class="menu-items">
            <ul class="nav-links">
                <li>
                <a href="#">
                  
                    <i class="uil uil-estate"></i>
                    <span class="link-name"><NavLink to="/dashboard">Dashboard</NavLink></span>
                    </a>
                </li>
                <li><a href="#">
                    <i class="uil uil-user-circle"></i>
                    <span class="link-name">   
                       <NavLink to="/profile">profile</NavLink>
                    </span>
                </a></li>
                <li><a href="#">
                    <i class="uil uil-chart"></i>
                    <span class="link-name">Analytics</span>
                </a></li>
                <li><a href="#">
                <i class="uil uil-envelope-open"></i>
                    <span class="link-name">resolved cases</span>
                </a></li>
                <li><a href="#">
                <i class="uil uil-envelope"></i>
                    <span class="link-name">unread cases</span>
                </a></li>

                {!auth.user && (
                                  <li><a href="#">
                                  <i class="uil uil-signin"></i>
                                      <span class="link-name">   <NavLink to='/login' >
                                        Login
                                         </NavLink></span>
                                  </a></li>
                 )}

            </ul>
            
            <ul class="logout-mode">
                <li><a href="#">
                    <i class="uil uil-signout"></i>
                    <span class="link-name" onClick={handleLogout}>Logout</span>
                </a></li>
                <li class="mode">
                    <a href="#">
                        <i class="uil uil-moon"></i>
                    <span class="link-name">Dark Mode</span>
                </a>
                <div class="mode-toggle">
                  <span class="switch"></span>
                </div>
            </li>
            </ul>
        </div>
      </nav>

    
    </div>
  )
}

export default Header