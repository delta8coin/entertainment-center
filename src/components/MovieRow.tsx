import { useRef, useState } from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieRow = ({ title, movies, onMovieClick }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative mb-8 group">
      {/* Title */}
      <h2 className="text-white text-lg md:text-xl font-semibold mb-3 px-4 md:px-12">
        {title}
      </h2>

      {/* Movie Row Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            showLeftArrow ? 'visible' : 'invisible'
          }`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Movies */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-scroll hide-scrollbar px-4 md:px-12 py-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            showRightArrow ? 'visible' : 'invisible'
          }`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
