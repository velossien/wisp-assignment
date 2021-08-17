import axios from 'axios';
import { LaunchesResponse, SpaceXResponse } from './types';

export const getLaunches = async(page: number): Promise<LaunchesResponse> => {
  try {
    const response: SpaceXResponse = await axios.post("https://api.spacexdata.com/v5/launches/query", {
      options: {
        page: page,
      }
    });

    return {
      launches: response.data.docs,
      hasPrevPage: response.data.hasPrevPage,
      hasNextPage: response.data.hasNextPage,
      error: false
    }
  } catch(e) {
    return { 
      launches: [],
      hasPrevPage: false,
      hasNextPage: false,
      error: true
    };
  }
};

