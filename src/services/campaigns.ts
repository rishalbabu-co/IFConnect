import firestore from '@react-native-firebase/firestore';
import { Campaign, CampaignProposal } from '../types/Campaign';

export const createCampaign = async (campaignData: Partial<Campaign>): Promise<Campaign> => {
  const currentUser = auth().currentUser;
  if (!currentUser) throw new Error('Not authenticated');

  const campaign = {
    ...campaignData,
    businessId: currentUser.uid,
    status: 'active',
    createdAt: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  };

  const docRef = await firestore()
    .collection('campaigns')
    .add(campaign);

  return {
    id: docRef.id,
    ...campaign
  } as Campaign;
};

export const getCampaigns = async (filters?: {
  status?: Campaign['status'];
  businessId?: string;
}): Promise<Campaign[]> => {
  let query = firestore().collection('campaigns');

  if (filters?.status) {
    query = query.where('status', '==', filters.status);
  }
  if (filters?.businessId) {
    query = query.where('businessId', '==', filters.businessId);
  }

  const snapshot = await query.orderBy('createdAt', 'desc').get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Campaign[];
};

export const submitProposal = async (
  campaignId: string,
  proposal: Partial<CampaignProposal>
): Promise<CampaignProposal> => {
  const currentUser = auth().currentUser;
  if (!currentUser) throw new Error('Not authenticated');

  const proposalData = {
    ...proposal,
    campaignId,
    influencerId: currentUser.uid,
    status: 'pending',
    createdAt: new Date()
  };

  const docRef = await firestore()
    .collection('proposals')
    .add(proposalData);

  return {
    id: docRef.id,
    ...proposalData
  } as CampaignProposal;
};