import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, showText = true, size = "text-sm" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }

  return (
    <div className="flex items-center gap-1">
      <div className={`flex text-yellow-400 ${size}`}>{stars}</div>
      {showText && (
        <span className="text-sm ml-1">
          {rating}
          <span className="text-gray-400">/5</span>
        </span>
      )}
    </div>
  );
};

export default Rating;