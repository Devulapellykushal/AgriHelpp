import { Send as SendIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AdminMessages.css';

const AdminMessages = () => {
  const { t } = useTranslation();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Roles options
  const roles = [
    { value: 'Farmer', label: t('roles.farmer') || 'Farmer' },
    { value: 'Resource Provider', label: t('roles.resourceProvider') || 'Resource Provider' },
    { value: 'Government Agencies', label: t('roles.governmentAgencies') || 'Government Agencies' },
    { value: 'Admin', label: t('roles.admin') || 'Admin' },
    { value: 'Dealer', label: t('roles.dealer') || 'Dealer' },
    { value: 'Agriculture Expert', label: t('roles.agricultureExpert') || 'Agriculture Expert' },
    { value: 'Wholesaler', label: t('roles.wholesaler') || 'Wholesaler' },
    { value: 'Retailer', label: t('roles.retailer') || 'Retailer' },
    { value: 'NGOs', label: t('roles.ngos') || 'NGOs' },
  ];

  // Handle role multi-select
  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!subject.trim() || !message.trim() || selectedRoles.length === 0) {
      setSnackbar({
        open: true,
        message: t('adminMessages.validationError') || 'Please fill in all fields.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Call your Express API
      const response = await fetch('http://localhost:5005/api/admin/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim(),
          roles: selectedRoles,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Server response:', result);

      // Show success
      setSnackbar({
        open: true,
        message: t('adminMessages.success') || 'Message sent successfully!',
        severity: 'success',
      });

      // Reset form
      setSubject('');
      setMessage('');
      setSelectedRoles([]);

    } catch (error) {
      console.error('❌ Error sending message:', error);
      setSnackbar({
        open: true,
        message: t('adminMessages.error') || 'Something went wrong. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="admin-messages">
      <Paper className="admin-messages-paper">
        <Typography variant="h5" component="h1" gutterBottom>
          {t('adminMessages.title') || 'Send Message to Users'}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {t('adminMessages.description') || 'Select user roles and send them important updates.'}
        </Typography>

        <form onSubmit={handleSubmit} className="admin-messages-form">
          <FormControl fullWidth margin="normal">
            <InputLabel id="roles-label">
              {t('adminMessages.selectRoles') || 'Select Roles'}
            </InputLabel>
            <Select
              labelId="roles-label"
              multiple
              value={selectedRoles}
              onChange={handleRoleChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={roles.find((role) => role.value === value)?.label || value}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label={t('adminMessages.subject') || 'Subject'}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label={t('adminMessages.message') || 'Message'}
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder={t('adminMessages.messagePlaceholder') || 'Type your message here...'}
          />

          <Box className="admin-messages-actions">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
              disabled={loading}
            >
              {loading
                ? t('common.sending') || 'Sending...'
                : t('adminMessages.send') || 'Send'}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminMessages;
