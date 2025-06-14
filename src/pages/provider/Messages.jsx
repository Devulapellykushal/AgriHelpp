import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import '../provider/Messages.css';

const Messages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="provider-messages-dashboard">
      <div className="provider-messages-header">
        <h1>{t('provider.messages', 'Messages')}</h1>
        <p className="provider-messages-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="provider-messages-sections">
        <div className="provider-messages-overview" style={{ width: '100%' }}>
          <h2>{t('provider.messages', 'Messages Overview')}</h2>
          <div className="provider-messages-activity-list">
            <div className="provider-messages-activity-item">
              <div className="provider-messages-activity-details">
                <p>View and manage messages here.</p>
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
