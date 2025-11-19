#!/usr/bin/env node

/**
 * Script to download all Pexels images used in the entertainment-center project
 * and generate updated movies.ts with local paths.
 *
 * Usage: node scripts/download-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// All Pexels photo IDs used in the project
const photoIds = [
  '3109808',   // 432 Hz - The Miracle Frequency
  '5803242',   // 396 Hz - Liberation from Fear
  '4175070',   // 417 Hz - Facilitating Change
  '1279330',   // 528 Hz - DNA Repair & Miracles
  '3184433',   // 639 Hz - Harmonious Relationships
  '15680091',  // 741 Hz - Awakening Intuition
  '816608',    // 852 Hz - Spiritual Order
  '1169754',   // 963 Hz - Divine Consciousness
  '2387793',   // 174 Hz - Pain Relief
  '1903702',   // 285 Hz - Tissue Regeneration
  '87651',     // 7.83 Hz - Schumann Resonance
  '30820149',  // Alpha Waves (8-12 Hz)
  '3560044',   // Theta Waves (4-8 Hz)
  '998641',    // Delta Waves (0.5-4 Hz)
  '373543',    // Gamma Waves (32-100 Hz)
  '3394666',   // Binaural Beats Explained
  '2088203',   // Cymatics: Visible Sound
  '14806282',  // Resonance & Entrainment
  '1181271',   // Sound Waves & Physics
  '3756766',   // Vibrational Medicine
  '164821',    // Harmonics & Overtones
  '6787202',   // Tibetan Singing Bowls
  '2422461',   // Crystal Bowl Therapy
  '3759657',   // Tuning Fork Healing
  '3820380',   // Gong Bath Meditation
  '3822864',   // Chanting & Mantras
  '2599244',   // What is Hemi-Sync?
  '5009158',   // Robert Monroe & The Monroe Institute
  '3560166',   // Focus 10: Mind Awake/Body Asleep
  '1252890',   // Focus 12: Expanded Awareness
  '924824',    // Focus 15: No Time
  '1421903',   // Focus 21: Other Energy Systems
  '2310641',   // The Gateway Experience
  '356040',    // CIA Gateway Process Analysis
  '33283',     // Pythagoras & Sacred Geometry
  '1426718',   // Dr. Masaru Emoto's Water Research
  '256262',    // Royal Rife & Frequencies
  '1229861',   // Nikola Tesla & 3-6-9
  '3825572',   // Modern Sound Therapy Research
];

// Image sizes to download
const sizes = [
  { width: 500, suffix: 'poster' },
  { width: 1920, suffix: 'backdrop' },
];

// Directory to save images
const imagesDir = path.join(projectRoot, 'public', 'images');

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Build Pexels URL for a photo
function getPexelsUrl(photoId, width) {
  // Handle the special case for photo 87651 which has a different URL format
  if (photoId === '87651') {
    return `https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

// Download a single image with retry logic
async function downloadImage(url, filepath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));
      return true;
    } catch (error) {
      if (attempt === retries) {
        console.error(`  Failed after ${retries} attempts: ${error.message}`);
        return false;
      }
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`  Retry ${attempt}/${retries} in ${delay/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
}

// Main download function
async function downloadAllImages() {
  console.log('='.repeat(60));
  console.log('Pexels Image Downloader for Entertainment Center');
  console.log('='.repeat(60));
  console.log();

  // Create images directory
  ensureDir(imagesDir);

  const totalImages = photoIds.length * sizes.length;
  let downloaded = 0;
  let failed = 0;
  let skipped = 0;

  console.log(`Downloading ${totalImages} images (${photoIds.length} photos × ${sizes.length} sizes)...`);
  console.log();

  for (const photoId of photoIds) {
    for (const { width, suffix } of sizes) {
      const filename = `${photoId}-${suffix}.jpeg`;
      const filepath = path.join(imagesDir, filename);

      // Skip if already downloaded
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        if (stats.size > 0) {
          console.log(`[SKIP] ${filename} (already exists)`);
          skipped++;
          continue;
        }
      }

      const url = getPexelsUrl(photoId, width);
      console.log(`[DOWN] ${filename}...`);

      const success = await downloadImage(url, filepath);
      if (success) {
        downloaded++;
      } else {
        failed++;
      }

      // Small delay to be nice to the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log();
  console.log('='.repeat(60));
  console.log('Download Summary');
  console.log('='.repeat(60));
  console.log(`Total images:     ${totalImages}`);
  console.log(`Downloaded:       ${downloaded}`);
  console.log(`Skipped:          ${skipped}`);
  console.log(`Failed:           ${failed}`);
  console.log();

  if (failed > 0) {
    console.log('Some downloads failed. Run the script again to retry.');
  }

  // Generate path mapping for updating movies.ts
  console.log('Generating path mappings...');
  const mappings = {};
  for (const photoId of photoIds) {
    mappings[photoId] = {
      poster: `/images/${photoId}-poster.jpeg`,
      backdrop: `/images/${photoId}-backdrop.jpeg`,
    };
  }

  // Save mappings to a JSON file for reference
  const mappingsPath = path.join(projectRoot, 'scripts', 'image-mappings.json');
  fs.writeFileSync(mappingsPath, JSON.stringify(mappings, null, 2));
  console.log(`Saved path mappings to: ${mappingsPath}`);

  console.log();
  console.log('Next steps:');
  console.log('1. Run this script to download all images');
  console.log('2. Run: node scripts/update-movies-paths.js');
  console.log('   to update movies.ts with local paths');
  console.log();

  return { downloaded, skipped, failed };
}

// Run the script
downloadAllImages().catch(console.error);
