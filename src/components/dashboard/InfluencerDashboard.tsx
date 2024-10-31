import React, { useState, useEffect } from 'react';
import { InfluencerProfile } from "../../types/User";
import SocialMediaStats from "../social/SocialMediaStats";
import ConnectSocialMedia from "../social/ConnectSocialMedia";
import { getCurrentUser } from "../../services/firebase";

export default function InfluencerDashboard() {
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData && userData.type === 'influencer') {
        setProfile(userData as InfluencerProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        
        {profile && <SocialMediaStats profile={profile} />}
        
        <ConnectSocialMedia 
          userId={profile?.id || ''} 
          onConnect={loadProfile}
        />

        {/* Brand Opportunities */}
        <h2 className="text-xl font-bold mt-6 mb-2">Brand Opportunities</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">No active opportunities yet</p>
        </div>

        {/* Recent Analytics */}
        <h2 className="text-xl font-bold mt-6 mb-2">Analytics</h2>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Campaign Requests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Active Campaigns</div>
          </div>
        </div>
      </div>
    </div>
  );
}