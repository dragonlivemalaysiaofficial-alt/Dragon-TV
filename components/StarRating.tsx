import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  readOnly = false,
  totalStars = 5,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const currentRating = hoverRating || rating;
        return (
          <button
            key={i}
            type="button"
            onMouseOver={() => handleMouseOver(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            disabled={readOnly}
            className={`cursor-${readOnly ? 'default' : 'pointer'} transition-transform duration-100 ${!readOnly && hoverRating > 0 ? 'transform scale-125' : ''}`}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <StarIcon filled={starValue <= currentRating} />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
