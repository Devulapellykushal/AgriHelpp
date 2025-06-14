import { FilterList, Refresh, Search } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Chip,
    FormControl,
    Grid,
    IconButton,
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
import './Orders.css';

const Orders = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with actual API calls
  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Farmer',
      date: '2024-03-14',
      items: 'Wheat Seeds, Fertilizer',
      amount: '₹12,500',
      status: 'pending',
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Agriculturist',
      date: '2024-03-13',
      items: 'Rice Seeds, Pesticides',
      amount: '₹8,750',
      status: 'processing',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Cultivator',
      date: '2024-03-12',
      items: 'Maize Seeds, Tools',
      amount: '₹15,200',
      status: 'completed',
    },
    {
      id: 'ORD-004',
      customer: 'Lisa Grower',
      date: '2024-03-11',
      items: 'Vegetable Seeds, Equipment',
      amount: '₹9,800',
      status: 'cancelled',
    },
  ];

  const stats = [
    { label: t('dealer.totalOrders'), value: '156', color: '#4CAF50' },
    { label: t('dealer.pendingOrders'), value: '12', color: '#FFA726' },
    { label: t('dealer.completedOrders'), value: '134', color: '#2196F3' },
    { label: t('dealer.cancelledOrders'), value: '10', color: '#F44336' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA726',
      processing: '#2196F3',
      completed: '#4CAF50',
      cancelled: '#F44336',
    };
    return colors[status] || '#757575';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dealer-orders-dashboard">
      <div className="dealer-orders-header">
        <h1>{t('dealer.orders')}</h1>
        <p className="dealer-orders-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={3} className="dealer-orders-stats">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" style={{ color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters and Search */}
      <div className="dealer-orders-filters">
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            size="small"
            placeholder={t('dealer.searchOrders')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t('dealer.status')}</InputLabel>
            <Select
              value={statusFilter}
              label={t('dealer.status')}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">{t('dealer.allStatus')}</MenuItem>
              <MenuItem value="pending">{t('dealer.pending')}</MenuItem>
              <MenuItem value="processing">{t('dealer.processing')}</MenuItem>
              <MenuItem value="completed">{t('dealer.completed')}</MenuItem>
              <MenuItem value="cancelled">{t('dealer.cancelled')}</MenuItem>
            </Select>
          </FormControl>
          <IconButton>
            <Refresh />
          </IconButton>
        </Box>
      </div>

      {/* Orders Table */}
      <TableContainer component={Paper} className="dealer-orders-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('dealer.orderId')}</TableCell>
              <TableCell>{t('dealer.customer')}</TableCell>
              <TableCell>{t('dealer.date')}</TableCell>
              <TableCell>{t('dealer.items')}</TableCell>
              <TableCell>{t('dealer.amount')}</TableCell>
              <TableCell>{t('dealer.status')}</TableCell>
              <TableCell>{t('dealer.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={t(`dealer.${order.status}`)}
                    style={{
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" title={t('dealer.viewDetails')}>
                    <FilterList fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
