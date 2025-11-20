import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FrequenciesPage from './pages/FrequenciesPage';
import SoundHealingPage from './pages/SoundHealingPage';
import MeditationPage from './pages/MeditationPage';
import ResearchPage from './pages/ResearchPage';
import LearnPage from './pages/LearnPage';
import ResonixPage from './pages/ResonixPage';
import LibraryPage from './pages/LibraryPage';
import FrequencyLabPage from './pages/FrequencyLabPage';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-netflix-black">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/frequencies" element={<FrequenciesPage />} />
          <Route path="/sound-healing" element={<SoundHealingPage />} />
          <Route path="/meditation" element={<MeditationPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/resonix" element={<ResonixPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/frequency-lab" element={<FrequencyLabPage />} />
        </Routes>

        {/* Footer */}
        <footer className="py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-gray-500 border-t border-gray-800/50 bg-gradient-to-b from-netflix-black to-black/90">
          <div className="max-w-7xl mx-auto">
            {/* Top Section - Quote */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 italic max-w-3xl mx-auto leading-relaxed">
                "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration."
              </blockquote>
              <cite className="block mt-3 sm:mt-4 text-sm sm:text-base text-netflix-red font-medium not-italic">
                — Nikola Tesla
              </cite>
            </div>

            {/* Footer Links - Organized Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
              {/* Frequencies */}
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-5 uppercase tracking-wider">
                  Frequencies
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Solfeggio Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      432 Hz Music
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Binaural Beats
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Frequency FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Healing */}
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-5 uppercase tracking-wider">
                  Healing
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Sound Therapy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Chakra Healing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Meditation Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Sacred Geometry
                    </a>
                  </li>
                </ul>
              </div>

              {/* Research */}
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-5 uppercase tracking-wider">
                  Research
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Research Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Hemi-Sync Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Monroe Institute
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Cymatics
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-5 uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors duration-200">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-8 sm:pt-10 border-t border-gray-800/50">
              <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
                {/* Social Links */}
                <div className="flex gap-5 sm:gap-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  &copy; {new Date().getFullYear()} Frequency & Vibration. Explore the healing power of sound energy.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
