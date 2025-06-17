import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Messages.css';

console.log("👀 Gov Agencies Messages.jsx file loaded ✅");

const Messages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  console.log("🔥 Gov Agencies Messages.jsx component RENDERED");
  console.log("📌 Current path:", location.pathname);
  console.log("🧑‍💻 Current user:", user);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🚀 useEffect running...");

    if (!user || !user.role) {
      console.log("❌ No user or role:", user);
      setError('User role not available.');
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        console.log(`🔍 Fetching: GET http://localhost:5005/api/admin/getMessages?role=${encodeURIComponent(user.role)}&userId=${user.id}`);
        const response = await axios.get(`http://localhost:5005/api/admin/getMessages`, {
          params: { 
            role: user.role,
            userId: user.id
          }
        });
        console.log("✅ API response:", response.data);

        // ✅ Normalize snake_case to camelCase for consistency
        const normalized = response.data.messages.map(msg => ({
          id: msg.id,
          subject: msg.subject,
          content: msg.content,
          sentAt: msg.sent_at, // map sent_at to sentAt
        }));

        setMessages(normalized);
      } catch (err) {
        console.error("❌ API error:", err);
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

  }, [user?.role, location.pathname]);

  if (loading) {
    return (
      <Box className="page-container">
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="page-container">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div className="gov-agencies-messages-dashboard">
      <div className="gov-agencies-messages-header">
        <h1>{t('gov-agencies.messages', 'Messages')}</h1>
        <p className="gov-agencies-messages-welcome-message">
          {t('welcome')}, {user?.email}!
        </p>
      </div>
      <div className="gov-agencies-messages-sections">
        <div className="gov-agencies-messages-content" style={{ width: '100%' }}>
          <h2>{t('gov-agencies.messages', 'Agency Messages')}</h2>
          {messages.length === 0 ? (
            <Typography>No messages found for your role.</Typography>
          ) : (
            <div className="gov-agencies-messages-activity-list">
              {messages.map((msg) => (
                <Paper key={msg.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="h6">{msg.subject}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(msg.sentAt).toLocaleString()}
                  </Typography>
                  <Typography>{msg.content}</Typography>
                </Paper>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 