import React from 'react';
import { Show } from '../types';
import { ChevronRightIcon, BellIcon } from './Icons';
import StarRating from './StarRating';

interface EpisodeListItemProps {
  show: Show;
  onRatingChange: (newRating: number) => void;
  isReminderSet?: boolean;
  onToggleReminder?: (id: number) => void;
  isComingSoon?: boolean;
}

const EpisodeListItem: React.FC<EpisodeListItemProps> = ({ show, onRatingChange, isReminderSet, onToggleReminder, isComingSoon = false }) => {
  return (
    <div className="bg-brand-gray rounded-lg p-4 flex items-start space-x-4">
      <img src={show.poster} alt={show.title} className="w-24 h-36 object-cover rounded-md flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-lg truncate">{show.title}</h3>
        <p className="text-brand-text-secondary text-sm mt-1">Date: {show.date}</p>
        <div className="flex items-center my-2 space-x-2">
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
        <p className="text-brand-text-secondary text-sm mt-2">Views: {show.views}</p>
      </div>
      <div className="self-center">
        {isComingSoon && onToggleReminder ? (
          <button 
            onClick={() => onToggleReminder(show.id)}
            className="bg-brand-light-gray w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors"
            aria-label={isReminderSet ? 'Cancel reminder' : 'Set reminder'}
            >
            <BellIcon filled={!!isReminderSet} />
          </button>
        ) : (
          <button className="bg-brand-light-gray w-8 h-8 rounded-full flex items-center justify-center">
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default EpisodeListItem;
