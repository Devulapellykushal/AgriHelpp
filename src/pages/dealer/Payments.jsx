import {
    AccountBalance,
    Add,
    Download,
    Payment as PaymentIcon,
    Receipt,
    Search,
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
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Payments.css';

const Payments = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data - replace with actual API calls
  const payments = [
    {
      id: 'PAY-001',
      orderId: 'ORD-001',
      customer: 'John Farmer',
      date: '2024-03-14',
      amount: '₹12,500',
      method: 'UPI',
      status: 'completed',
      type: 'received',
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-002',
      customer: 'Sarah Agriculturist',
      date: '2024-03-13',
      amount: '₹8,750',
      method: 'Bank Transfer',
      status: 'pending',
      type: 'received',
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-003',
      supplier: 'Agro Supplies Ltd',
      date: '2024-03-12',
      amount: '₹25,000',
      method: 'Bank Transfer',
      status: 'completed',
      type: 'sent',
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-004',
      customer: 'Mike Cultivator',
      date: '2024-03-11',
      amount: '₹15,200',
      method: 'Cash',
      status: 'failed',
      type: 'received',
    },
  ];

  const stats = [
    {
      label: t('dealer.totalRevenue'),
      value: '₹2,50,000',
      icon: <TrendingUp />,
      color: '#4CAF50',
      change: '+15%',
    },
    {
      label: t('dealer.pendingPayments'),
      value: '₹45,000',
      icon: <Warning />,
      color: '#FFA726',
      change: '3 payments',
    },
    {
      label: t('dealer.totalPayables'),
      value: '₹75,000',
      icon: <PaymentIcon />,
      color: '#F44336',
      change: '5 bills',
    },
    {
      label: t('dealer.bankBalance'),
      value: '₹3,25,000',
      icon: <AccountBalance />,
      color: '#2196F3',
      change: 'Updated today',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: '#4CAF50',
      pending: '#FFA726',
      failed: '#F44336',
    };
    return colors[status] || '#757575';
  };

  const getTypeColor = (type) => {
    return type === 'received' ? '#4CAF50' : '#F44336';
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.customer && payment.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.supplier && payment.supplier.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = activeTab === 0 ? payment.type === 'received' : payment.type === 'sent';
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddPayment = () => {
    setOpenPaymentDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenPaymentDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="dealer-payments-dashboard">
      <div className="dealer-payments-header">
        <h1>{t('dealer.payments', 'Payments Management')}</h1>
        <p className="dealer-payments-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={3} className="dealer-payments-stats">
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
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for Received/Sent Payments */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="payment tabs">
          <Tab label={t('dealer.receivedPayments')} />
          <Tab label={t('dealer.sentPayments')} />
        </Tabs>
      </Box>

      {/* Filters and Actions */}
      <div className="dealer-payments-filters">
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder={t('dealer.searchPayments')}
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
              <MenuItem value="completed">{t('dealer.completed')}</MenuItem>
              <MenuItem value="pending">{t('dealer.pending')}</MenuItem>
              <MenuItem value="failed">{t('dealer.failed')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t('dealer.date')}</InputLabel>
            <Select
              value={dateFilter}
              label={t('dealer.date')}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <MenuItem value="all">{t('dealer.allTime')}</MenuItem>
              <MenuItem value="today">{t('dealer.today')}</MenuItem>
              <MenuItem value="week">{t('dealer.thisWeek')}</MenuItem>
              <MenuItem value="month">{t('dealer.thisMonth')}</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddPayment}
          >
            {t('dealer.addPayment')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            {t('dealer.export')}
          </Button>
        </Box>
      </div>

      {/* Payments Table */}
      <TableContainer component={Paper} className="dealer-payments-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('dealer.paymentId')}</TableCell>
              <TableCell>{t('dealer.orderId')}</TableCell>
              <TableCell>{activeTab === 0 ? t('dealer.customer') : t('dealer.supplier')}</TableCell>
              <TableCell>{t('dealer.date')}</TableCell>
              <TableCell>{t('dealer.amount')}</TableCell>
              <TableCell>{t('dealer.method')}</TableCell>
              <TableCell>{t('dealer.status')}</TableCell>
              <TableCell>{t('dealer.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.orderId}</TableCell>
                <TableCell>{payment.customer || payment.supplier}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell style={{ color: getTypeColor(payment.type) }}>
                  {payment.type === 'sent' ? '-' : '+'}{payment.amount}
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Chip
                    label={t(`dealer.${payment.status}`)}
                    style={{
                      backgroundColor: getStatusColor(payment.status),
                      color: 'white',
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" title={t('dealer.viewReceipt')}>
                    <Receipt fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title={t('dealer.download')}>
                    <Download fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('dealer.addNewPayment')}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>{t('dealer.paymentType')}</InputLabel>
              <Select label={t('dealer.paymentType')}>
                <MenuItem value="received">{t('dealer.received')}</MenuItem>
                <MenuItem value="sent">{t('dealer.sent')}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={t('dealer.orderId')}
              fullWidth
              size="small"
            />
            <TextField
              label={activeTab === 0 ? t('dealer.customer') : t('dealer.supplier')}
              fullWidth
              size="small"
            />
            <TextField
              label={t('dealer.amount')}
              type="number"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel>{t('dealer.paymentMethod')}</InputLabel>
              <Select label={t('dealer.paymentMethod')}>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="bank">Bank Transfer</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={t('dealer.notes')}
              fullWidth
              size="small"
              multiline
              rows={2}
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

export default Payments;
