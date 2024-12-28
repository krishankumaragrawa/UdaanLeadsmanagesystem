import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/leads" className="nav-link">Leads Management</Link>
          </li>
          <li>
            <Link to="/contacts" className="nav-link">Contacts Management</Link>
          </li>
          <li>
            <Link to="/interactions" className="nav-link">Interaction History</Link>
          </li>
          <li>
            <Link to="/performance" className="nav-link">Performance Reports</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          {/* Search Bar */}
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." className="search-input" />
          </div>

          {/* Notification and Profile Icons */}
          <div className="header-icons">
            <FaBell className="notification-icon" />
            <FaUserCircle className="profile-icon" />
          </div>
        </header>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="quick-action-btn">Add New Lead</button>
          <button className="quick-action-btn">Add New Contact</button>
          <button className="quick-action-btn">Log Call/Order</button>
        </div>

        {/* Content */}
        <div className="content">
          <h1>Welcome to the Dashboard</h1>
          <p>Select an option from the sidebar to proceed.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
