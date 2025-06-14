import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Messages.css';

const Messages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="gov-agencies-messages-dashboard">
      <div className="gov-agencies-messages-header">
        <h1>{t('gov-agencies.messages', 'Messages')}</h1>
        <p className="gov-agencies-messages-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="gov-agencies-messages-sections">
        <div className="gov-agencies-messages-content" style={{ width: '100%' }}>
          <h2>{t('gov-agencies.messages', 'Agency Messages')}</h2>
          <div className="gov-agencies-messages-activity-list">
            <div className="gov-agencies-messages-activity-item">
              <div className="gov-agencies-messages-activity-details">
                <p>View and manage your agency messages here.</p>
                <small>Feature coming soon...</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages; 