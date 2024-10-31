import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types/User';

export default function AuthScreen() {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type: UserType) => {
    navigate('/signup', { state: { userType: type } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to InfluencerConnect
      </h1>
      
      <button
        className="bg-blue-500 text-white px-8 py-3 rounded-lg w-64 mb-4 hover:bg-blue-600 transition"
        onClick={() => handleUserTypeSelection("business")}
      >
        Sign up as Business
      </button>
      
      <button
        className="bg-purple-500 text-white px-8 py-3 rounded-lg w-64 mb-4 hover:bg-purple-600 transition"
        onClick={() => handleUserTypeSelection("influencer")}
      >
        Sign up as Influencer
      </button>
      
      <button
        className="text-blue-500 hover:text-blue-600 transition"
        onClick={() => navigate('/login')}
      >
        Already have an account? Login
      </button>
    </div>
  );
}