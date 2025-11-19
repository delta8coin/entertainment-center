import { useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import {
  featuredMovie,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  hemiSyncContent,
  documentaries,
} from '../data/movies';
import type { Movie } from '../types';

const HomePage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      {/* Hero Section */}
      <Hero movie={featuredMovie} onMoreInfo={handleMovieClick} />

      {/* Movie Rows */}
      <div className="-mt-16 sm:-mt-24 md:-mt-32 relative z-10 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <MovieRow
          title="Solfeggio Frequencies"
          movies={trendingNow}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Healing Frequencies"
          movies={topRated}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Brainwave States"
          movies={actionMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Hemi-Sync & Monroe Institute"
          movies={hemiSyncContent}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Science of Sound"
          movies={comedyMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Sound Healing Practices"
          movies={horrorMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Ancient Wisdom & Research"
          movies={documentaries}
          onMovieClick={handleMovieClick}
        />
      </div>

      {/* Modal */}
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </>
  );
};

export default HomePage;
