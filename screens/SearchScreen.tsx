import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../components/Icons';
import { allShows } from '../data/mockData';
import ShowCard from '../components/ShowCard';
import { Show } from '../types';

interface SearchScreenProps {
  onClose: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState(allShows);

  const handleToggleFavorite = (id: number) => {
    setShows(prev => prev.map(show => 
      show.id === id ? { ...show, isFavorite: !show.isFavorite } : show
    ));
  };
  
  const searchResults = useMemo(() => {
    if (!query) return [];
    return shows.filter(show => show.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, shows]);
  
  const trendingSearches = useMemo(() => allShows.slice(0, 5).map(s => s.title), []);

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <header className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for movies or TV shows"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-brand-gray rounded-full py-2 pl-10 pr-4 text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-purple"
            autoFocus
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
        <button onClick={onClose} className="text-sm text-white flex-shrink-0">
          Cancel
        </button>
      </header>

      {query ? (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Results for "{query}"</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {searchResults.map(show => (
                <ShowCard key={show.id} show={show} onToggleFavorite={handleToggleFavorite} />
              ))}
            </div>
          ) : (
             <p className="text-brand-text-secondary text-center py-8">No results found.</p>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Trending Searches</h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map(term => (
              <button 
                key={term} 
                onClick={() => setQuery(term)}
                className="bg-brand-gray text-brand-text-secondary text-sm px-3 py-1 rounded-full hover:bg-brand-light-gray transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
