import React from 'react';
import AdminUserList from './AdminUserList';
import AdminBillAllocation from './AdminBillAllocation';
import AdminExportBills from './AdminExportBills';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Manage users, allocate bills, and generate reports.</p>
      <AdminUserList />
      <AdminBillAllocation />
      <AdminExportBills />
    </div>
  );
};

export default AdminDashboard;