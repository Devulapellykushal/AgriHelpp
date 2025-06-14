import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Logs.css';

const Logs = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="logs-dashboard">
      <div className="logs-header">
        <h1>{t('admin.systemLogs')}</h1>
        <p className="logs-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="logs-sections">
        <div className="logs-activity" style={{ width: '100%' }}>
          <h2>{t('admin.systemLogs')}</h2>
          <div className="logs-activity-list">
            <div className="logs-activity-item">
              <div className="logs-activity-details">
                <p>System started successfully.</p>
                <small>Today, 09:00 AM</small>
              </div>
            </div>
            <div className="logs-activity-item">
              <div className="logs-activity-details">
                <p>User admin logged in.</p>
                <small>Today, 09:05 AM</small>
              </div>
            </div>
            <div className="logs-activity-item">
              <div className="logs-activity-details">
                <p>Database backup completed.</p>
                <small>Yesterday, 11:00 PM</small>
              </div>
            </div>
            {/* Add more log entries here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
