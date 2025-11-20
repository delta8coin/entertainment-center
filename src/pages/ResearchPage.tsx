import { useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import { hemiSyncContent, comedyMovies, documentaries } from '../data/movies';
import type { Movie } from '../types';

// Featured content for Research - CIA Gateway Process
const featuredResearch: Movie = {
  id: 39,
  title: "CIA Gateway Process Analysis",
  overview: "In 1983, the CIA commissioned an analysis of the Gateway Experience that would become one of the most fascinating declassified documents in history. The report explains how Hemi-Sync works through frequency following response, describes the holographic nature of reality, and validates the potential for consciousness to transcend space-time. This groundbreaking document brought mainstream attention to Monroe's work and legitimized the scientific study of altered states of consciousness.",
  poster_path: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=500",
  backdrop_path: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1920",
  release_date: "2024-01-01",
  vote_average: 9.5,
  genre_ids: [6, 7, 9],
  video_id: "5vUaCjYq1cY",
};

const ResearchPage = () => {
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
      <Hero movie={featuredResearch} onMoreInfo={handleMovieClick} />

      {/* Content Section */}
      <div className="-mt-16 sm:-mt-24 md:-mt-32 relative z-10 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Page Introduction */}
          <div className="mb-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Research & Ancient Wisdom
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Dive deep into the scientific research behind sound healing, consciousness exploration, and the ancient
                wisdom that modern science is only beginning to understand. From the Monroe Institute's pioneering work
                to Tesla's revelations about frequency, discover the evidence behind vibrational healing.
              </p>
            </div>
          </div>

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
            title="Ancient Wisdom & Pioneers"
            movies={documentaries}
            onMovieClick={handleMovieClick}
          />

          {/* Key Researchers Section */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
              Pioneers in Sound Research
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
              <div className="bg-white/5 rounded-lg p-5">
                <h4 className="text-white font-medium mb-2">Robert Monroe</h4>
                <p className="text-gray-400 text-sm">
                  Founder of the Monroe Institute and developer of Hemi-Sync technology for consciousness exploration.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h4 className="text-white font-medium mb-2">Nikola Tesla</h4>
                <p className="text-gray-400 text-sm">
                  Visionary inventor who understood that energy, frequency, and vibration are the keys to the universe.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h4 className="text-white font-medium mb-2">Pythagoras</h4>
                <p className="text-gray-400 text-sm">
                  Ancient Greek philosopher who discovered the mathematical relationships between musical intervals.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h4 className="text-white font-medium mb-2">Dr. Masaru Emoto</h4>
                <p className="text-gray-400 text-sm">
                  Researcher who demonstrated how consciousness and sound affect the molecular structure of water.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h4 className="text-white font-medium mb-2">Dr. Royal Rife</h4>
                <p className="text-gray-400 text-sm">
                  Developer of frequency therapy devices and the concept of mortal oscillatory rates.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h4 className="text-white font-medium mb-2">Hans Jenny</h4>
                <p className="text-gray-400 text-sm">
                  Pioneer of cymatics who revealed how sound creates visible geometric patterns in matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </>
  );
};

export default ResearchPage;
