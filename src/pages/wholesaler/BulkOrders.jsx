import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaChartBar,
    FaClipboardList,
    FaFilter,
    FaHistory,
    FaPlus,
    FaSearch,
    FaSort
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './BulkOrders.css';

const BulkOrders = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const mockOrders = [
    {
      id: 'BO001',
      customer: 'Farm Fresh Market',
      items: [
        { name: 'Organic Tomatoes', quantity: 500, unit: 'kg' },
        { name: 'Fresh Spinach', quantity: 200, unit: 'kg' }
      ],
      totalAmount: 25000,
      status: 'pending',
      date: '2024-03-15',
      deliveryDate: '2024-03-20'
    },
    {
      id: 'BO002',
      customer: 'Green Grocers Co.',
      items: [
        { name: 'Organic Potatoes', quantity: 1000, unit: 'kg' },
        { name: 'Fresh Carrots', quantity: 300, unit: 'kg' }
      ],
      totalAmount: 18000,
      status: 'processing',
      date: '2024-03-14',
      deliveryDate: '2024-03-19'
    }
  ];

  const stats = {
    totalOrders: 156,
    pendingOrders: 12,
    processingOrders: 8,
    completedOrders: 136,
    totalRevenue: 1250000
  };

  const renderOrderCard = (order) => (
    <div className="order-card" key={order.id}>
      <div className="order-header">
        <h3>Order #{order.id}</h3>
        <span className={`status-badge ${order.status}`}>{order.status}</span>
      </div>
      <div className="order-details">
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Order Date:</strong> {order.date}</p>
        <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
        <div className="order-items">
          <h4>Items:</h4>
          {order.items.map((item, index) => (
            <p key={index}>
              {item.name} - {item.quantity} {item.unit}
            </p>
          ))}
        </div>
        <p className="order-total"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      </div>
      <div className="order-actions">
        <button className="btn-primary">View Details</button>
        <button className="btn-secondary">Update Status</button>
      </div>
    </div>
  );

  return (
    <div className="wholesaler-bulkorders-dashboard">
      <div className="wholesaler-bulkorders-header">
        <div className="header-content">
          <h1>{t('wholesaler.bulkOrders', 'Bulk Orders')}</h1>
          <p className="wholesaler-bulkorders-welcome-message">
            {t('welcome')}, {user?.email}!
          </p>
        </div>
        <button className="create-order-btn">
          <FaPlus /> Create New Order
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <FaClipboardList />
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaHistory />
          <div className="stat-info">
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaChartBar />
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="orders-container">
        <div className="orders-header">
          <div className="tabs">
            <button 
              className={activeTab === 'active' ? 'active' : ''} 
              onClick={() => setActiveTab('active')}
            >
              Active Orders
            </button>
            <button 
              className={activeTab === 'history' ? 'active' : ''} 
              onClick={() => setActiveTab('history')}
            >
              Order History
            </button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <FaFilter /> Filter
            </button>
            <button className="sort-btn">
              <FaSort /> Sort
            </button>
          </div>
        </div>

        <div className="orders-list">
          {mockOrders.map(order => renderOrderCard(order))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn">
            <FaPlus /> New Order
          </button>
          <button className="action-btn">
            <FaHistory /> View Reports
          </button>
          <button className="action-btn">
            <FaChartBar /> Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOrders;
