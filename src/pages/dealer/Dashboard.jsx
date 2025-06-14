import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { label: t('dealer.pendingOrders', 'Pending Orders'), value: '12' },
    { label: t('dealer.inventoryItems', 'Inventory Items'), value: '320' },
    { label: t('dealer.paymentsDue', 'Payments Due'), value: '₹45,000' },
  ];

  const recentActivities = [
    { type: 'order', action: 'Order #1234 placed', time: '5 minutes ago' },
    { type: 'inventory', action: 'Added 50 bags of fertilizer', time: '30 minutes ago' },
    { type: 'payment', action: 'Payment received from Retailer', time: '1 hour ago' },
  ];

  return (
    <div className="dealer-dashboard">
      <div className="dealer-header">
        <h1>{t('dealer.dashboard', 'Dealer Dashboard')}</h1>
        <p className="dealer-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="dealer-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="dealer-stat-card">
            <h3>{stat.label}</h3>
            <p className="dealer-stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="dealer-sections">
        <div className="dealer-recent-activity">
          <h2>{t('dealer.recentOrders', 'Recent Orders')}</h2>
          <div className="dealer-activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="dealer-activity-item">
                <span className={`dealer-activity-type ${activity.type}`}></span>
                <div className="dealer-activity-details">
                  <p>{activity.action}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dealer-quick-actions">
          <h2>{t('dealer.quickActions', 'Quick Actions')}</h2>
          <div className="dealer-action-buttons">
            <button className="dealer-action-btn dealer-primary">
              {t('dealer.addOrder', 'Add Order')}
            </button>
            <button className="dealer-action-btn">
              {t('dealer.manageInventory', 'Manage Inventory')}
            </button>
            <button className="dealer-action-btn">
              {t('dealer.viewPayments', 'View Payments')}
            </button>
            <button className="dealer-action-btn">
              {t('dealer.support', 'Support')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
