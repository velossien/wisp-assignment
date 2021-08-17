export interface Launch {
  flight_number: number;
  date_utc: string;
  name: string;
  details: string;
  links: {
    presskit: string | null;
  }
}

export interface LaunchesResponse {
  launches: Launch[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  error: boolean;
}

export interface ApiResponse {
  data: {
    docs: Launch[];
    hasPrevPage: boolean;
    hasNextPage: boolean;
    totalPages: number;
  }
}
