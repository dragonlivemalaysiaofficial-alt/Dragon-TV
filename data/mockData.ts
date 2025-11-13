import { Show } from '../types';

export const allGenres = ["Action", "Adventure", "Fantasy", "Sci-Fi", "Historical", "Cultivation"];

const generateShow = (id: number, title: string, type: 'Movie' | 'TV Show', details: Partial<Show>): Show => ({
    id,
    title,
    type,
    poster: `https://picsum.photos/seed/anime${id}/300/400`,
    rating: parseFloat((Math.random() * 4 + 5.5).toFixed(1)),
    ratingCount: Math.floor(Math.random() * 1000) + 50,
    genres: allGenres.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2),
    isFavorite: Math.random() > 0.8,
    ...details
});

const shows: Show[] = [
    generateShow(1, 'Fight Through the Sky', 'TV Show', { episode: 172, part: 5, views: 244, date: '2025-11-08' }),
    generateShow(2, 'Veiled Dreams', 'TV Show', { episode: 20, part: 1, views: 40, date: '2025-11-08' }),
    generateShow(3, 'Soul Land II: The Unrivaled Tang', 'TV Show', { episode: 126, part: 2, views: 180, date: '2025-11-07' }),
    generateShow(4, 'Perfect World', 'Movie', { episode: 98, isFavorite: true }),
    generateShow(5, 'Martial Universe', 'TV Show', { episode: 50 }),
    generateShow(6, 'The Great Ruler', 'TV Show', { episode: 15 }),
    generateShow(7, 'Renegade Immortal', 'Movie', { episode: 34 }),
    generateShow(8, 'Fights Break Sphere', 'Movie', { poster: 'https://picsum.photos/seed/anime8/400/225' }),
    generateShow(9, 'Swallowed Star', 'TV Show', { poster: 'https://picsum.photos/seed/anime9/400/225', part: 3, episode: 82, progress: 0.75, isFavorite: true }),
    generateShow(10, "A Record of a Mortal's Journey", 'Movie', { poster: 'https://picsum.photos/seed/anime10/400/225', part: 2, episode: 40, progress: 0.3 }),
    generateShow(11, "The King's Avatar", 'TV Show', { poster: 'https://picsum.photos/seed/anime11/400/225', isFavorite: true }),
    generateShow(12, 'Tomb of Fallen Gods', 'TV Show', { episode: 15, part: 3, views: 23, date: '2025-11-07' }),
    generateShow(13, 'Jade Dynasty', 'Movie', { episode: 45, part: 2, views: 150, date: '2025-11-04' }),
    generateShow(14, 'Throne of Seal', 'TV Show', { episode: 184, part: 1, views: 195, date: '2025-11-05', progress: 0.5 }),
    generateShow(15, 'Word of Honor', 'TV Show', { episode: 26, part: 2, views: 26, date: '2025-11-05' }),
    generateShow(16, 'Great Journey of Teenagers', 'Movie', { episode: 24, part: 4, views: 177, date: '2025-06-11' }),
];

export const allShows = shows;

export const homeData = {
  movies: shows.filter(s => s.type === 'Movie').slice(0, 4),
  tvShows: shows.filter(s => s.type === 'TV Show').slice(0, 4),
  featured: shows.find(s => s.id === 1) as Show,
  continueWatching: shows.filter(s => s.progress && s.progress > 0),
  trending: shows.slice(7, 11).map(s => ({ ...s, poster: `https://picsum.photos/seed/anime${s.id}/400/225`})),
  popularMovies: shows.filter(s => s.type === 'Movie').sort((a,b) => (b.ratingCount || 0) - (a.ratingCount || 0)).slice(0, 4),
  popularTvShows: shows.filter(s => s.type === 'TV Show').sort((a,b) => (b.ratingCount || 0) - (a.ratingCount || 0)).slice(0, 4),
};

export const discoverData: Show[] = [
    shows.find(s => s.id === 2) as Show,
    shows.find(s => s.id === 1) as Show,
    shows.find(s => s.id === 12) as Show,
    shows.find(s => s.id === 3) as Show,
];

export const comingSoonData = {
  mon: [],
  tue: [
     { ...shows.find(s => s.id === 13) as Show, episode: 46, date: '2025-11-11' }
  ],
  wed: [
    { ...shows.find(s => s.id === 14) as Show, episode: 185, date: '2025-11-12' },
    { ...shows.find(s => s.id === 15) as Show, episode: 27, date: '2025-11-12' },
    { ...shows.find(s => s.id === 16) as Show, episode: 25, date: '2025-11-12' },
  ],
  thu: [],
  fri: [
      { ...shows.find(s => s.id === 12) as Show, episode: 16, date: '2025-11-14' },
  ],
  sat: [
      { ...shows.find(s => s.id === 1) as Show, episode: 173, date: '2025-11-15' },
  ],
  sun: []
};
