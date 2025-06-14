import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { label: t('admin.totalUsers'), value: '1,234' },
    { label: t('admin.activeUsers'), value: '890' },
    { label: t('admin.totalResources'), value: '567' },
    { label: t('admin.systemHealth'), value: '98%' },
  ];

  const recentActivities = [
    { type: 'user', action: 'New user registration', time: '2 minutes ago' },
    { type: 'resource', action: 'Resource provider added', time: '15 minutes ago' },
    { type: 'system', action: 'System update completed', time: '1 hour ago' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>{t('admin.dashboard')}</h1>
        <p className="welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="recent-activity">
          <h2>{t('admin.recentActivity')}</h2>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className={`activity-type ${activity.type}`}></span>
                <div className="activity-details">
                  <p>{activity.action}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h2>{t('admin.quickActions')}</h2>
          <div className="action-buttons">
            <button className="action-btn primary">
              {t('admin.manageUsers')}
            </button>
            <button className="action-btn">
              {t('admin.viewLogs')}
            </button>
            <button className="action-btn">
              {t('admin.generateReport')}
            </button>
            <button className="action-btn">
              {t('admin.systemSettings')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 