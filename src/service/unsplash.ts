import axios from 'axios';
import config from '../config';

export const fetchRandomPhotos = async ({
  count,
  query
}: {
  count: number;
  query: string;
}) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${config.UNSPLASH_ACCESS_KEY}`
    );
    const data = response.data;
    const imageUrls = data.map((currImgData: any) => currImgData.urls.small);

    return imageUrls;
  } catch (error: any) {
    throw new Error('Error fetching random photos', error);
  }
};
