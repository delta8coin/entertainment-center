import type { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
}

const Hero = ({ movie, onMoreInfo }: HeroProps) => {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Multiple Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[15%] sm:bottom-[20%] md:bottom-[25%] lg:bottom-[30%] left-0 right-0 z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-2xl">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-netflix-red text-white text-xs font-bold tracking-wide">
                N
              </span>
              <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-widest uppercase">
                Series
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-5 drop-shadow-2xl leading-tight">
              {movie.title}
            </h1>

            {/* Rating and Year */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="text-green-500 font-semibold text-sm sm:text-base">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="text-gray-400 text-sm sm:text-base">
                {movie.release_date?.split('-')[0]}
              </span>
              <span className="px-1.5 py-0.5 text-xs border border-gray-400 text-gray-400 rounded">
                HD
              </span>
            </div>

            {/* Overview */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-5 md:mb-6 line-clamp-2 sm:line-clamp-3 drop-shadow-lg max-w-xl leading-relaxed">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="btn-primary text-sm sm:text-base">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play</span>
              </button>

              <button
                onClick={() => onMoreInfo(movie)}
                className="btn-secondary text-sm sm:text-base"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade for seamless transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-netflix-black to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
