import * as React from "react";
import { Campaign } from "../../types/Campaign";
import { formatCurrency } from "../../utils/format";

interface CampaignListProps {
  campaigns: Campaign[];
  onCampaignSelect: (campaign: Campaign) => void;
}

export function CampaignList({ campaigns, onCampaignSelect }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <stackLayout className="bg-gray-100 p-4 rounded-lg">
        <label className="text-gray-600 text-center">No campaigns found</label>
      </stackLayout>
    );
  }

  return (
    <stackLayout>
      {campaigns.map((campaign) => (
        <stackLayout
          key={campaign.id}
          className="bg-white p-4 rounded-lg shadow-sm mb-4"
          onTap={() => onCampaignSelect(campaign)}
        >
          <label className="font-bold text-lg">{campaign.title}</label>
          <label className="text-gray-600 mb-2">{campaign.description}</label>
          <gridLayout columns="*, *" className="mt-2">
            <label className="text-blue-600">
              {formatCurrency(campaign.budget.min)} - {formatCurrency(campaign.budget.max)}
            </label>
            <label className="text-right text-gray-500">
              {new Date(campaign.deadline).toLocaleDateString()}
            </label>
          </gridLayout>
        </stackLayout>
      ))}
    </stackLayout>
  );
}