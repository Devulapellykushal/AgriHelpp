import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Messages.css';

const Messages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="retailer-messages-dashboard">
      <div className="retailer-messages-header">
        <h1>{t('retailer.messages', 'Retailer Messages')}</h1>
        <p className="retailer-messages-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="retailer-messages-sections">
        <div className="retailer-messages-activity" style={{ width: '100%' }}>
          <h2>{t('retailer.messages', 'Messages')}</h2>
          <div className="retailer-messages-activity-list">
            <div className="retailer-messages-activity-item">
              <div className="retailer-messages-activity-details">
                <p>View and manage retailer messages here.</p>
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
