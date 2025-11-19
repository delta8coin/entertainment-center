import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Modal from './components/Modal';
import {
  featuredMovie,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  documentaries,
} from './data/movies';
import type { Movie } from './types';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="relative min-h-screen bg-netflix-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero movie={featuredMovie} onMoreInfo={handleMovieClick} />

      {/* Movie Rows */}
      <div className="-mt-32 relative z-10 pb-20">
        <MovieRow
          title="Trending Now"
          movies={trendingNow}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Top Rated"
          movies={topRated}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Action & Adventure"
          movies={actionMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Comedy"
          movies={comedyMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Horror"
          movies={horrorMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Documentaries"
          movies={documentaries}
          onMovieClick={handleMovieClick}
        />
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-12 text-gray-500 text-sm">
        <div className="max-w-4xl">
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-gray-300 transition">Facebook</a>
            <a href="#" className="hover:text-gray-300 transition">Instagram</a>
            <a href="#" className="hover:text-gray-300 transition">Twitter</a>
            <a href="#" className="hover:text-gray-300 transition">YouTube</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <a href="#" className="hover:text-gray-300 transition">Audio Description</a>
            <a href="#" className="hover:text-gray-300 transition">Help Center</a>
            <a href="#" className="hover:text-gray-300 transition">Gift Cards</a>
            <a href="#" className="hover:text-gray-300 transition">Media Center</a>
            <a href="#" className="hover:text-gray-300 transition">Investor Relations</a>
            <a href="#" className="hover:text-gray-300 transition">Jobs</a>
            <a href="#" className="hover:text-gray-300 transition">Terms of Use</a>
            <a href="#" className="hover:text-gray-300 transition">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition">Legal Notices</a>
            <a href="#" className="hover:text-gray-300 transition">Cookie Preferences</a>
            <a href="#" className="hover:text-gray-300 transition">Corporate Information</a>
            <a href="#" className="hover:text-gray-300 transition">Contact Us</a>
          </div>
          <p className="text-xs">© 2024 Netflix Clone. Built for demonstration purposes.</p>
        </div>
      </footer>

      {/* Modal */}
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
