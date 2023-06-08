import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./navbar";
import './header/Header.css';

const Sidebar = () => {
  return (
    <>
    <Navbar/>
    <div className="sidebar">
      <nav className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link active">
              <span className="feather"></span>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">
              <span className="feather"></span>
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <span className="feather"></span>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/customers" className="nav-link">
              <span className="feather"></span>
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link">
              <span className="feather"></span>
              Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/integrations" className="nav-link">
              <span className="feather"></span>
              Integrations
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <Link to="/new-report" className="link-secondary" aria-label="Add a new report">
            <span className="feather"></span>
          </Link>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link to="/current-month" className="nav-link">
              <span className="feather"></span>
              Current month
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/last-quarter" className="nav-link">
              <span className="feather"></span>
              Last quarter
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/social-engagement" className="nav-link">
              <span className="feather"></span>
              Social engagement
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/year-end-sale" className="nav-link">
              <span className="feather"></span>
              Year-end sale
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    
    </>
  );
}

export default Sidebar;
