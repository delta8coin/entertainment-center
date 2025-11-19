# Resonix — The Frequency Forge

> The Photoshop for Frequencies. A professional-grade browser-based frequency laboratory for creating binaural beats, isochronic tones, and multi-layered soundscapes.

## 🌟 Overview

Resonix is a powerful, real-time audio synthesis and composition tool built for sound healers, brain-wave enthusiasts, meditation practitioners, and audio engineers. Create complex multi-track frequency compositions with precision Hz control, master effects, and exportable projects.

## ✨ Features

### Multi-Track Audio Engine
- **Oscillator Tracks**: Sine, square, sawtooth, and triangle waveforms
- **Noise Generators**: White, pink, brown noise
- **Binaural Beats**: Different frequencies per ear for brain-wave entrainment
- **Isochronic Tones**: Pulsing amplitude-modulated carriers
- **Precision Control**: 0.001 Hz frequency precision

### Brain-Wave Entrainment Presets
Pre-configured professional protocols:
- **Hemi-Sync Focus 10**: Mind awake, body asleep (4Hz theta)
- **Hemi-Sync Focus 12**: Expanded awareness (6Hz theta)
- **Deep Delta Sleep**: Ultra-deep sleep induction (1-3Hz delta)
- **Gamma Burst Focus**: Peak mental performance (40Hz gamma)
- **Alpha Wave Meditation**: Relaxed awareness (10Hz alpha)
- **Full Chakra Healing**: Solfeggio frequencies + theta waves
- **Schumann Resonance**: Earth's natural frequency (7.83Hz)
- **Lucid Dream Induction**: REM enhancement (4-7Hz theta)

### Master Effects Rack
- **Reverb**: Adjustable decay and wet/dry mix
- **Delay**: Configurable time, feedback, and wet mix
- **3-Band EQ**: Low, mid, high frequency control
- **Compressor**: Dynamic range control with threshold and ratio
- **Limiter**: Output protection

### Professional Features
- **Real-time Visualizer**: Waveform and spectrum analysis
- **Project Save/Load**: LocalForage persistence
- **WAV Export**: 32-bit float audio export
- **Keyboard Shortcuts**: Streamlined workflow
- **Responsive Design**: Works on desktop and mobile

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `SPACE` | Play/Pause |
| `S` | Stop |
| `Ctrl+S` | Save Project |
| `Ctrl+E` | Export WAV |
| `L` | Toggle Loop |

## 🏗️ Technical Architecture

### Tech Stack
- **React 19**: Modern UI with hooks
- **TypeScript**: Type-safe development
- **Tone.js**: Professional Web Audio API framework
- **Zustand**: Lightweight state management
- **LocalForage**: IndexedDB storage wrapper
- **Tailwind CSS**: Utility-first styling
- **Vite**: Lightning-fast build tool

### Project Structure

```
src/
├── pages/
│   └── ResonixPage.tsx              # Main page with layout
├── components/resonix/
│   ├── Transport.tsx                # Play/pause/stop controls
│   ├── TrackList.tsx                # Track container
│   ├── Track.tsx                    # Individual track component
│   ├── TrackControls.tsx            # Track-specific controls
│   ├── AddTrackButton.tsx           # Track creation menu
│   ├── Visualizer.tsx               # Waveform/spectrum display
│   ├── EffectsRack.tsx              # Master effects UI
│   ├── PresetSelector.tsx           # Preset browser
│   └── MasterControls.tsx           # Master volume and export
├── stores/
│   └── resonixStore.ts              # Zustand state management
├── services/
│   └── audioEngine.ts               # Tone.js audio engine
├── data/
│   └── resonixPresets.ts            # Brain-wave presets
└── types/
    └── resonix.ts                   # TypeScript definitions
```

## 🚀 Getting Started

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

```bash
npm run dev
```

Navigate to `http://localhost:5173/resonix`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design Philosophy

Resonix features a mystical dark-mode interface with a purple/teal/cyan color palette inspired by frequency visualization and brain-wave imagery. The design emphasizes:

- **Clarity**: Intuitive controls with clear visual feedback
- **Professionalism**: Studio-grade precision and quality
- **Beauty**: Gradient overlays and animated particles
- **Accessibility**: Keyboard shortcuts and responsive layout

## 📚 Usage Guide

### Creating Your First Composition

1. **Browse Presets**: Click "Browse Presets" to explore brain-wave protocols
2. **Load a Preset**: Click any preset card to load it
3. **Add Tracks**: Use the "+ Add Track" button to add oscillators, noise, or binaural beats
4. **Adjust Parameters**: Expand track controls to fine-tune frequencies
5. **Play**: Hit the play button or press SPACE
6. **Export**: Save your project or export as WAV

### Understanding Track Types

#### Oscillator
Pure tones with selectable waveforms. Perfect for:
- Solfeggio frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz)
- Carrier tones for binaural beats
- Musical notes

#### Noise Generator
Colored noise for masking and texture:
- **White**: Equal energy across all frequencies
- **Pink**: More bass energy (1/f spectrum)
- **Brown**: Even more bass (1/f² spectrum)

#### Binaural Beat
Creates brain-wave entrainment by sending different frequencies to each ear:
- Left ear: Base frequency - left offset
- Right ear: Base frequency + right offset
- Brain perceives the difference as a "beat"

Example: 200Hz base, ±5Hz offset = 10Hz alpha wave

#### Isochronic Tone
Pulsing tones with amplitude modulation:
- Carrier frequency: The base tone
- Pulse frequency: How fast it pulses

More effective than binaural for some users.

### Brain-Wave Frequency Ranges

- **Delta (0.5-4 Hz)**: Deep sleep, healing
- **Theta (4-8 Hz)**: Meditation, creativity, lucid dreaming
- **Alpha (8-12 Hz)**: Relaxation, light meditation
- **Beta (12-30 Hz)**: Focus, alertness, active thinking
- **Gamma (30-100 Hz)**: Peak performance, heightened awareness

## 🔧 Advanced Features

### Master Effects

Reverb and delay add space and depth. Use sparingly for clarity or generously for ambient soundscapes.

EQ can enhance specific frequency ranges or reduce harshness.

The compressor evens out dynamics, and the limiter prevents clipping.

### Project Management

Projects are saved to browser IndexedDB. Export to `.resonix` JSON format for backup or sharing.

WAV exports render the current composition at the specified duration.

## 🎯 Use Cases

- **Meditation Studios**: Create custom meditation soundscapes
- **Sleep Clinics**: Design delta-wave sleep protocols
- **Biohackers**: Experiment with brain-wave optimization
- **Sound Healers**: Craft solfeggio frequency sessions
- **Researchers**: Study brain-wave entrainment effects
- **Musicians**: Generate unique textural elements

## 🌐 Deployment

### Deploy to Vercel (One-Click)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy!

Vercel will auto-detect Vite and configure build settings.

### Manual Deployment

Build static assets:
```bash
npm run build
```

Deploy the `dist/` folder to any static host (Netlify, Cloudflare Pages, AWS S3, etc.)

## 🛠️ Customization

### Adding New Presets

Edit `/src/data/resonixPresets.ts`:

```typescript
{
  id: 'my-preset',
  name: 'My Custom Preset',
  description: 'Description here',
  category: 'focus',
  tracks: [
    {
      name: 'Alpha Wave',
      type: 'binaural',
      enabled: true,
      volume: 0.7,
      pan: 0,
      baseFrequency: 200,
      leftOffset: -5,
      rightOffset: 5,
    },
  ],
  effects: defaultEffects,
}
```

### Modifying Color Theme

The theme uses Tailwind CSS utilities. Main colors:
- Purple: `purple-400`, `purple-500`, `purple-600`
- Pink: `pink-400`, `pink-500`, `pink-600`
- Cyan: `cyan-400`, `cyan-500`, `cyan-600`
- Teal: `teal-400`, `teal-500`, `teal-600`

## 🐛 Troubleshooting

### Audio Not Playing
- Ensure browser allows autoplay (user interaction required first)
- Check master volume and individual track volumes
- Verify tracks are enabled (green checkmark)

### Export Not Working
- Browser may block downloads - check permissions
- Ensure sufficient disk space
- Try shorter duration exports first

### Performance Issues
- Reduce number of simultaneous tracks
- Disable reverb/delay if not needed
- Close other browser tabs

## 📝 License

This project is part of the Entertainment Center application.

## 🙏 Acknowledgments

- **Nikola Tesla**: For insights on frequency and vibration
- **Monroe Institute**: For Hemi-Sync research
- **Dr. Royal Rife**: For frequency healing research
- **Tone.js Team**: For the incredible Web Audio framework

---

## 🎵 "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration." — Nikola Tesla

Built with ❤️ for the sound healing and brain-wave communities.
