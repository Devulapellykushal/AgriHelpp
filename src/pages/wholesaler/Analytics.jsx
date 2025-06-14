import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaArrowDown,
    FaArrowUp,
    FaBox,
    FaChartArea,
    FaChartBar,
    FaChartLine,
    FaDollarSign,
    FaDownload,
    FaFileExport,
    FaPrint,
    FaShoppingCart,
    FaUsers
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Analytics.css';

const Analytics = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Performance metrics
  const performanceMetrics = [
    {
      label: 'Total Revenue',
      value: '₹1,25,50,000',
      icon: <FaDollarSign />,
      trend: '+15.2%',
      trendDirection: 'up',
      subLabel: 'vs last period'
    },
    {
      label: 'Total Orders',
      value: '1,250',
      icon: <FaShoppingCart />,
      trend: '+8.3%',
      trendDirection: 'up',
      subLabel: 'vs last period'
    },
    {
      label: 'Inventory Value',
      value: '₹45,00,000',
      icon: <FaBox />,
      trend: '+5.1%',
      trendDirection: 'up',
      subLabel: 'current stock'
    },
    {
      label: 'Customer Growth',
      value: '+12.5%',
      icon: <FaUsers />,
      trend: '+2.3%',
      trendDirection: 'up',
      subLabel: 'new customers'
    }
  ];

  // Sales analytics
  const salesAnalytics = {
    totalSales: '₹1,25,50,000',
    growth: '+15.2%',
    topProducts: [
      { name: 'Wheat', sales: '₹25,00,000', percentage: 20, trend: '+12.5%' },
      { name: 'Rice', sales: '₹20,00,000', percentage: 16, trend: '+8.3%' },
      { name: 'Vegetables', sales: '₹15,00,000', percentage: 12, trend: '+15.7%' },
      { name: 'Fruits', sales: '₹12,00,000', percentage: 10, trend: '+5.2%' }
    ],
    salesByCategory: [
      { category: 'Grains', value: 45, color: '#4CAF50' },
      { category: 'Vegetables', value: 30, color: '#2196F3' },
      { category: 'Fruits', value: 25, color: '#FFA726' }
    ]
  };

  // Inventory analytics
  const inventoryAnalytics = {
    totalItems: '2,500',
    lowStock: 45,
    stockValue: '₹45,00,000',
    categoryDistribution: [
      { category: 'Grains', items: 850, value: '₹20,00,000' },
      { category: 'Vegetables', items: 950, value: '₹15,00,000' },
      { category: 'Fruits', items: 700, value: '₹10,00,000' }
    ],
    stockHealth: [
      { status: 'Optimal', count: 1800, percentage: 72 },
      { status: 'Low', count: 450, percentage: 18 },
      { status: 'Critical', count: 250, percentage: 10 }
    ]
  };

  // Customer analytics
  const customerAnalytics = {
    totalCustomers: '850',
    newCustomers: '+125',
    customerRetention: '85%',
    topCustomers: [
      { name: 'Farm Fresh Market', orders: 45, value: '₹12,50,000' },
      { name: 'Green Grocers Ltd', orders: 38, value: '₹10,00,000' },
      { name: 'Organic Foods Co.', orders: 32, value: '₹8,50,000' }
    ],
    customerSegments: [
      { segment: 'Regular', count: 450, percentage: 53 },
      { segment: 'Occasional', count: 300, percentage: 35 },
      { segment: 'New', count: 100, percentage: 12 }
    ]
  };

  // Market trends
  const marketTrends = {
    priceTrends: [
      { product: 'Wheat', current: '₹2,800', change: '+5.2%', trend: 'up' },
      { product: 'Rice', current: '₹3,200', change: '+3.8%', trend: 'up' },
      { product: 'Vegetables', current: '₹40', change: '-2.1%', trend: 'down' },
      { product: 'Fruits', current: '₹250', change: '+1.5%', trend: 'up' }
    ],
    demandTrends: [
      { category: 'Grains', demand: 'High', change: '+12.5%' },
      { category: 'Vegetables', demand: 'Medium', change: '+5.3%' },
      { category: 'Fruits', demand: 'High', change: '+8.7%' }
    ]
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <FaArrowUp className="trend-icon up" />;
    if (trend === 'down') return <FaArrowDown className="trend-icon down" />;
    return null;
  };

  const renderMetricCard = (metric) => (
    <div key={metric.label} className="metric-card">
      <div className="metric-icon">{metric.icon}</div>
      <div className="metric-content">
        <h3>{metric.label}</h3>
        <p className="metric-value">{metric.value}</p>
        <div className="metric-trend">
          <span className={`trend ${metric.trendDirection}`}>
            {getTrendIcon(metric.trendDirection)}
            {metric.trend}
          </span>
          <span className="sub-label">{metric.subLabel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wholesaler-analytics">
      <div className="analytics-header">
        <div className="header-content">
          <h1>{t('wholesaler.analytics')}</h1>
          <p className="analytics-welcome-message">
            {t('welcome')}, {user?.email}!
          </p>
        </div>
        <div className="header-actions">
          <div className="filter-group">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="filter-select"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="grains">Grains</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>
          <button className="primary-btn">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="metrics-grid">
        {performanceMetrics.map(metric => renderMetricCard(metric))}
      </div>

      <div className="analytics-grid">
        {/* Sales Analytics */}
        <div className="analytics-card sales-analytics">
          <div className="card-header">
            <h2><FaChartLine /> Sales Analytics</h2>
            <div className="card-actions">
              <button className="action-btn">
                <FaFileExport /> Export
              </button>
              <button className="action-btn">
                <FaPrint /> Print
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="sales-overview">
              <div className="overview-stat">
                <span className="label">Total Sales</span>
                <span className="value">{salesAnalytics.totalSales}</span>
                <span className="trend up">
                  {getTrendIcon('up')}
                  {salesAnalytics.growth}
                </span>
              </div>
            </div>
            <div className="sales-details">
              <div className="top-products">
                <h3>Top Products</h3>
                {salesAnalytics.topProducts.map((product, index) => (
                  <div key={index} className="product-row">
                    <div className="product-info">
                      <span className="product-name">{product.name}</span>
                      <span className="product-sales">{product.sales}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ 
                          width: `${product.percentage}%`,
                          backgroundColor: '#4CAF50'
                        }}
                      ></div>
                    </div>
                    <span className="product-trend up">
                      {getTrendIcon('up')}
                      {product.trend}
                    </span>
                  </div>
                ))}
              </div>
              <div className="sales-categories">
                <h3>Sales by Category</h3>
                <div className="category-chart">
                  {salesAnalytics.salesByCategory.map((category, index) => (
                    <div key={index} className="category-bar">
                      <div 
                        className="bar" 
                        style={{ 
                          height: `${category.value}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                      <span className="category-name">{category.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Analytics */}
        <div className="analytics-card inventory-analytics">
          <div className="card-header">
            <h2><FaChartBar /> Inventory Analytics</h2>
          </div>
          <div className="card-content">
            <div className="inventory-overview">
              <div className="overview-stat">
                <span className="label">Total Items</span>
                <span className="value">{inventoryAnalytics.totalItems}</span>
              </div>
              <div className="overview-stat">
                <span className="label">Low Stock Items</span>
                <span className="value warning">{inventoryAnalytics.lowStock}</span>
              </div>
              <div className="overview-stat">
                <span className="label">Stock Value</span>
                <span className="value">{inventoryAnalytics.stockValue}</span>
              </div>
            </div>
            <div className="inventory-details">
              <div className="category-distribution">
                <h3>Category Distribution</h3>
                {inventoryAnalytics.categoryDistribution.map((category, index) => (
                  <div key={index} className="category-row">
                    <div className="category-info">
                      <span className="category-name">{category.category}</span>
                      <span className="category-value">{category.value}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ 
                          width: `${(category.items / inventoryAnalytics.totalItems) * 100}%`,
                          backgroundColor: '#2196F3'
                        }}
                      ></div>
                    </div>
                    <span className="item-count">{category.items} items</span>
                  </div>
                ))}
              </div>
              <div className="stock-health">
                <h3>Stock Health</h3>
                {inventoryAnalytics.stockHealth.map((status, index) => (
                  <div key={index} className="health-row">
                    <div className="health-info">
                      <span className="health-status">{status.status}</span>
                      <span className="health-count">{status.count} items</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ 
                          width: `${status.percentage}%`,
                          backgroundColor: status.status === 'Optimal' ? '#4CAF50' : 
                                         status.status === 'Low' ? '#FFA726' : '#F44336'
                        }}
                      ></div>
                    </div>
                    <span className="health-percentage">{status.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Analytics */}
        <div className="analytics-card customer-analytics">
          <div className="card-header">
            <h2><FaUsers /> Customer Analytics</h2>
          </div>
          <div className="card-content">
            <div className="customer-overview">
              <div className="overview-stat">
                <span className="label">Total Customers</span>
                <span className="value">{customerAnalytics.totalCustomers}</span>
              </div>
              <div className="overview-stat">
                <span className="label">New Customers</span>
                <span className="value success">{customerAnalytics.newCustomers}</span>
              </div>
              <div className="overview-stat">
                <span className="label">Customer Retention</span>
                <span className="value">{customerAnalytics.customerRetention}</span>
              </div>
            </div>
            <div className="customer-details">
              <div className="top-customers">
                <h3>Top Customers</h3>
                {customerAnalytics.topCustomers.map((customer, index) => (
                  <div key={index} className="customer-row">
                    <div className="customer-info">
                      <span className="customer-name">{customer.name}</span>
                      <span className="customer-value">{customer.value}</span>
                    </div>
                    <span className="order-count">{customer.orders} orders</span>
                  </div>
                ))}
              </div>
              <div className="customer-segments">
                <h3>Customer Segments</h3>
                {customerAnalytics.customerSegments.map((segment, index) => (
                  <div key={index} className="segment-row">
                    <div className="segment-info">
                      <span className="segment-name">{segment.segment}</span>
                      <span className="segment-count">{segment.count} customers</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ 
                          width: `${segment.percentage}%`,
                          backgroundColor: segment.segment === 'Regular' ? '#4CAF50' : 
                                         segment.segment === 'Occasional' ? '#2196F3' : '#FFA726'
                        }}
                      ></div>
                    </div>
                    <span className="segment-percentage">{segment.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="analytics-card market-trends">
          <div className="card-header">
            <h2><FaChartArea /> Market Trends</h2>
          </div>
          <div className="card-content">
            <div className="price-trends">
              <h3>Price Trends</h3>
              {marketTrends.priceTrends.map((trend, index) => (
                <div key={index} className="trend-row">
                  <div className="trend-info">
                    <span className="product-name">{trend.product}</span>
                    <span className="current-price">{trend.current}</span>
                  </div>
                  <span className={`price-change ${trend.trend}`}>
                    {getTrendIcon(trend.trend)}
                    {trend.change}
                  </span>
                </div>
              ))}
            </div>
            <div className="demand-trends">
              <h3>Demand Trends</h3>
              {marketTrends.demandTrends.map((trend, index) => (
                <div key={index} className="trend-row">
                  <div className="trend-info">
                    <span className="category-name">{trend.category}</span>
                    <span className={`demand-level ${trend.demand.toLowerCase()}`}>
                      {trend.demand}
                    </span>
                  </div>
                  <span className="demand-change">
                    {getTrendIcon('up')}
                    {trend.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
