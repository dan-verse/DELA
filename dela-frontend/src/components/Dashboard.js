import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Dashboard.css';

const Dashboard = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/bills/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setBills(response.data);
      } catch (error) {
        console.error('Failed to fetch bills:', error);
      }
    };
    fetchBills();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Your Bills</h2>
      <ul className="list-group">
        {bills.map((bill) => (
          <li key={bill.id} className="list-group-item">
            <strong>Amount:</strong> ${bill.remaining_balance}<br /><br /><strong>Due Date:</strong> {bill.due_date}<br /><br /><strong>Status:</strong> {bill.status}
          </li>
        ))}
      </ul>
      <Link to="/payment" className="btn-pay">Make Payment</Link>
      <Link to="/profile" className="btn-dashboard">Manage Profile</Link>
    </div>
  );
};

export default Dashboard;