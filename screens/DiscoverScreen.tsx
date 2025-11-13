import React, { useState, useMemo } from 'react';
import EpisodeListItem from '../components/EpisodeListItem';
import FilterModal from '../components/FilterModal';
import { discoverData, allGenres } from '../data/mockData';
import { FilterIcon } from '../components/Icons';
import { Show } from '../types';

const DiscoverScreen: React.FC = () => {
  const [shows, setShows] = useState(discoverData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('rating');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleRatingChange = (showId: number, newRating: number) => {
    setShows(prevShows =>
      prevShows.map(show => {
        if (show.id === showId) {
          const oldTotalRating = (show.rating || 0) * (show.ratingCount || 0);
          const ratingCount = show.userRating ? show.ratingCount || 0 : (show.ratingCount || 0) + 1;
          
          const newTotalRating = oldTotalRating - (show.userRating || 0) + newRating;
          const newAverageRating = ratingCount > 0 ? newTotalRating / ratingCount : newRating;

          return {
            ...show,
            rating: newAverageRating,
            ratingCount: ratingCount,
            userRating: newRating
          };
        }
        return show;
      })
    );
  };

  const filteredAndSortedShows = useMemo(() => {
    let result = [...shows];

    // Filtering
    if (selectedGenres.length > 0) {
      result = result.filter(show => 
        selectedGenres.every(genre => show.genres?.includes(genre))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'date':
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [shows, sortOption, selectedGenres]);

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Last Episode</h1>
          <button onClick={() => setIsFilterOpen(true)} className="bg-brand-gray p-2 rounded-lg">
            <FilterIcon />
          </button>
        </div>
        {filteredAndSortedShows.map(show => (
          <EpisodeListItem 
            key={show.id} 
            show={show} 
            onRatingChange={(rating) => handleRatingChange(show.id, rating)} 
          />
        ))}
      </div>
      {isFilterOpen && (
        <FilterModal
          onClose={() => setIsFilterOpen(false)}
          sortOption={sortOption}
          setSortOption={setSortOption}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          allGenres={allGenres}
        />
      )}
    </>
  );
};

export default DiscoverScreen;
