import type { Movie } from '../types';
import { genres } from '../data/movies';

interface ModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
  if (!movie) return null;

  const movieGenres = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-netflix-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-netflix-black flex items-center justify-center hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5 text-white"
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

        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[400px]">
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />

          {/* Title and Buttons */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {movie.title}
            </h2>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>

              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span className="text-gray-400">
                  {movie.release_date?.split('-')[0]}
                </span>
                <span className="px-1.5 py-0.5 text-xs border border-gray-400 text-gray-400">
                  HD
                </span>
              </div>

              <p className="text-gray-200 text-sm leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Right Column */}
            <div className="md:w-48">
              <div className="mb-3">
                <span className="text-gray-500 text-sm">Genres: </span>
                <span className="text-white text-sm">{movieGenres}</span>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Rating: </span>
                <span className="text-white text-sm">{movie.vote_average}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
