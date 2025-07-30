import { useState } from 'react';

export default function RatingStars({ rating = 0, editable = false, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (value) => {
    if (editable && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            className={`text-xl ${filled ? 'text-yellow-400' : 'text-gray-400'} ${
              editable ? 'cursor-pointer hover:scale-110' : ''
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => editable && setHoverRating(star)}
            onMouseLeave={() => editable && setHoverRating(0)}
            disabled={!editable}
          >
            {filled ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
}