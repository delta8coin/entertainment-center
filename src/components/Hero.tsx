import type { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
}

const Hero = ({ movie, onMoreInfo }: HeroProps) => {
  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[30%] left-4 md:left-12 max-w-xl z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {movie.title}
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-6 line-clamp-3 drop-shadow">
          {movie.overview}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex items-center gap-2 px-6 py-2 bg-gray-500/70 text-white font-semibold rounded hover:bg-gray-500/50 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
