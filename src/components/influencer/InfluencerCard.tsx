import React from 'react';
import { InfluencerProfile } from '../../types/User';

interface InfluencerCardProps {
  influencer: InfluencerProfile;
}

const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={influencer.profileImage || 'https://via.placeholder.com/50'}
            alt={influencer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{influencer.name}</h3>
            <p className="text-gray-600 text-sm">{influencer.categories.join(', ')}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700 text-sm line-clamp-2">{influencer.bio}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {influencer.socialMedia.instagram && (
            <div className="text-center p-2 bg-purple-50 rounded">
              <p className="font-semibold text-purple-600">
                {influencer.socialMedia.instagram.followers.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Instagram Followers</p>
            </div>
          )}
          
          {influencer.socialMedia.youtube && (
            <div className="text-center p-2 bg-red-50 rounded">
              <p className="font-semibold text-red-600">
                {influencer.socialMedia.youtube.subscribers.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">YouTube Subscribers</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
            Contact Influencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;