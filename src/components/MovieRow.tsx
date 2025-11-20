import { useRef, useState, useEffect } from 'react';
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  // Initial check for arrows
  useEffect(() => {
    handleScroll();
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative mb-6 sm:mb-8 md:mb-10 group/row">
      {/* Title */}
      <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 transition-colors duration-200">
        {title}
        <span className="inline-block ml-2 text-netflix-red opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 text-sm">
          Explore All &rsaquo;
        </span>
      </h2>

      {/* Movie Row Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 bottom-0 z-20 w-8 sm:w-10 md:w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all duration-300 ${
            showLeftArrow
              ? isTouchDevice
                ? 'opacity-70'
                : 'opacity-0 group-hover/row:opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white"
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
          className="flex gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto hide-scrollbar py-2 sm:py-3 md:py-4 touch-pan-x scroll-smooth"
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              index={index}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-0 bottom-0 z-20 w-8 sm:w-10 md:w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all duration-300 ${
            showRightArrow
              ? isTouchDevice
                ? 'opacity-70'
                : 'opacity-0 group-hover/row:opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white"
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
