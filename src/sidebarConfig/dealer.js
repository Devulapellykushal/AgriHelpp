// sidebarConfig/dealer.js

import { Dashboard, Inventory, Mail, Payment, ShoppingCart, Support } from '@mui/icons-material';

export const dealerSidebarItems = [
  { path: '/dealer/dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { path: '/dealer/orders', label: 'Orders', icon: <ShoppingCart /> },
  { path: '/dealer/inventory', label: 'Inventory', icon: <Inventory /> },
  { path: '/dealer/payments', label: 'Payments', icon: <Payment /> },
  { path: '/dealer/messages', label: 'Messages', icon: <Mail /> }, // ✅ correct position
  { path: '/dealer/support', label: 'Support', icon: <Support /> },
];
