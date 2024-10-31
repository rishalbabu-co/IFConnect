interface InstagramStats {
  followers_count: number;
  media_count: number;
  username: string;
}

interface YouTubeStats {
  subscriberCount: number;
  videoCount: number;
  channelId: string;
}

export const connectInstagramAccount = async (accessToken: string): Promise<InstagramStats> => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username,account_type,media_count,followers_count&access_token=${accessToken}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error connecting Instagram:', error);
    throw error;
  }
};

export const connectYouTubeChannel = async (accessToken: string): Promise<YouTubeStats> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&mine=true&access_token=${accessToken}`
    );
    const data = await response.json();
    return {
      subscriberCount: parseInt(data.items[0].statistics.subscriberCount),
      videoCount: parseInt(data.items[0].statistics.videoCount),
      channelId: data.items[0].id
    };
  } catch (error) {
    console.error('Error connecting YouTube:', error);
    throw error;
  }
};