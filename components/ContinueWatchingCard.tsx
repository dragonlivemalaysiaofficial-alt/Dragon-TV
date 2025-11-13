import React from 'react';
import { Show } from '../types';
import { PlayIcon, PlusIcon, CheckIcon } from './Icons';

interface ContinueWatchingCardProps {
  show: Show;
  onToggleFavorite: (id: number) => void;
}

const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({ show, onToggleFavorite }) => {
  const progressPercent = (show.progress || 0) * 100;

  return (
    <div className="flex-shrink-0 w-48 group">
      <div className="relative rounded-lg overflow-hidden aspect-video transition-transform duration-300 group-hover:scale-105">
        <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayIcon className="w-10 h-10 text-white/80" />
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(show.id); }}
          className="absolute top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-purple z-20"
          aria-label={show.isFavorite ? "Remove from My List" : "Add to My List"}
        >
          {show.isFavorite ? <CheckIcon className="w-4 h-4 text-white" /> : <PlusIcon className="w-4 h-4 text-white" />}
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div className="h-full bg-brand-purple" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold truncate text-white">{show.title}</h3>
        <p className="text-xs text-brand-text-secondary">
          P{show.part} Ep {show.episode}
        </p>
      </div>
    </div>
  );
};

export default ContinueWatchingCard;
