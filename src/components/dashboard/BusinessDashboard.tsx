import React, { useState, useEffect } from 'react';
import { getInfluencers } from '../../services/firebase';
import { InfluencerProfile } from '../../types/User';
import InfluencerCard from '../influencer/InfluencerCard';

const BusinessDashboard = () => {
  const [influencers, setInfluencers] = useState<InfluencerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const data = await getInfluencers();
        setInfluencers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch influencers');
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Discover Influencers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {influencers.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
};

export default BusinessDashboard;