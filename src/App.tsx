import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthScreen from './components/auth/AuthScreen';
import LoginScreen from './components/auth/LoginScreen';
import SignupScreen from './components/auth/SignupScreen';
import BusinessDashboard from './components/dashboard/BusinessDashboard';
import InfluencerDashboard from './components/dashboard/InfluencerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/business" element={<BusinessDashboard />} />
      <Route path="/influencer" element={<InfluencerDashboard />} />
    </Routes>
  );
}

export default App;