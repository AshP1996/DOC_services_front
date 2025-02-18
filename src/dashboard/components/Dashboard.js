import React, { useState } from 'react';
import '../styles/dashboard.css';
import Profile from './Profile'; // Importing Profile component
import Chat from './Chat'; // Placeholder for Chat component
import Settings from './Settings'; // Placeholder for Settings component
import Appointments from './Appointments'; // Placeholder for Appointments component
import UpdateProfile from './UpdateProfile';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('welcome');

  const renderContent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'UpdateProfile':
          return <UpdateProfile />;  
      case 'chat':
        return <Chat />;
      case 'settings':
        return <Settings />;
      case 'appointments':
        return <Appointments />;
      default:
        return (
          <div className="welcome-page">
            <h1>Welcome to the Dashboard</h1>
            <p>Select an option from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul>
          <li onClick={() => setActiveComponent('profile')}>Profile</li>
          <li onClick={() => setActiveComponent('UpdateProfile')}>Update Profile</li>

          <li onClick={() => setActiveComponent('chat')}>Chat</li>
          <li onClick={() => setActiveComponent('settings')}>Settings</li>
          <li onClick={() => setActiveComponent('appointments')}>Appointments</li>
        </ul>
      </nav>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
