import React, { useState } from 'react';
import EpisodeListItem from '../components/EpisodeListItem';
import { comingSoonData } from '../data/mockData';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ComingSoonScreen: React.FC = () => {
  const [activeDay, setActiveDay] = useState('Wed');
  const [showsData, setShowsData] = useState(comingSoonData);
  const [reminders, setReminders] = useState<number[]>([]);
  
  const handleRatingChange = (day: string, showId: number, newRating: number) => {
    const dayKey = day.toLowerCase() as keyof typeof comingSoonData;
    
    setShowsData(prevData => {
        const updatedDayShows = prevData[dayKey].map(show => {
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
        });
        
        return {
            ...prevData,
            [dayKey]: updatedDayShows
        };
    });
  };

  const handleToggleReminder = (id: number) => {
    setReminders(prev => 
      prev.includes(id) ? prev.filter(remId => remId !== id) : [...prev, id]
    );
  };

  const showsForDay = showsData[activeDay.toLowerCase() as keyof typeof showsData] || [];

  return (
    <div>
      <div className="sticky top-0 bg-brand-dark z-10 p-4">
        <div className="flex justify-around bg-brand-gray rounded-full p-1">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${activeDay === day ? 'bg-brand-purple text-white' : 'text-brand-text-secondary'}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-4">
        {showsForDay.length > 0 ? (
           showsForDay.map(show => (
            <EpisodeListItem 
              key={show.id} 
              show={show}
              onRatingChange={(rating) => handleRatingChange(activeDay, show.id, rating)}
              isComingSoon={true}
              isReminderSet={reminders.includes(show.id)}
              onToggleReminder={handleToggleReminder}
            />
          ))
        ) : (
          <div className="text-center text-brand-text-secondary py-10">
            No releases scheduled for {activeDay}.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoonScreen;
