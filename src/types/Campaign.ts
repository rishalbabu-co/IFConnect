export interface Campaign {
  id: string;
  businessId: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  requirements: {
    minFollowers: number;
    platforms: string[];
    categories: string[];
  };
  deadline: Date;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface CampaignProposal {
  id: string;
  campaignId: string;
  influencerId: string;
  amount: number;
  pitch: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}