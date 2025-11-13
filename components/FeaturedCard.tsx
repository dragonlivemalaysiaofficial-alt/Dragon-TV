import React from 'react';
import { Show } from '../types';
import StarRating from './StarRating';
import { PlusIcon, CheckIcon } from './Icons';

interface FeaturedCardProps {
  show: Show;
  onRatingChange: (newRating: number) => void;
  onToggleFavorite: (id: number) => void;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ show, onRatingChange, onToggleFavorite }) => {
  return (
    <div className="bg-brand-gray rounded-lg p-3 flex items-center space-x-4 mx-4 my-6">
      <img src={show.poster} alt={show.title} className="w-16 h-24 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg">{show.title}</h3>
        <div className="flex items-center my-1 space-x-2">
          <StarRating 
            rating={show.userRating || Math.round(show.rating || 0)} 
            onRatingChange={onRatingChange} 
          />
          <span className="text-brand-text-secondary text-xs">
            {show.rating?.toFixed(1)} ({show.ratingCount} ratings)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-brand-purple/50 text-brand-purple border border-brand-purple text-xs font-bold px-2 py-1 rounded">
            P{show.part}
          </span>
          <span className="bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded">
            Ep {show.episode}
          </span>
        </div>
      </div>
       <button 
        onClick={() => onToggleFavorite(show.id)}
        className="bg-brand-light-gray rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 hover:bg-brand-purple transition-colors"
        aria-label={show.isFavorite ? "Remove from My List" : "Add to My List"}
      >
        {show.isFavorite ? <CheckIcon className="w-5 h-5 text-white" /> : <PlusIcon className="w-5 h-5 text-white" />}
      </button>
    </div>
  );
};

export default FeaturedCard;
