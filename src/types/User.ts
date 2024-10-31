export type UserType = 'influencer' | 'business';

export interface SocialMediaStats {
  instagram?: {
    followers: number;
    posts: number;
    engagement: number;
  };
  youtube?: {
    subscribers: number;
    videos: number;
    views: number;
  };
}

export interface BaseProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface InfluencerProfile extends BaseProfile {
  categories: string[];
  socialMedia: SocialMediaStats;
  pricing?: {
    postRate?: number;
    storyRate?: number;
    videoRate?: number;
  };
}

export interface BusinessProfile extends BaseProfile {
  company: string;
  industry: string;
  website?: string;
  campaigns?: string[];
}