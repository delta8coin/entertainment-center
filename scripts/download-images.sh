#!/bin/bash

# Script to download all Pexels images used in the entertainment-center project
# Usage: bash scripts/download-images.sh

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGES_DIR="$PROJECT_ROOT/public/images"

# Create images directory
mkdir -p "$IMAGES_DIR"

echo "============================================================"
echo "Pexels Image Downloader for Entertainment Center"
echo "============================================================"
echo ""

# All Pexels photo IDs used in the project
PHOTO_IDS=(
  "3109808"   # 432 Hz - The Miracle Frequency
  "5803242"   # 396 Hz - Liberation from Fear
  "4175070"   # 417 Hz - Facilitating Change
  "1279330"   # 528 Hz - DNA Repair & Miracles
  "3184433"   # 639 Hz - Harmonious Relationships
  "15680091"  # 741 Hz - Awakening Intuition
  "816608"    # 852 Hz - Spiritual Order
  "1169754"   # 963 Hz - Divine Consciousness
  "2387793"   # 174 Hz - Pain Relief
  "1903702"   # 285 Hz - Tissue Regeneration
  "87651"     # 7.83 Hz - Schumann Resonance
  "30820149"  # Alpha Waves (8-12 Hz)
  "3560044"   # Theta Waves (4-8 Hz)
  "998641"    # Delta Waves (0.5-4 Hz)
  "373543"    # Gamma Waves (32-100 Hz)
  "3394666"   # Binaural Beats Explained
  "2088203"   # Cymatics: Visible Sound
  "14806282"  # Resonance & Entrainment
  "1181271"   # Sound Waves & Physics
  "3756766"   # Vibrational Medicine
  "164821"    # Harmonics & Overtones
  "6787202"   # Tibetan Singing Bowls
  "2422461"   # Crystal Bowl Therapy
  "3759657"   # Tuning Fork Healing
  "3820380"   # Gong Bath Meditation
  "3822864"   # Chanting & Mantras
  "2599244"   # What is Hemi-Sync?
  "5009158"   # Robert Monroe & The Monroe Institute
  "3560166"   # Focus 10: Mind Awake/Body Asleep
  "1252890"   # Focus 12: Expanded Awareness
  "924824"    # Focus 15: No Time
  "1421903"   # Focus 21: Other Energy Systems
  "2310641"   # The Gateway Experience
  "356040"    # CIA Gateway Process Analysis
  "33283"     # Pythagoras & Sacred Geometry
  "1426718"   # Dr. Masaru Emoto's Water Research
  "256262"    # Royal Rife & Frequencies
  "1229861"   # Nikola Tesla & 3-6-9
  "3825572"   # Modern Sound Therapy Research
)

TOTAL=$((${#PHOTO_IDS[@]} * 2))
DOWNLOADED=0
SKIPPED=0
FAILED=0

echo "Downloading $TOTAL images (${#PHOTO_IDS[@]} photos × 2 sizes)..."
echo ""

for PHOTO_ID in "${PHOTO_IDS[@]}"; do
  # Download poster (500px)
  POSTER_FILE="$IMAGES_DIR/${PHOTO_ID}-poster.jpeg"
  if [[ -f "$POSTER_FILE" && -s "$POSTER_FILE" ]]; then
    echo "[SKIP] ${PHOTO_ID}-poster.jpeg (already exists)"
    ((SKIPPED++))
  else
    # Handle special case for photo 87651
    if [[ "$PHOTO_ID" == "87651" ]]; then
      POSTER_URL="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=500"
    else
      POSTER_URL="https://images.pexels.com/photos/${PHOTO_ID}/pexels-photo-${PHOTO_ID}.jpeg?auto=compress&cs=tinysrgb&w=500"
    fi

    echo "[DOWN] ${PHOTO_ID}-poster.jpeg..."
    if curl -sSL --retry 3 --retry-delay 2 -o "$POSTER_FILE" "$POSTER_URL"; then
      ((DOWNLOADED++))
    else
      echo "  Failed to download ${PHOTO_ID}-poster.jpeg"
      ((FAILED++))
    fi
  fi

  # Download backdrop (1920px)
  BACKDROP_FILE="$IMAGES_DIR/${PHOTO_ID}-backdrop.jpeg"
  if [[ -f "$BACKDROP_FILE" && -s "$BACKDROP_FILE" ]]; then
    echo "[SKIP] ${PHOTO_ID}-backdrop.jpeg (already exists)"
    ((SKIPPED++))
  else
    # Handle special case for photo 87651
    if [[ "$PHOTO_ID" == "87651" ]]; then
      BACKDROP_URL="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920"
    else
      BACKDROP_URL="https://images.pexels.com/photos/${PHOTO_ID}/pexels-photo-${PHOTO_ID}.jpeg?auto=compress&cs=tinysrgb&w=1920"
    fi

    echo "[DOWN] ${PHOTO_ID}-backdrop.jpeg..."
    if curl -sSL --retry 3 --retry-delay 2 -o "$BACKDROP_FILE" "$BACKDROP_URL"; then
      ((DOWNLOADED++))
    else
      echo "  Failed to download ${PHOTO_ID}-backdrop.jpeg"
      ((FAILED++))
    fi
  fi

  # Small delay to be nice to the server
  sleep 0.1
done

echo ""
echo "============================================================"
echo "Download Summary"
echo "============================================================"
echo "Total images:     $TOTAL"
echo "Downloaded:       $DOWNLOADED"
echo "Skipped:          $SKIPPED"
echo "Failed:           $FAILED"
echo ""

if [[ $FAILED -gt 0 ]]; then
  echo "Some downloads failed. Run the script again to retry."
fi

echo ""
echo "Next steps:"
echo "1. Run: node scripts/update-movies-paths.js"
echo "   to update movies.ts with local paths"
echo ""
