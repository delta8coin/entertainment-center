import { useState } from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[200px] md:w-[240px] cursor-pointer transition-transform duration-300 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
      style={{
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {/* Movie Poster */}
      <div className="relative rounded overflow-hidden shadow-lg">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-[300px] md:h-[360px] object-cover"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-white text-sm font-semibold mb-1 line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-xs font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span className="text-gray-400 text-xs">
              {movie.release_date?.split('-')[0]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button className="w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <button className="w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>

            <button className="w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition ml-auto">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
