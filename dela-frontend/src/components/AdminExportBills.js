import React from 'react';
import axios from 'axios';

const AdminExportBills = () => {
  const handleExport = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/api/admin/export-bills/', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Important for binary data
      });

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bills_report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export bills:', error);
      alert('Failed to export bills report.');
    }
  };

  return (
    <div className='report-container'>
      <h2>Export Bills Report</h2>
      <button className="btn-excel" onClick={handleExport}>
        Download Excel Report
      </button>
    </div>
  );
};

export default AdminExportBills;
