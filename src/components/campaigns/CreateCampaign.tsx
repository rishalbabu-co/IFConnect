import * as React from "react";
import { alert } from "@nativescript/core";
import { createCampaign } from "../../services/campaigns";

interface CreateCampaignProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateCampaign({ onClose, onSuccess }: CreateCampaignProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [minBudget, setMinBudget] = React.useState("");
  const [maxBudget, setMaxBudget] = React.useState("");
  const [minFollowers, setMinFollowers] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !minBudget || !maxBudget || !minFollowers) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await createCampaign({
        title,
        description,
        budget: {
          min: parseInt(minBudget),
          max: parseInt(maxBudget)
        },
        requirements: {
          minFollowers: parseInt(minFollowers),
          platforms: ["instagram", "youtube"],
          categories: []
        }
      });
      onSuccess();
      onClose();
    } catch (error) {
      alert({
        title: "Error",
        message: "Failed to create campaign",
        okButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <scrollView className="flex-1 bg-white p-4">
      <flexboxLayout className="flex-col">
        <label className="text-2xl font-bold mb-6">Create Campaign</label>

        <label className="text-sm mb-1">Campaign Title</label>
        <textField
          className="border rounded p-2 mb-4"
          text={title}
          onTextChange={(args) => setTitle(args.object.text)}
        />

        <label className="text-sm mb-1">Description</label>
        <textView
          className="border rounded p-2 mb-4 h-32"
          text={description}
          onTextChange={(args) => setDescription(args.object.text)}
        />

        <gridLayout columns="*, *" rows="auto" className="mb-4">
          <stackLayout col={0} className="mr-2">
            <label className="text-sm mb-1">Min Budget</label>
            <textField
              className="border rounded p-2"
              keyboardType="number"
              text={minBudget}
              onTextChange={(args) => setMinBudget(args.object.text)}
            />
          </stackLayout>
          <stackLayout col={1} className="ml-2">
            <label className="text-sm mb-1">Max Budget</label>
            <textField
              className="border rounded p-2"
              keyboardType="number"
              text={maxBudget}
              onTextChange={(args) => setMaxBudget(args.object.text)}
            />
          </stackLayout>
        </gridLayout>

        <label className="text-sm mb-1">Minimum Followers</label>
        <textField
          className="border rounded p-2 mb-6"
          keyboardType="number"
          text={minFollowers}
          onTextChange={(args) => setMinFollowers(args.object.text)}
        />

        <button
          className="bg-blue-500 text-white p-4 rounded-lg mb-2"
          onTap={handleSubmit}
          isEnabled={!loading}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>

        <button
          className="text-gray-500 p-2"
          onTap={onClose}
          isEnabled={!loading}
        >
          Cancel
        </button>
      </flexboxLayout>
    </scrollView>
  );
}