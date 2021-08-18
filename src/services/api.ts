import axios from 'axios';
import { LaunchesResponse, ApiResponse } from './types';

export const getLaunches = async(page: number, sortOrder: string): Promise<LaunchesResponse> => {
  try {
    const response: ApiResponse = await axios.post("https://api.spacexdata.com/v5/launches/query", {
      options: {
        page: page,
        sort: {
          "flight_number": sortOrder
       }
      }
    });

    return {
      launches: response.data.docs,
      hasPrevPage: response.data.hasPrevPage,
      hasNextPage: response.data.hasNextPage,
      totalPages: response.data.totalPages,
      error: false
    }
  } catch(e) {
    return { 
      launches: [],
      hasPrevPage: false,
      hasNextPage: false,
      totalPages: 0,
      error: true
    };
  }
};
