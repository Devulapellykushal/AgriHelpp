import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Reports.css';

const Reports = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="reports-dashboard">
      <div className="reports-header">
        <h1>{t('admin.reports')}</h1>
        <p className="reports-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="reports-sections">
        <div className="reports-activity" style={{ width: '100%' }}>
          <h2>{t('admin.reports')}</h2>
          <div className="reports-activity-list">
            <div className="reports-activity-item">
              <div className="reports-activity-details">
                <p>Analytics and reports will be displayed here.</p>
                <small>Feature coming soon...</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
