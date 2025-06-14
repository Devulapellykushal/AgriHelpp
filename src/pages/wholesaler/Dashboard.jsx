import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaArrowDown,
  FaArrowUp,
  FaBox,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaClipboardList,
  FaMoneyBillWave,
  FaTruck,
  FaWarehouse
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');

  // Enhanced statistics with trends
  const stats = [
    { 
      label: t('wholesaler.totalOrders'), 
      value: '1,234',
      icon: <FaClipboardList />,
      trend: '+12.5%',
      trendDirection: 'up',
      subLabel: 'Last 30 days'
    },
    { 
      label: t('wholesaler.inventoryItems'), 
      value: '2,450',
      icon: <FaBox />,
      trend: '+5.2%',
      trendDirection: 'up',
      subLabel: 'Active SKUs'
    },
    { 
      label: t('wholesaler.revenue'), 
      value: '₹45,80,000',
      icon: <FaMoneyBillWave />,
      trend: '+18.3%',
      trendDirection: 'up',
      subLabel: 'Monthly revenue'
    },
    { 
      label: t('wholesaler.pendingDeliveries'), 
      value: '28',
      icon: <FaTruck />,
      trend: '-3.1%',
      trendDirection: 'down',
      subLabel: 'Active deliveries'
    }
  ];

  // Inventory status
  const inventoryStatus = [
    { category: 'Grains', stock: 1250, capacity: 2000, status: 'healthy' },
    { category: 'Vegetables', stock: 850, capacity: 1200, status: 'warning' },
    { category: 'Fruits', stock: 620, capacity: 1000, status: 'healthy' },
    { category: 'Dairy', stock: 450, capacity: 800, status: 'critical' }
  ];

  // Recent orders with more details
  const recentOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'Farm Fresh Market',
      items: 'Wheat, Rice, Pulses',
      amount: '₹85,000',
      status: 'processing',
      date: '2024-03-15',
      priority: 'high'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Green Grocers Co.',
      items: 'Vegetables, Fruits',
      amount: '₹45,000',
      status: 'pending',
      date: '2024-03-14',
      priority: 'medium'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Organic Foods Ltd',
      items: 'Organic Grains, Spices',
      amount: '₹1,25,000',
      status: 'completed',
      date: '2024-03-13',
      priority: 'low'
    }
  ];

  // Performance metrics
  const performanceMetrics = [
    { label: 'Order Fulfillment Rate', value: '94.5%', target: '95%', status: 'warning' },
    { label: 'On-time Delivery', value: '96.2%', target: '98%', status: 'warning' },
    { label: 'Customer Satisfaction', value: '4.7/5', target: '4.8/5', status: 'healthy' },
    { label: 'Inventory Turnover', value: '12.3', target: '15', status: 'critical' }
  ];

  // Upcoming deliveries
  const upcomingDeliveries = [
    { id: 'DEL-001', customer: 'Farm Fresh Market', items: 'Wheat, Rice', date: '2024-03-16', status: 'scheduled' },
    { id: 'DEL-002', customer: 'Green Grocers Co.', items: 'Vegetables', date: '2024-03-17', status: 'preparing' },
    { id: 'DEL-003', customer: 'Organic Foods Ltd', items: 'Organic Grains', date: '2024-03-18', status: 'scheduled' }
  ];

  // Market insights
  const marketInsights = [
    { category: 'Wheat', trend: 'up', price: '₹2,800/quintal', change: '+5.2%' },
    { category: 'Rice', trend: 'down', price: '₹3,200/quintal', change: '-2.1%' },
    { category: 'Vegetables', trend: 'up', price: '₹45/kg', change: '+8.5%' },
    { category: 'Fruits', trend: 'stable', price: '₹120/kg', change: '0.0%' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      healthy: '#4CAF50',
      warning: '#FFA726',
      critical: '#F44336',
      processing: '#2196F3',
      pending: '#FFA726',
      completed: '#4CAF50',
      scheduled: '#2196F3',
      preparing: '#FFA726'
    };
    return colors[status] || '#757575';
  };

  return (
    <div className="wholesaler-dashboard">
      <div className="wholesaler-header">
        <div className="header-content">
          <h1>{t('wholesaler.dashboard')}</h1>
          <p className="wholesaler-welcome-message">
            {t('welcome')}, {user?.email}!
          </p>
        </div>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''} 
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      {/* Main Statistics */}
      <div className="wholesaler-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="wholesaler-stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.label}</h3>
              <p className="stat-value">{stat.value}</p>
              <div className="stat-trend">
                <span className={`trend ${stat.trendDirection}`}>
                  {stat.trendDirection === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  {stat.trend}
                </span>
                <span className="sub-label">{stat.subLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Inventory Status */}
        <div className="dashboard-card inventory-status">
          <h2><FaWarehouse /> Inventory Status</h2>
          <div className="inventory-list">
            {inventoryStatus.map((item, index) => (
              <div key={index} className="inventory-item">
                <div className="inventory-header">
                  <span className="category">{item.category}</span>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ 
                      width: `${(item.stock / item.capacity) * 100}%`,
                      backgroundColor: getStatusColor(item.status)
                    }}
                  ></div>
                </div>
                <div className="inventory-details">
                  <span>{item.stock} units</span>
                  <span>of {item.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="dashboard-card recent-orders">
          <h2><FaClipboardList /> Recent Orders</h2>
          <div className="orders-list">
            {recentOrders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-details">
                  <p className="customer">{order.customer}</p>
                  <p className="items">{order.items}</p>
                  <div className="order-footer">
                    <span className="amount">{order.amount}</span>
                    <span className="date">{order.date}</span>
                    <span className={`priority ${order.priority}`}>{order.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="dashboard-card performance-metrics">
          <h2><FaChartBar /> Performance Metrics</h2>
          <div className="metrics-list">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-header">
                  <span className="label">{metric.label}</span>
                  <span className={`status ${metric.status}`}>{metric.status}</span>
                </div>
                <div className="metric-value">
                  <span className="current">{metric.value}</span>
                  <span className="target">Target: {metric.target}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ 
                      width: `${(parseFloat(metric.value) / parseFloat(metric.target)) * 100}%`,
                      backgroundColor: getStatusColor(metric.status)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deliveries */}
        <div className="dashboard-card upcoming-deliveries">
          <h2><FaTruck /> Upcoming Deliveries</h2>
          <div className="deliveries-list">
            {upcomingDeliveries.map((delivery, index) => (
              <div key={index} className="delivery-item">
                <div className="delivery-header">
                  <span className="delivery-id">{delivery.id}</span>
                  <span className={`status ${delivery.status}`}>{delivery.status}</span>
                </div>
                <div className="delivery-details">
                  <p className="customer">{delivery.customer}</p>
                  <p className="items">{delivery.items}</p>
                  <div className="delivery-footer">
                    <span className="date">
                      <FaCalendarAlt /> {delivery.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="dashboard-card market-insights">
          <h2><FaChartLine /> Market Insights</h2>
          <div className="insights-list">
            {marketInsights.map((insight, index) => (
              <div key={index} className="insight-item">
                <div className="insight-header">
                  <span className="category">{insight.category}</span>
                  <span className={`trend ${insight.trend}`}>
                    {insight.trend === 'up' ? <FaArrowUp /> : 
                     insight.trend === 'down' ? <FaArrowDown /> : '—'}
                  </span>
                </div>
                <div className="insight-details">
                  <span className="price">{insight.price}</span>
                  <span className={`change ${insight.trend}`}>{insight.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn primary">
              <FaClipboardList /> New Order
            </button>
            <button className="action-btn">
              <FaBox /> Manage Inventory
            </button>
            <button className="action-btn">
              <FaTruck /> Schedule Delivery
            </button>
            <button className="action-btn">
              <FaChartBar /> View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
