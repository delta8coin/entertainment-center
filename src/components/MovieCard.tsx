import { useState } from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index?: number;
}

const MovieCard = ({ movie, onClick, index = 0 }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[130px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[220px] cursor-pointer group/card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Movie Poster */}
      <div
        className={`relative rounded-md sm:rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out ${
          isHovered
            ? 'scale-105 sm:scale-110 shadow-2xl ring-2 ring-white/20'
            : 'scale-100'
        }`}
        style={{
          zIndex: isHovered ? 20 : 1,
        }}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        <img
          src={movie.poster_path}
          alt={movie.title}
          className={`w-full aspect-[2/3] object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-2 sm:p-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-white text-xs sm:text-sm font-semibold mb-1 line-clamp-2">
            {movie.title}
          </h3>

          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <span className="text-green-500 text-[10px] sm:text-xs font-semibold">
              {Math.round(movie.vote_average * 10)}%
            </span>
            <span className="text-gray-400 text-[10px] sm:text-xs">
              {movie.release_date?.split('-')[0]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                // Play action
              }}
              aria-label="Play"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                // Add to list action
              }}
              aria-label="Add to My List"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <button
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                // Like action
              }}
              aria-label="Like"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>

            <button
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-200 ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                onClick(movie);
              }}
              aria-label="More Info"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Touch indicator - subtle border on mobile */}
        <div className="absolute inset-0 rounded-md sm:rounded-lg border border-white/0 group-active/card:border-white/30 transition-colors duration-150 pointer-events-none md:hidden" />
      </div>
    </div>
  );
};

export default MovieCard;
