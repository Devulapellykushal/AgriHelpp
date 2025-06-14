import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminSidebarItems } from '../sidebarConfig/admin';
import './ResourceProviderSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="resource-provider-sidebar">
      <div className="user-info">
        <h3>{user?.role}</h3>
        <p>{user?.email}</p>
      </div>
      <nav>
        {adminSidebarItems.map(item => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
            {item.icon}
            {item.label}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="logout-btn">
          {t('sidebar.logout')}
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar; 