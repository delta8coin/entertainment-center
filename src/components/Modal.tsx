import { useEffect } from 'react';
import type { Movie } from '../types';
import { genres } from '../data/movies';

interface ModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (movie) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const movieGenres = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-netflix-black rounded-t-xl sm:rounded-xl overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-netflix-black/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 focus-ring"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] flex-shrink-0">
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/40 to-transparent" />

            {/* Title and Buttons */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                {movie.title}
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button className="btn-primary text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </button>

                <button className="btn-icon" aria-label="Add to My List">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                <button className="btn-icon" aria-label="Like">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              {/* Left Column - Main Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-green-500 font-semibold text-sm sm:text-base">
                    {Math.round(movie.vote_average * 10)}% Match
                  </span>
                  <span className="text-gray-400 text-sm sm:text-base">
                    {movie.release_date?.split('-')[0]}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] sm:text-xs border border-gray-400 text-gray-400 rounded">
                    HD
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] sm:text-xs border border-gray-400 text-gray-400 rounded">
                    5.1
                  </span>
                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              {/* Right Column - Meta Info */}
              <div className="md:w-44 lg:w-48 flex-shrink-0 pt-3 md:pt-0 border-t border-gray-800 md:border-t-0">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                  <div>
                    <span className="text-gray-500 text-xs sm:text-sm">Genres: </span>
                    <span className="text-white text-xs sm:text-sm">{movieGenres || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 text-xs sm:text-sm">Rating: </span>
                    <span className="text-white text-xs sm:text-sm">{movie.vote_average.toFixed(1)}/10</span>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <span className="text-gray-500 text-xs sm:text-sm">Release: </span>
                    <span className="text-white text-xs sm:text-sm">{movie.release_date || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs sm:text-sm transition-colors duration-200">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs sm:text-sm transition-colors duration-200">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
