import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBillAllocation = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/api/admin/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users for bill allocation:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select a user before allocating a bill.");
      return;
    }

    // Convert selectedUser to an integer.
    const customerId = parseInt(selectedUser, 10);
    if (isNaN(customerId)) {
      alert("Invalid user selected. Please choose a valid user.");
      return;
    }

    const payload = {
      customer: customerId, // now an integer
      total_amount: totalAmount,
      due_date: dueDate,
    };

    // Log the payload to inspect its values
    console.log("Payload to send:", payload);

    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/api/admin/bills/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Bill allocated successfully!');
      // Reset form fields
      setSelectedUser('');
      setTotalAmount('');
      setDueDate('');
    } catch (error) {
      console.error('Failed to allocate bill:', error.response ? error.response.data : error);
      alert('Failed to allocate bill.');
    }
  };

  return (
    <div className='allocation-container'>
      <h2>Allocate Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className="select-user">
          <label htmlFor="userSelect" className="form-label">Select User</label>
          <select
            id="userSelect"
            className="form-control"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              // Ensure each option has a unique key
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div className="total-amount">
          <label htmlFor="totalAmount" className="form-label">Total Amount</label>
          <input
            type="number"
            step="0.01"
            id="totalAmount"
            className="form-control"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <div className="due-date">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-allocate-bill">Allocate Bill</button>
      </form>
    </div>
  );
};

export default AdminBillAllocation;