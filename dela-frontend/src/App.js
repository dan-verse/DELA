import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import ProfileManager from './components/ProfileManager';
import PaymentForm from './components/PaymentForm';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that use the layout with header & footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileManager />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        {/* Routes without the header/footer (or with a different layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
