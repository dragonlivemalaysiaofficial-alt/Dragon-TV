import React from 'react';
import { Show } from '../types';
import { PlusIcon, CheckIcon } from './Icons';

interface TrendingCardProps {
  show: Show;
  onToggleFavorite: (id: number) => void;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ show, onToggleFavorite }) => {
  return (
    <div className="relative rounded-lg overflow-hidden aspect-video group transition-transform duration-300 hover:scale-105">
      <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
       <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(show.id); }}
          className="absolute top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-purple z-20"
          aria-label={show.isFavorite ? "Remove from My List" : "Add to My List"}
        >
          {show.isFavorite ? <CheckIcon className="w-4 h-4 text-white" /> : <PlusIcon className="w-4 h-4 text-white" />}
        </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <h3 className="text-white font-bold text-sm">{show.title}</h3>
      </div>
    </div>
  );
};

export default TrendingCard;
