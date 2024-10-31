import React, { useState } from 'react';
import { updateInfluencerProfile } from '../../services/firebase';
import { SocialMediaStats } from '../../types/User';

interface ConnectSocialMediaProps {
  userId: string;
  onConnect: () => void;
}

const ConnectSocialMedia = ({ userId, onConnect }: ConnectSocialMediaProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInstagramConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      const mockInstagramStats: SocialMediaStats['instagram'] = {
        followers: 10000,
        posts: 100,
        engagement: 0.05
      };

      await updateInfluencerProfile(userId, {
        socialMedia: {
          instagram: mockInstagramStats
        }
      });

      onConnect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Instagram');
    } finally {
      setLoading(false);
    }
  };

  const handleYouTubeConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      const mockYouTubeStats: SocialMediaStats['youtube'] = {
        subscribers: 50000,
        videos: 200,
        views: 1000000
      };

      await updateInfluencerProfile(userId, {
        socialMedia: {
          youtube: mockYouTubeStats
        }
      });

      onConnect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect YouTube');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Connect Social Media</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleInstagramConnect}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect Instagram'}
        </button>

        <button
          onClick={handleYouTubeConnect}
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect YouTube'}
        </button>
      </div>
    </div>
  );
};

export default ConnectSocialMedia;