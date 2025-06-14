import React from 'react';
import { useTranslation } from 'react-i18next';
import './DealerDashboard.css';

const DealerDashboard = () => {
  const { t } = useTranslation();
  const dealerStats = [
    { label: t('pendingOrders'), value: 8, icon: '📦' },
    { label: t('inventoryItems'), value: 120, icon: '📊' },
    { label: t('paymentsDue'), value: 3, icon: '💰' },
  ];
  const recentOrders = [
    { id: 'ORD-1001', date: '2024-06-01', status: t('pending'), amount: '₹12,000' },
    { id: 'ORD-1000', date: '2024-05-28', status: t('completed'), amount: '₹8,500' },
    { id: 'ORD-0999', date: '2024-05-25', status: t('shipped'), amount: '₹15,200' },
  ];
  return (
    <div className="dealer-dashboard-container">
      <div className="dealer-welcome-card">
        <h1>{t('welcomeDealer', { name: localStorage.getItem('userName') || 'Dealer' })}</h1>
        <p>{t('dealerDashboardIntro')}</p>
      </div>
      <div className="dealer-stats-grid">
        {dealerStats.map(stat => (
          <div className="dealer-stat-card" key={stat.label}>
            <span className="dealer-stat-icon">{stat.icon}</span>
            <div>
              <div className="dealer-stat-value">{stat.value}</div>
              <div className="dealer-stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="dealer-main-content">
        <div className="dealer-recent-orders">
          <h2>{t('recentOrders')}</h2>
          <table className="dealer-orders-table">
            <thead>
              <tr>
                <th>{t('orderId')}</th>
                <th>{t('date')}</th>
                <th>{t('status')}</th>
                <th>{t('amount')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dealer-inventory-overview">
          <h2>{t('inventoryOverview')}</h2>
          <ul>
            <li>Wheat: 40 units</li>
            <li>Rice: 30 units</li>
            <li>Maize: 20 units</li>
            <li>Soybean: 15 units</li>
          </ul>
        </div>
      </div>
      <div className="dealer-quick-actions-support">
        <div className="dealer-quick-actions">
          <h3>{t('quickActions')}</h3>
          <button className="dealer-action-btn">{t('addOrder')}</button>
          <button className="dealer-action-btn">{t('manageInventory')}</button>
          <button className="dealer-action-btn">{t('viewPayments')}</button>
        </div>
        <div className="dealer-support-info">
          <h3>{t('support')}</h3>
          <p>{t('dealerSupportText')}</p>
          <a href="mailto:support@agrihelp.com" className="dealer-support-link">support@agrihelp.com</a>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard; 