import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Users.css';

const Users = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="users-dashboard">
      <div className="users-header">
        <h1>{t('admin.userManagement')}</h1>
        <p className="users-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="users-sections">
        <div className="users-activity" style={{ width: '100%' }}>
          <h2>{t('admin.userManagement')}</h2>
          <div className="users-activity-list">
            <div className="users-activity-item">
              <div className="users-activity-details">
                <p>Manage users from this page.</p>
                <small>Feature coming soon...</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
