#!/usr/bin/env node

/**
 * Script to update movies.ts to use local image paths instead of Pexels URLs.
 *
 * Usage: node scripts/update-movies-paths.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const moviesPath = path.join(projectRoot, 'src', 'data', 'movies.ts');

// Read the current movies.ts
let content = fs.readFileSync(moviesPath, 'utf-8');

console.log('Updating movies.ts to use local image paths...');
console.log();

// Replace all Pexels poster URLs (500px) with local paths
// Pattern: https://images.pexels.com/photos/PHOTO_ID/pexels-photo-PHOTO_ID.jpeg?auto=compress&cs=tinysrgb&w=500
// Or: https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=500
const posterRegex = /https:\/\/images\.pexels\.com\/photos\/(\d+)\/[^"]+\?auto=compress&cs=tinysrgb&w=500/g;
content = content.replace(posterRegex, (match, photoId) => {
  console.log(`  Poster: ${photoId} -> /images/${photoId}-poster.jpeg`);
  return `/images/${photoId}-poster.jpeg`;
});

// Replace all Pexels backdrop URLs (1920px) with local paths
const backdropRegex = /https:\/\/images\.pexels\.com\/photos\/(\d+)\/[^"]+\?auto=compress&cs=tinysrgb&w=1920/g;
content = content.replace(backdropRegex, (match, photoId) => {
  console.log(`  Backdrop: ${photoId} -> /images/${photoId}-backdrop.jpeg`);
  return `/images/${photoId}-backdrop.jpeg`;
});

// Write the updated content
fs.writeFileSync(moviesPath, content);

console.log();
console.log('Successfully updated movies.ts with local image paths!');
console.log();
console.log('The images will now be served from /public/images/ directory.');
console.log('Make sure to run the download script first to get all images.');
