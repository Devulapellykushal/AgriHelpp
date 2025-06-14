import {
    Add,
    Delete,
    Edit,
    Inventory as InventoryIcon,
    Search,
    TrendingDown,
    TrendingUp,
    Warning,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Inventory.css';

const Inventory = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Mock data - replace with actual API calls
  const inventory = [
    {
      id: 'INV-001',
      name: 'Wheat Seeds',
      category: 'Seeds',
      quantity: 500,
      unit: 'kg',
      price: '₹120/kg',
      stockStatus: 'in-stock',
      reorderLevel: 100,
      lastRestocked: '2024-03-10',
    },
    {
      id: 'INV-002',
      name: 'Organic Fertilizer',
      category: 'Fertilizers',
      quantity: 200,
      unit: 'bags',
      price: '₹850/bag',
      stockStatus: 'low-stock',
      reorderLevel: 50,
      lastRestocked: '2024-03-05',
    },
    {
      id: 'INV-003',
      name: 'Pesticide Spray',
      category: 'Pesticides',
      quantity: 150,
      unit: 'bottles',
      price: '₹450/bottle',
      stockStatus: 'in-stock',
      reorderLevel: 30,
      lastRestocked: '2024-03-12',
    },
    {
      id: 'INV-004',
      name: 'Rice Seeds',
      category: 'Seeds',
      quantity: 0,
      unit: 'kg',
      price: '₹150/kg',
      stockStatus: 'out-of-stock',
      reorderLevel: 100,
      lastRestocked: '2024-02-28',
    },
  ];

  const stats = [
    { 
      label: t('dealer.totalItems'), 
      value: '1,250', 
      icon: <InventoryIcon />,
      color: '#4CAF50' 
    },
    { 
      label: t('dealer.lowStock'), 
      value: '5', 
      icon: <Warning />,
      color: '#FFA726' 
    },
    { 
      label: t('dealer.outOfStock'), 
      value: '2', 
      icon: <TrendingDown />,
      color: '#F44336' 
    },
    { 
      label: t('dealer.totalValue'), 
      value: '₹2,50,000', 
      icon: <TrendingUp />,
      color: '#2196F3' 
    },
  ];

  const categories = ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Tools'];

  const getStockStatusColor = (status) => {
    const colors = {
      'in-stock': '#4CAF50',
      'low-stock': '#FFA726',
      'out-of-stock': '#F44336',
    };
    return colors[status] || '#757575';
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStock = stockFilter === 'all' || item.stockStatus === stockFilter;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleAddItem = () => {
    setOpenAddDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <div className="dealer-inventory-dashboard">
      <div className="dealer-inventory-header">
        <h1>{t('dealer.inventory', 'Inventory Management')}</h1>
        <p className="dealer-inventory-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={3} className="dealer-inventory-stats">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ color: stat.color, mr: 1 }}>{stat.icon}</Box>
                  <Typography variant="h6" component="div" style={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters and Actions */}
      <div className="dealer-inventory-filters">
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder={t('dealer.searchInventory')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t('dealer.category')}</InputLabel>
            <Select
              value={categoryFilter}
              label={t('dealer.category')}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">{t('dealer.allCategories')}</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t('dealer.stockStatus')}</InputLabel>
            <Select
              value={stockFilter}
              label={t('dealer.stockStatus')}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <MenuItem value="all">{t('dealer.allStatus')}</MenuItem>
              <MenuItem value="in-stock">{t('dealer.inStock')}</MenuItem>
              <MenuItem value="low-stock">{t('dealer.lowStock')}</MenuItem>
              <MenuItem value="out-of-stock">{t('dealer.outOfStock')}</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddItem}
          >
            {t('dealer.addItem')}
          </Button>
        </Box>
      </div>

      {/* Inventory Table */}
      <TableContainer component={Paper} className="dealer-inventory-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('dealer.itemId')}</TableCell>
              <TableCell>{t('dealer.name')}</TableCell>
              <TableCell>{t('dealer.category')}</TableCell>
              <TableCell>{t('dealer.quantity')}</TableCell>
              <TableCell>{t('dealer.price')}</TableCell>
              <TableCell>{t('dealer.stockStatus')}</TableCell>
              <TableCell>{t('dealer.reorderLevel')}</TableCell>
              <TableCell>{t('dealer.lastRestocked')}</TableCell>
              <TableCell>{t('dealer.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{`${item.quantity} ${item.unit}`}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Chip
                    label={t(`dealer.${item.stockStatus}`)}
                    style={{
                      backgroundColor: getStockStatusColor(item.stockStatus),
                      color: 'white',
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>{`${item.reorderLevel} ${item.unit}`}</TableCell>
                <TableCell>{item.lastRestocked}</TableCell>
                <TableCell>
                  <IconButton size="small" title={t('dealer.edit')}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title={t('dealer.delete')}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Item Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('dealer.addNewItem')}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label={t('dealer.itemName')}
              fullWidth
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>{t('dealer.category')}</InputLabel>
              <Select label={t('dealer.category')}>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={t('dealer.quantity')}
              type="number"
              fullWidth
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
            <TextField
              label={t('dealer.price')}
              type="number"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                endAdornment: <InputAdornment position="end">/unit</InputAdornment>,
              }}
            />
            <TextField
              label={t('dealer.reorderLevel')}
              type="number"
              fullWidth
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('dealer.cancel')}</Button>
          <Button variant="contained" color="primary" onClick={handleCloseDialog}>
            {t('dealer.add')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
