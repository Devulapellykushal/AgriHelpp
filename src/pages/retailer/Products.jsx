import React, { useState } from 'react';
import { FaBox, FaChartLine, FaDownload, FaEdit, FaExclamationTriangle, FaEye, FaFilter, FaPlus, FaSearch, FaSort, FaTrash, FaUpload } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Product statistics
  const productStats = [
    {
      label: 'Total Products',
      value: '245',
      icon: <FaBox />,
      trend: '+15.2%',
      trendDirection: 'up',
      subLabel: 'Active products'
    },
    {
      label: 'Low Stock Items',
      value: '12',
      icon: <FaExclamationTriangle />,
      trend: '-8.5%',
      trendDirection: 'down',
      subLabel: 'Needs attention'
    },
    {
      label: 'Top Selling',
      value: 'Fresh Tomatoes',
      icon: <FaChartLine />,
      trend: '+22.3%',
      trendDirection: 'up',
      subLabel: 'This month'
    },
    {
      label: 'Total Value',
      value: '₹3,45,800',
      icon: <FaBox />,
      trend: '+18.7%',
      trendDirection: 'up',
      subLabel: 'Inventory value'
    }
  ];

  // Sample products data
  const products = [
    {
      id: 'PRD001',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: '₹40/kg',
      stock: 150,
      unit: 'kg',
      supplier: 'Local Farm A',
      lastRestock: '2024-02-18',
      status: 'In Stock',
      image: 'https://example.com/tomatoes.jpg'
    },
    {
      id: 'PRD002',
      name: 'Organic Potatoes',
      category: 'Vegetables',
      price: '₹30/kg',
      stock: 45,
      unit: 'kg',
      supplier: 'Organic Farms Co.',
      lastRestock: '2024-02-15',
      status: 'Low Stock',
      image: 'https://example.com/potatoes.jpg'
    },
    {
      id: 'PRD003',
      name: 'Premium Rice',
      category: 'Grains',
      price: '₹80/kg',
      stock: 200,
      unit: 'kg',
      supplier: 'Grain Suppliers Ltd',
      lastRestock: '2024-02-10',
      status: 'In Stock',
      image: 'https://example.com/rice.jpg'
    },
    {
      id: 'PRD004',
      name: 'Fresh Apples',
      category: 'Fruits',
      price: '₹120/kg',
      stock: 75,
      unit: 'kg',
      supplier: 'Fruit Valley',
      lastRestock: '2024-02-19',
      status: 'In Stock',
      image: 'https://example.com/apples.jpg'
    }
  ];

  // Stock alerts
  const stockAlerts = [
    {
      productId: 'PRD002',
      productName: 'Organic Potatoes',
      currentStock: 45,
      threshold: 50,
      daysUntilStockout: 3
    },
    {
      productId: 'PRD005',
      productName: 'Fresh Spinach',
      currentStock: 15,
      threshold: 20,
      daysUntilStockout: 2
    },
    {
      productId: 'PRD006',
      productName: 'Organic Onions',
      currentStock: 30,
      threshold: 40,
      daysUntilStockout: 4
    }
  ];

  // Recent stock movements
  const stockMovements = [
    {
      type: 'restock',
      productId: 'PRD001',
      productName: 'Fresh Tomatoes',
      quantity: 100,
      date: '2024-02-18',
      time: '10:30 AM'
    },
    {
      type: 'sale',
      productId: 'PRD003',
      productName: 'Premium Rice',
      quantity: 25,
      date: '2024-02-18',
      time: '09:45 AM'
    },
    {
      type: 'adjustment',
      productId: 'PRD004',
      productName: 'Fresh Apples',
      quantity: -5,
      date: '2024-02-18',
      time: '09:15 AM'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      label: 'Add Product',
      icon: <FaPlus />,
      action: () => console.log('Add new product')
    },
    {
      label: 'Update Stock',
      icon: <FaBox />,
      action: () => console.log('Update stock')
    },
    {
      label: 'Export Data',
      icon: <FaDownload />,
      action: () => console.log('Export data')
    },
    {
      label: 'Import Data',
      icon: <FaUpload />,
      action: () => console.log('Import data')
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'success';
      case 'low stock':
        return 'warning';
      case 'out of stock':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStockMovementIcon = (type) => {
    switch (type) {
      case 'restock':
        return <FaPlus className="movement-icon restock" />;
      case 'sale':
        return <FaBox className="movement-icon sale" />;
      case 'adjustment':
        return <FaEdit className="movement-icon adjustment" />;
      default:
        return null;
    }
  };

  const getStockMovementText = (type) => {
    switch (type) {
      case 'restock':
        return 'Stock added';
      case 'sale':
        return 'Stock sold';
      case 'adjustment':
        return 'Stock adjusted';
      default:
        return '';
    }
  };

  return (
    <div className="retailer-products">
      <div className="products-header">
        <div className="header-content">
          <h1>Products Management</h1>
          <p className="welcome-message">Manage your product inventory and stock levels.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn">
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      <div className="products-grid">
        <div className="main-content">
          {/* Product Statistics */}
          <section className="products-section">
            <div className="statistics-grid">
              {productStats.map((stat, index) => (
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

          {/* Products Filters */}
          <section className="products-section">
            <div className="filters-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filters-group">
                <div className="filter-item">
                  <FaFilter className="filter-icon" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                  </select>
                </div>
                <div className="filter-item">
                  <FaFilter className="filter-icon" />
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Stock Levels</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                <div className="filter-item">
                  <FaSort className="sort-icon" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="stock">Sort by Stock</option>
                    <option value="category">Sort by Category</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Products List */}
          <section className="products-section">
            <div className="products-list">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <div className="product-info">
                      <span className="product-id">{product.id}</span>
                      <span className="product-category">{product.category}</span>
                    </div>
                    <span className={`product-status ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="product-details">
                    <div className="product-main">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">{product.price}</div>
                      <div className="product-stock">
                        <span className="stock-label">Current Stock:</span>
                        <span className="stock-value">{product.stock} {product.unit}</span>
                      </div>
                    </div>
                    <div className="product-supplier">
                      <p className="supplier-name">Supplier: {product.supplier}</p>
                      <p className="last-restock">Last Restock: {product.lastRestock}</p>
                    </div>
                    <div className="product-actions">
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
              ))}
            </div>
          </section>
        </div>

        <div className="products-sidebar">
          {/* Stock Alerts */}
          <section className="sidebar-section">
            <h2>Stock Alerts</h2>
            <div className="alerts-list">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="alert-card">
                  <div className="alert-icon">
                    <FaExclamationTriangle className="warning-icon" />
                  </div>
                  <div className="alert-content">
                    <div className="alert-header">
                      <span className="product-name">{alert.productName}</span>
                      <span className="alert-status">Low Stock</span>
                    </div>
                    <div className="alert-details">
                      <div className="stock-info">
                        <span className="current-stock">{alert.currentStock} units</span>
                        <span className="threshold">Threshold: {alert.threshold}</span>
                      </div>
                      <div className="stockout-warning">
                        {alert.daysUntilStockout} days until stockout
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Stock Movements */}
          <section className="sidebar-section">
            <h2>Recent Stock Movements</h2>
            <div className="movements-list">
              {stockMovements.map((movement, index) => (
                <div key={index} className="movement-card">
                  <div className="movement-icon">
                    {getStockMovementIcon(movement.type)}
                  </div>
                  <div className="movement-content">
                    <div className="movement-header">
                      <span className="movement-type">
                        {getStockMovementText(movement.type)}
                      </span>
                      <span className="movement-time">
                        {movement.time}
                      </span>
                    </div>
                    <div className="movement-details">
                      <span className="product-name">{movement.productName}</span>
                      <span className={`movement-quantity ${movement.type === 'sale' ? 'negative' : 'positive'}`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                      </span>
                    </div>
                    <div className="movement-date">{movement.date}</div>
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

export default Products;
