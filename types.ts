export interface Show {
  id: number;
  title: string;
  poster: string;
  episode?: number;
  part?: number;
  rating?: number;
  ratingCount?: number;
  userRating?: number | null;
  views?: number;
  date?: string;
  progress?: number; // Value from 0 to 1
  genres?: string[];
  isFavorite?: boolean;
  type: 'Movie' | 'TV Show';
}

export enum Page {
  Home = 'Home',
  Discover = 'Discover',
  Coming = 'Coming',
  Account = 'Account',
}
