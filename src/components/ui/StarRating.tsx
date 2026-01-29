import React from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

export default function StarRating({ rating, max = 5, className = "", size = 20 }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (rating >= i) {
      // Full star
      stars.push(
        <Star key={i} className={`fill-yellow-400 text-yellow-400`} size={size} />
      );
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(
        <div key={i} className="relative">
          <Star className="text-yellow-400" size={size} /> {/* Background star outline */}
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="fill-yellow-400 text-yellow-400" size={size} />
          </div>
        </div>
      );
    } else {
      // Empty star (optional, visually often better to show empty stars or just leave blank space)
      // Based on design, usually we show empty stars as gray or outline.
      // Let's assume standard behavior is outline gray or just missing. 
      // The design has yellow stars. Let's stick to adding empty gray ones if needed, or just yellow ones.
      // Actually, standard is usually gray fill for empty.
      stars.push(
        <Star key={i} className="text-gray-200 fill-gray-200" size={size} />
      );
    }
  }

  return <div className={`flex gap-1 ${className}`}>{stars}</div>;
}
