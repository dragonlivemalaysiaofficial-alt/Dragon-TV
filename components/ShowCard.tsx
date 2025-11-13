import React from 'react';
import { Show } from '../types';
import { PlusIcon, CheckIcon } from './Icons';

interface ShowCardProps {
  show: Show;
  onToggleFavorite: (id: number) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onToggleFavorite }) => {
  return (
    <div className="flex-shrink-0 w-28 md:w-36 group">
      <div className="relative rounded-lg overflow-hidden aspect-[3/4] transition-transform duration-300 group-hover:scale-105">
        <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
        {show.episode && (
          <div className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            Ep {show.episode}
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(show.id); }}
          className="absolute top-2 left-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-purple z-20"
          aria-label={show.isFavorite ? "Remove from My List" : "Add to My List"}
        >
          {show.isFavorite ? <CheckIcon className="w-4 h-4 text-white" /> : <PlusIcon className="w-4 h-4 text-white" />}
        </button>
      </div>
      <h3 className="text-sm font-semibold mt-2 truncate text-white">{show.title}</h3>
    </div>
  );
};

export default ShowCard;
