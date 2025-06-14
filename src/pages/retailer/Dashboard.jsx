import React, { useState } from 'react';
import { FaBox, FaChartLine, FaMoneyBillWave, FaShoppingBag, FaShoppingCart, FaStore, FaTruck, FaUsers } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Enhanced statistics with trends
  const statistics = [
    {
      label: 'Total Sales',
      value: '₹45,280',
      icon: <FaShoppingCart />,
      trend: '+12.5%',
      trendDirection: 'up',
      subLabel: 'Last 7 days'
    },
    {
      label: 'Inventory Items',
      value: '156',
      icon: <FaBox />,
      trend: '-3.2%',
      trendDirection: 'down',
      subLabel: 'Across all categories'
    },
    {
      label: 'Daily Revenue',
      value: '₹6,470',
      icon: <FaMoneyBillWave />,
      trend: '+8.7%',
      trendDirection: 'up',
      subLabel: 'Average per day'
    },
    {
      label: 'Pending Orders',
      value: '12',
      icon: <FaTruck />,
      trend: '-15.3%',
      trendDirection: 'down',
      subLabel: 'To be delivered'
    }
  ];

  // Store performance metrics
  const performanceMetrics = [
    {
      label: 'Store Rating',
      value: '4.8',
      icon: <FaStore />,
      trend: '+0.2',
      trendDirection: 'up',
      subLabel: 'Out of 5.0'
    },
    {
      label: 'Customer Satisfaction',
      value: '92%',
      icon: <FaUsers />,
      trend: '+5%',
      trendDirection: 'up',
      subLabel: 'Based on feedback'
    },
    {
      label: 'Order Fulfillment',
      value: '98%',
      icon: <FaShoppingBag />,
      trend: '+2%',
      trendDirection: 'up',
      subLabel: 'On-time delivery'
    },
    {
      label: 'Growth Rate',
      value: '15.3%',
      icon: <FaChartLine />,
      trend: '+3.2%',
      trendDirection: 'up',
      subLabel: 'Month over month'
    }
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'Rahul Sharma',
      items: 5,
      amount: '₹2,450',
      status: 'Delivered',
      date: '2024-02-20'
    },
    {
      id: 'ORD002',
      customer: 'Priya Patel',
      items: 3,
      amount: '₹1,850',
      status: 'Processing',
      date: '2024-02-20'
    },
    {
      id: 'ORD003',
      customer: 'Amit Kumar',
      items: 7,
      amount: '₹3,200',
      status: 'Pending',
      date: '2024-02-19'
    },
    {
      id: 'ORD004',
      customer: 'Neha Singh',
      items: 4,
      amount: '₹2,100',
      status: 'Delivered',
      date: '2024-02-19'
    }
  ];

  // Top selling products
  const topProducts = [
    {
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      sales: '₹12,500',
      units: 250,
      trend: '+15%'
    },
    {
      name: 'Organic Potatoes',
      category: 'Vegetables',
      sales: '₹8,750',
      units: 175,
      trend: '+8%'
    },
    {
      name: 'Premium Rice',
      category: 'Grains',
      sales: '₹7,200',
      units: 120,
      trend: '+12%'
    },
    {
      name: 'Fresh Apples',
      category: 'Fruits',
      sales: '₹6,800',
      units: 85,
      trend: '+5%'
    }
  ];

  // Inventory alerts
  const inventoryAlerts = [
    {
      item: 'Fresh Spinach',
      category: 'Vegetables',
      currentStock: 5,
      threshold: 10,
      status: 'critical'
    },
    {
      item: 'Organic Onions',
      category: 'Vegetables',
      currentStock: 8,
      threshold: 15,
      status: 'warning'
    },
    {
      item: 'Premium Wheat',
      category: 'Grains',
      currentStock: 12,
      threshold: 20,
      status: 'warning'
    }
  ];

  // Customer insights
  const customerInsights = [
    {
      metric: 'New Customers',
      value: '28',
      change: '+15%',
      period: 'This Week'
    },
    {
      metric: 'Repeat Customers',
      value: '65%',
      change: '+8%',
      period: 'Last 30 Days'
    },
    {
      metric: 'Average Order Value',
      value: '₹1,850',
      change: '+12%',
      period: 'This Month'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      label: 'New Order',
      icon: <FaShoppingCart />,
      action: () => console.log('Create new order')
    },
    {
      label: 'Update Inventory',
      icon: <FaBox />,
      action: () => console.log('Update inventory')
    },
    {
      label: 'View Reports',
      icon: <FaChartLine />,
      action: () => console.log('View reports')
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getAlertStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <div className="retailer-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, Retailer!</h1>
          <p className="welcome-message">Here's what's happening with your store today.</p>
        </div>
        <div className="header-actions">
          <div className="time-range-selector">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-range-select"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="main-content">
          {/* Statistics Section */}
          <section className="dashboard-section">
            <h2>Store Overview</h2>
            <div className="statistics-grid">
              {statistics.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <h3>{stat.label}</h3>
                    <div className="stat-value">{stat.value}</div>
                    <div className={`stat-trend ${stat.trendDirection}`}>
                      {stat.trend}
                      <span className="trend-icon">
                        {stat.trendDirection === 'up' ? '↑' : '↓'}
                      </span>
                    </div>
                    <div className="stat-sub-label">{stat.subLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="dashboard-section">
            <h2>Performance Metrics</h2>
            <div className="metrics-grid">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-icon">{metric.icon}</div>
                  <div className="metric-content">
                    <h3>{metric.label}</h3>
                    <div className="metric-value">{metric.value}</div>
                    <div className={`metric-trend ${metric.trendDirection}`}>
                      {metric.trend}
                      <span className="trend-icon">
                        {metric.trendDirection === 'up' ? '↑' : '↓'}
                      </span>
                    </div>
                    <div className="metric-sub-label">{metric.subLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Orders */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <button className="view-all-btn">View All Orders</button>
            </div>
            <div className="orders-list">
              {recentOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className={`order-status ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="customer-info">
                      <span className="customer-name">{order.customer}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div className="order-summary">
                      <span className="items-count">{order.items} items</span>
                      <span className="order-amount">{order.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Selling Products */}
          <section className="dashboard-section">
            <h2>Top Selling Products</h2>
            <div className="products-list">
              {topProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-category">{product.category}</div>
                  </div>
                  <div className="product-metrics">
                    <div className="product-sales">
                      <span className="sales-label">Sales</span>
                      <span className="sales-value">{product.sales}</span>
                    </div>
                    <div className="product-units">
                      <span className="units-label">Units</span>
                      <span className="units-value">{product.units}</span>
                    </div>
                    <div className="product-trend">
                      <span className="trend-value">{product.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="dashboard-sidebar">
          {/* Inventory Alerts */}
          <section className="sidebar-section">
            <h2>Inventory Alerts</h2>
            <div className="alerts-list">
              {inventoryAlerts.map((alert, index) => (
                <div key={index} className={`alert-card ${getAlertStatusColor(alert.status)}`}>
                  <div className="alert-header">
                    <span className="alert-item">{alert.item}</span>
                    <span className="alert-category">{alert.category}</span>
                  </div>
                  <div className="alert-details">
                    <div className="stock-info">
                      <span className="current-stock">Current: {alert.currentStock}</span>
                      <span className="threshold">Threshold: {alert.threshold}</span>
                    </div>
                    <div className="alert-status">{alert.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Customer Insights */}
          <section className="sidebar-section">
            <h2>Customer Insights</h2>
            <div className="insights-list">
              {customerInsights.map((insight, index) => (
                <div key={index} className="insight-card">
                  <div className="insight-metric">{insight.metric}</div>
                  <div className="insight-value">{insight.value}</div>
                  <div className="insight-change">{insight.change}</div>
                  <div className="insight-period">{insight.period}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="sidebar-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="action-button"
                  onClick={action.action}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-label">{action.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
