import { useEffect } from 'react';
import { useResonixStore } from '../stores/resonixStore';
import Transport from '../components/resonix/Transport';
import TrackList from '../components/resonix/TrackList';
import Visualizer from '../components/resonix/Visualizer';
import EffectsRack from '../components/resonix/EffectsRack';
import PresetSelector from '../components/resonix/PresetSelector';
import MasterControls from '../components/resonix/MasterControls';

export default function ResonixPage() {
  const { transport, setPlaying, saveProject, exportProject } = useResonixStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          setPlaying(!transport.isPlaying);
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            saveProject();
          } else {
            e.preventDefault();
            setPlaying(false);
          }
          break;
        case 'e':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            exportProject();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [transport.isPlaying, setPlaying, saveProject, exportProject]);

  // Animated background particles
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = ['#a855f7', '#ec4899', '#06b6d4', '#14b8a6'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <canvas
        id="particles-canvas"
        className="fixed inset-0 pointer-events-none opacity-30"
      />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-600/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Resonix
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-purple-300/80 mb-2">The Frequency Forge</p>
            <p className="text-xs sm:text-sm text-purple-400/60 max-w-2xl mx-auto px-4">
              Professional brain-wave entrainment and frequency synthesis laboratory.
              Create binaural beats, isochronic tones, and multi-layered soundscapes.
            </p>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-purple-900/20 border border-purple-500/20 rounded-lg">
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm text-purple-300/80">
              <span className="whitespace-nowrap">
                <kbd className="px-2 py-1 bg-purple-900/40 border border-purple-500/40 rounded text-xs">
                  SPACE
                </kbd>{' '}
                Play/Pause
              </span>
              <span className="whitespace-nowrap">
                <kbd className="px-2 py-1 bg-purple-900/40 border border-purple-500/40 rounded text-xs">
                  S
                </kbd>{' '}
                Stop
              </span>
              <span className="whitespace-nowrap">
                <kbd className="px-2 py-1 bg-purple-900/40 border border-purple-500/40 rounded text-xs">
                  Ctrl+S
                </kbd>{' '}
                Save
              </span>
              <span className="whitespace-nowrap">
                <kbd className="px-2 py-1 bg-purple-900/40 border border-purple-500/40 rounded text-xs">
                  Ctrl+E
                </kbd>{' '}
                Export
              </span>
            </div>
          </div>

          {/* Preset Selector */}
          <div className="mb-6 sm:mb-8">
            <PresetSelector />
          </div>

          {/* Transport Controls */}
          <div className="mb-6 sm:mb-8">
            <Transport />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Tracks - Takes 2 columns */}
            <div className="lg:col-span-2 w-full">
              <TrackList />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4 sm:space-y-6 w-full">
              {/* Visualizer */}
              <Visualizer />

              {/* Master Controls */}
              <MasterControls />
            </div>
          </div>

          {/* Effects Rack */}
          <div className="mb-6 sm:mb-8">
            <EffectsRack />
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-purple-500/20">
            <p className="text-purple-400/60 text-xs sm:text-sm mb-2 px-4">
              "If you want to find the secrets of the universe, think in terms of energy,
              frequency and vibration."
            </p>
            <p className="text-purple-500/80 text-xs">— Nikola Tesla</p>
          </div>
        </div>
      </div>
    </div>
  );
}
