import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/PaymentForm.css'

const PaymentForm = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const navigate = useNavigate();

  // Fetch bills from the backend
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/user/payments/',
        {
          bill: parseInt(selectedBill, 10),
          payment_amount: paymentAmount,
          payment_method: paymentMethod,
          payment_date: new Date().toISOString().split('T')[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      alert('Payment successful!');

      // Force-refresh bill data after payment
      const updatedBills = await axios.get('http://127.0.0.1:8000/api/user/bills/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      console.log('Updated Bills:', updatedBills.data);
      navigate('/dashboard');

    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
};

  

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="selectbill-container">
          <label htmlFor="bill" className="form-label">Select Bill</label>
          <select
            className="form-control"
            id="bill"
            value={selectedBill}
            onChange={(e) => setSelectedBill(e.target.value)}
            required
          >
            <option value="">Select a bill</option>
            {bills.map((bill) => (
              <option key={bill.id} value={bill.id}>
                Bill #{bill.id} - Amount: ${bill.remaining_balance} (Due: {bill.due_date})
              </option>
            ))}
          </select>
        </div>
        <div className="amount-container">
          <label htmlFor="paymentAmount" className="form-label">Payment Amount</label>
          <input
            type="number"
            className="form-control"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />
        </div>
        <div className="paymethod-container">
          <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
          <select
            className="form-control"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="credit_card">Credit Card</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="pay-btn">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;