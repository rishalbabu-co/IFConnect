import React from 'react';
import { InfluencerProfile } from "../../types/User";

interface SocialMediaStatsProps {
  profile: InfluencerProfile;
}

export default function SocialMediaStats({ profile }: SocialMediaStatsProps) {
  const formatNumber = (num: number = 0) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
      <div className="text-center p-2">
        <div className="text-lg font-bold text-purple-600">Instagram</div>
        <div className="text-2xl font-bold">{formatNumber(profile.followers)}</div>
        <div className="text-sm text-gray-600">Followers</div>
        {profile.instagramHandle && (
          <div className="text-sm text-purple-600">@{profile.instagramHandle}</div>
        )}
      </div>
      
      <div className="text-center p-2">
        <div className="text-lg font-bold text-red-600">YouTube</div>
        <div className="text-2xl font-bold">{formatNumber(profile.subscribers)}</div>
        <div className="text-sm text-gray-600">Subscribers</div>
        {profile.youtubeChannel && (
          <div className="text-sm text-red-600">Connected</div>
        )}
      </div>
    </div>
  );
}