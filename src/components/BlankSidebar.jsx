import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BlankSidebar.css';

const BlankSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="blank-sidebar">
      <div className="blank-sidebar-content" />
      <button onClick={handleLogout} className="logout-btn">
        {t('sidebar.logout')}
      </button>
    </div>
  );
};

export default BlankSidebar; 