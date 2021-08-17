export interface Launch {
  flight_number: number;
  date_utc: string;
  name: string;
  details: string;
  presskit: string | null;
}

export interface LaunchesResponse {
  launches: Launch[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  error: boolean;
}

export interface SpaceXResponse {
  data: {
    docs: Launch[];
    hasPrevPage: boolean;
    hasNextPage: boolean;
  }
}
