import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaBarcode,
    FaBox,
    FaChartLine,
    FaDownload,
    FaEdit,
    FaExclamationTriangle,
    FaHistory,
    FaPlus,
    FaSearch,
    FaTag,
    FaTrash,
    FaTruck,
    FaUpload,
    FaWarehouse
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Inventory.css';

const Inventory = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Inventory statistics
  const inventoryStats = [
    {
      label: 'Total Items',
      value: '2,450',
      icon: <FaBox />,
      trend: '+5.2%',
      trendDirection: 'up',
      subLabel: 'Active SKUs'
    },
    {
      label: 'Low Stock Items',
      value: '28',
      icon: <FaExclamationTriangle />,
      trend: '-3.1%',
      trendDirection: 'down',
      subLabel: 'Requires attention'
    },
    {
      label: 'Total Value',
      value: '₹85,50,000',
      icon: <FaChartLine />,
      trend: '+12.5%',
      trendDirection: 'up',
      subLabel: 'Current inventory value'
    },
    {
      label: 'Storage Capacity',
      value: '75%',
      icon: <FaWarehouse />,
      trend: '0%',
      trendDirection: 'stable',
      subLabel: 'Utilization rate'
    }
  ];

  // Categories with stock levels
  const categories = [
    {
      name: 'Grains',
      totalItems: 850,
      lowStock: 12,
      value: '₹25,50,000',
      items: [
        { id: 'GRN001', name: 'Wheat', stock: 500, unit: 'kg', minStock: 100, price: '₹2,800/quintal', status: 'healthy' },
        { id: 'GRN002', name: 'Rice', stock: 350, unit: 'kg', minStock: 80, price: '₹3,200/quintal', status: 'healthy' },
        { id: 'GRN003', name: 'Maize', stock: 200, unit: 'kg', minStock: 50, price: '₹2,500/quintal', status: 'warning' }
      ]
    },
    {
      name: 'Vegetables',
      totalItems: 620,
      lowStock: 8,
      value: '₹18,60,000',
      items: [
        { id: 'VEG001', name: 'Potatoes', stock: 300, unit: 'kg', minStock: 100, price: '₹25/kg', status: 'healthy' },
        { id: 'VEG002', name: 'Onions', stock: 150, unit: 'kg', minStock: 50, price: '₹30/kg', status: 'warning' },
        { id: 'VEG003', name: 'Tomatoes', stock: 80, unit: 'kg', minStock: 40, price: '₹40/kg', status: 'critical' }
      ]
    },
    {
      name: 'Fruits',
      totalItems: 450,
      lowStock: 5,
      value: '₹15,75,000',
      items: [
        { id: 'FRT001', name: 'Apples', stock: 200, unit: 'kg', minStock: 50, price: '₹120/kg', status: 'healthy' },
        { id: 'FRT002', name: 'Oranges', stock: 150, unit: 'kg', minStock: 40, price: '₹80/kg', status: 'healthy' },
        { id: 'FRT003', name: 'Bananas', stock: 100, unit: 'kg', minStock: 30, price: '₹45/kg', status: 'warning' }
      ]
    }
  ];

  // Recent stock movements
  const stockMovements = [
    {
      id: 'MOV001',
      type: 'in',
      item: 'Wheat',
      quantity: 500,
      unit: 'kg',
      date: '2024-03-15',
      reference: 'PO-2024-001'
    },
    {
      id: 'MOV002',
      type: 'out',
      item: 'Potatoes',
      quantity: 200,
      unit: 'kg',
      date: '2024-03-14',
      reference: 'SO-2024-002'
    },
    {
      id: 'MOV003',
      type: 'in',
      item: 'Apples',
      quantity: 150,
      unit: 'kg',
      date: '2024-03-13',
      reference: 'PO-2024-003'
    }
  ];

  // Stock alerts
  const stockAlerts = [
    {
      id: 'ALT001',
      item: 'Tomatoes',
      currentStock: 80,
      minStock: 100,
      status: 'critical',
      daysUntilStockout: 2
    },
    {
      id: 'ALT002',
      item: 'Onions',
      currentStock: 150,
      minStock: 200,
      status: 'warning',
      daysUntilStockout: 5
    },
    {
      id: 'ALT003',
      item: 'Maize',
      currentStock: 200,
      minStock: 250,
      status: 'warning',
      daysUntilStockout: 7
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      healthy: '#4CAF50',
      warning: '#FFA726',
      critical: '#F44336',
      in: '#4CAF50',
      out: '#F44336'
    };
    return colors[status] || '#757575';
  };

  const renderInventoryItem = (item) => (
    <div key={item.id} className="inventory-item">
      <div className="item-header">
        <div className="item-info">
          <h3>{item.name}</h3>
          <span className="item-id">{item.id}</span>
        </div>
        <span className={`status-badge ${item.status}`}>{item.status}</span>
      </div>
      <div className="item-details">
        <div className="stock-info">
          <div className="stock-level">
            <span className="label">Current Stock:</span>
            <span className="value">{item.stock} {item.unit}</span>
          </div>
          <div className="min-stock">
            <span className="label">Min Stock:</span>
            <span className="value">{item.minStock} {item.unit}</span>
          </div>
        </div>
        <div className="price-info">
          <span className="price">{item.price}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ 
            width: `${(item.stock / (item.minStock * 2)) * 100}%`,
            backgroundColor: getStatusColor(item.status)
          }}
        ></div>
      </div>
      <div className="item-actions">
        <button className="action-btn edit">
          <FaEdit /> Edit
        </button>
        <button className="action-btn delete">
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="wholesaler-inventory">
      <div className="inventory-header">
        <div className="header-content">
          <h1>{t('wholesaler.inventory')}</h1>
          <p className="inventory-welcome-message">
            {t('welcome')}, {user?.email}!
          </p>
        </div>
        <div className="header-actions">
          <button className="primary-btn">
            <FaPlus /> Add New Item
          </button>
          <button className="secondary-btn">
            <FaDownload /> Export
          </button>
          <button className="secondary-btn">
            <FaUpload /> Import
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="inventory-stats-grid">
        {inventoryStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.label}</h3>
              <p className="stat-value">{stat.value}</p>
              <div className="stat-trend">
                <span className={`trend ${stat.trendDirection}`}>
                  {stat.trend}
                </span>
                <span className="sub-label">{stat.subLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inventory-grid">
        {/* Main Inventory Section */}
        <div className="inventory-main">
          <div className="inventory-filters">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select 
                value={stockFilter} 
                onChange={(e) => setStockFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Stock Levels</option>
                <option value="low">Low Stock</option>
                <option value="healthy">Healthy Stock</option>
                <option value="critical">Critical Stock</option>
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Sort by Name</option>
                <option value="stock">Sort by Stock Level</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          <div className="inventory-categories">
            {categories.map(category => (
              <div key={category.name} className="category-section">
                <div className="category-header">
                  <h2>{category.name}</h2>
                  <div className="category-stats">
                    <span>Total Items: {category.totalItems}</span>
                    <span>Low Stock: {category.lowStock}</span>
                    <span>Value: {category.value}</span>
                  </div>
                </div>
                <div className="inventory-items-grid">
                  {category.items.map(item => renderInventoryItem(item))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="inventory-sidebar">
          {/* Stock Alerts */}
          <div className="sidebar-card stock-alerts">
            <h2><FaExclamationTriangle /> Stock Alerts</h2>
            <div className="alerts-list">
              {stockAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-header">
                    <span className="item-name">{alert.item}</span>
                    <span className={`status ${alert.status}`}>{alert.status}</span>
                  </div>
                  <div className="alert-details">
                    <p>Current Stock: {alert.currentStock}</p>
                    <p>Min Stock: {alert.minStock}</p>
                    <p className="stockout-warning">
                      {alert.daysUntilStockout} days until stockout
                    </p>
                  </div>
                  <button className="restock-btn">Restock Now</button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Stock Movements */}
          <div className="sidebar-card stock-movements">
            <h2><FaHistory /> Recent Movements</h2>
            <div className="movements-list">
              {stockMovements.map(movement => (
                <div key={movement.id} className="movement-item">
                  <div className="movement-header">
                    <span className={`type ${movement.type}`}>
                      {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                    </span>
                    <span className="date">{movement.date}</span>
                  </div>
                  <div className="movement-details">
                    <p className="item">{movement.item}</p>
                    <p className="quantity">
                      {movement.quantity} {movement.unit}
                    </p>
                    <p className="reference">Ref: {movement.reference}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="sidebar-card quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn">
                <FaBarcode /> Scan Item
              </button>
              <button className="action-btn">
                <FaTag /> Update Prices
              </button>
              <button className="action-btn">
                <FaTruck /> Schedule Delivery
              </button>
              <button className="action-btn">
                <FaChartLine /> View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
