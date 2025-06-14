import React, { useState } from 'react';
import { FaBox, FaCheck, FaEdit, FaEye, FaFilter, FaSearch, FaShoppingCart, FaSort, FaTimes, FaTrash, FaTruck } from 'react-icons/fa';
import './Orders.css';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Order statistics
  const orderStats = [
    {
      label: 'Total Orders',
      value: '156',
      icon: <FaShoppingCart />,
      trend: '+12.5%',
      trendDirection: 'up',
      subLabel: 'Last 30 days'
    },
    {
      label: 'Pending Orders',
      value: '12',
      icon: <FaBox />,
      trend: '-15.3%',
      trendDirection: 'down',
      subLabel: 'To be processed'
    },
    {
      label: 'Delivered Orders',
      value: '144',
      icon: <FaTruck />,
      trend: '+8.7%',
      trendDirection: 'up',
      subLabel: 'Successfully delivered'
    },
    {
      label: 'Order Value',
      value: '₹2,45,800',
      icon: <FaCheck />,
      trend: '+18.2%',
      trendDirection: 'up',
      subLabel: 'Total revenue'
    }
  ];

  // Sample orders data
  const orders = [
    {
      id: 'ORD001',
      customer: 'Rahul Sharma',
      date: '2024-02-20',
      items: [
        { name: 'Fresh Tomatoes', quantity: 2, price: '₹40/kg' },
        { name: 'Organic Potatoes', quantity: 3, price: '₹30/kg' }
      ],
      total: '₹2,450',
      status: 'Delivered',
      paymentMethod: 'UPI',
      deliveryAddress: '123 Main St, City'
    },
    {
      id: 'ORD002',
      customer: 'Priya Patel',
      date: '2024-02-20',
      items: [
        { name: 'Premium Rice', quantity: 5, price: '₹80/kg' },
        { name: 'Fresh Apples', quantity: 2, price: '₹120/kg' }
      ],
      total: '₹1,850',
      status: 'Processing',
      paymentMethod: 'Card',
      deliveryAddress: '456 Park Ave, City'
    },
    {
      id: 'ORD003',
      customer: 'Amit Kumar',
      date: '2024-02-19',
      items: [
        { name: 'Organic Onions', quantity: 4, price: '₹35/kg' },
        { name: 'Fresh Spinach', quantity: 1, price: '₹25/bunch' }
      ],
      total: '₹3,200',
      status: 'Pending',
      paymentMethod: 'Cash',
      deliveryAddress: '789 Lake View, City'
    },
    {
      id: 'ORD004',
      customer: 'Neha Singh',
      date: '2024-02-19',
      items: [
        { name: 'Premium Wheat', quantity: 10, price: '₹45/kg' },
        { name: 'Fresh Mangoes', quantity: 3, price: '₹150/kg' }
      ],
      total: '₹2,100',
      status: 'Delivered',
      paymentMethod: 'UPI',
      deliveryAddress: '321 Garden St, City'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      type: 'order_created',
      orderId: 'ORD005',
      customer: 'Rajesh Verma',
      time: '10:30 AM',
      date: '2024-02-21'
    },
    {
      type: 'order_delivered',
      orderId: 'ORD001',
      customer: 'Rahul Sharma',
      time: '09:45 AM',
      date: '2024-02-21'
    },
    {
      type: 'order_updated',
      orderId: 'ORD002',
      customer: 'Priya Patel',
      time: '09:15 AM',
      date: '2024-02-21'
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
      label: 'Process Orders',
      icon: <FaBox />,
      action: () => console.log('Process orders')
    },
    {
      label: 'Update Status',
      icon: <FaTruck />,
      action: () => console.log('Update status')
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
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order_created':
        return <FaShoppingCart className="activity-icon created" />;
      case 'order_delivered':
        return <FaCheck className="activity-icon delivered" />;
      case 'order_updated':
        return <FaEdit className="activity-icon updated" />;
      case 'order_cancelled':
        return <FaTimes className="activity-icon cancelled" />;
      default:
        return null;
    }
  };

  const getActivityText = (type) => {
    switch (type) {
      case 'order_created':
        return 'New order created';
      case 'order_delivered':
        return 'Order delivered';
      case 'order_updated':
        return 'Order status updated';
      case 'order_cancelled':
        return 'Order cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="retailer-orders">
      <div className="orders-header">
        <div className="header-content">
          <h1>Orders Management</h1>
          <p className="welcome-message">Manage and track all your orders in one place.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn">
            <FaShoppingCart /> New Order
          </button>
        </div>
      </div>

      <div className="orders-grid">
        <div className="main-content">
          {/* Order Statistics */}
          <section className="orders-section">
            <div className="statistics-grid">
              {orderStats.map((stat, index) => (
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

          {/* Orders Filters */}
          <section className="orders-section">
            <div className="filters-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filters-group">
                <div className="filter-item">
                  <FaFilter className="filter-icon" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div className="filter-item">
                  <FaFilter className="filter-icon" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="filter-item">
                  <FaSort className="sort-icon" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="status">Sort by Status</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Orders List */}
          <section className="orders-section">
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <span className="order-id">{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <span className={`order-status ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="customer-info">
                      <h3>{order.customer}</h3>
                      <p className="delivery-address">{order.deliveryAddress}</p>
                      <p className="payment-method">Payment: {order.paymentMethod}</p>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-summary">
                      <div className="order-total">
                        <span className="total-label">Total Amount</span>
                        <span className="total-value">{order.total}</span>
                      </div>
                      <div className="order-actions">
                        <button className="action-btn view">
                          <FaEye /> View
                        </button>
                        <button className="action-btn edit">
                          <FaEdit /> Edit
                        </button>
                        <button className="action-btn delete">
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="orders-sidebar">
          {/* Recent Activities */}
          <section className="sidebar-section">
            <h2>Recent Activities</h2>
            <div className="activities-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <span className="activity-type">
                        {getActivityText(activity.type)}
                      </span>
                      <span className="activity-time">
                        {activity.time}
                      </span>
                    </div>
                    <div className="activity-details">
                      <span className="order-id">{activity.orderId}</span>
                      <span className="customer-name">{activity.customer}</span>
                    </div>
                    <div className="activity-date">{activity.date}</div>
                  </div>
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

export default Orders;
