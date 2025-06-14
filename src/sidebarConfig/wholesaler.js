import { Assessment, Dashboard, Inventory, Mail, Receipt, ShoppingBag } from '@mui/icons-material';

export const wholesalerSidebarItems = [
  { path: '/wholesaler/dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { path: '/wholesaler/bulk-orders', label: 'Bulk Orders', icon: <ShoppingBag /> },
  { path: '/wholesaler/inventory', label: 'Inventory', icon: <Inventory /> },
  { path: '/wholesaler/transactions', label: 'Transactions', icon: <Receipt /> },
  { path: '/wholesaler/analytics', label: 'Analytics', icon: <Assessment /> },
  { path: '/wholesaler/messages', label: 'Messages', icon: <Mail /> },
]; 