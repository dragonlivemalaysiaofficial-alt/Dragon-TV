import React from 'react';
import { CloseIcon } from './Icons';

interface FilterModalProps {
  onClose: () => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  allGenres: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  sortOption,
  setSortOption,
  selectedGenres,
  setSelectedGenres,
  allGenres
}) => {
    const handleGenreToggle = (genre: string) => {
        setSelectedGenres(
            selectedGenres.includes(genre)
            ? selectedGenres.filter(g => g !== genre)
            : [...selectedGenres, genre]
        );
    };
    
    const handleReset = () => {
        setSortOption('rating');
        setSelectedGenres([]);
    }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-brand-gray w-full rounded-t-2xl p-4 max-h-[80vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center pb-4 border-b border-brand-light-gray">
          <h2 className="text-xl font-bold text-white">Sort & Filter</h2>
          <button onClick={onClose}><CloseIcon /></button>
        </header>
        
        <div className="flex-grow overflow-y-auto py-4 space-y-6">
            <section>
                <h3 className="font-semibold text-white mb-3">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                    {['Rating', 'Views', 'Date'].map(opt => (
                        <button key={opt} onClick={() => setSortOption(opt.toLowerCase())}
                        className={`px-4 py-2 text-sm rounded-full transition-colors ${sortOption === opt.toLowerCase() ? 'bg-brand-purple text-white' : 'bg-brand-light-gray text-brand-text-secondary'}`}>
                            {opt}
                        </button>
                    ))}
                </div>
            </section>
             <section>
                <h3 className="font-semibold text-white mb-3">Filter by Genre</h3>
                <div className="flex flex-wrap gap-2">
                    {allGenres.map(genre => (
                        <button key={genre} onClick={() => handleGenreToggle(genre)}
                        className={`px-4 py-2 text-sm rounded-full transition-colors border ${selectedGenres.includes(genre) ? 'bg-brand-purple text-white border-brand-purple' : 'border-brand-light-gray text-brand-text-secondary'}`}>
                            {genre}
                        </button>
                    ))}
                </div>
            </section>
        </div>

        <footer className="flex gap-4 pt-4 border-t border-brand-light-gray">
            <button onClick={handleReset} className="flex-1 py-3 bg-brand-light-gray text-white rounded-full font-semibold">Reset</button>
            <button onClick={onClose} className="flex-1 py-3 bg-brand-purple text-white rounded-full font-semibold">Apply</button>
        </footer>
      </div>
    </div>
  );
};

export default FilterModal;
