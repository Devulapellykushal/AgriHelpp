import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="settings-dashboard">
      <div className="settings-header">
        <h1>{t('admin.settings')}</h1>
        <p className="settings-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="settings-sections">
        <div className="settings-activity" style={{ width: '100%' }}>
          <h2>{t('admin.settings')}</h2>
          <div className="settings-activity-list">
            <div className="settings-activity-item">
              <div className="settings-activity-details">
                <p>Manage system settings here.</p>
                <small>Feature coming soon...</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
