# Image Download Scripts

This directory contains scripts to download all external Pexels images and store them locally in the repository.

## Why Download Images Locally?

- **Reliability**: No dependency on external services
- **Performance**: Faster loading from local files
- **Offline Support**: Works without internet access
- **Version Control**: Images are versioned with your code

## Prerequisites

- Node.js 18+ (for the Node.js script) or
- curl (for the bash script)
- Internet access to download from Pexels

## Usage

### Option 1: Using the Bash Script (Recommended)

```bash
# From the project root directory
bash scripts/download-images.sh
```

### Option 2: Using the Node.js Script

```bash
# From the project root directory
node scripts/download-images.js
```

Both scripts will:
1. Create `public/images/` directory if it doesn't exist
2. Download 78 images (39 photos × 2 sizes each)
3. Skip any images that already exist
4. Report download progress and summary

### After Downloading Images

Run the path update script to modify `movies.ts`:

```bash
node scripts/update-movies-paths.js
```

This will replace all Pexels URLs with local paths like `/images/3109808-poster.jpeg`.

## What Gets Downloaded

- **39 unique photos** from Pexels
- **2 sizes per photo**:
  - Poster: 500px width (for thumbnails)
  - Backdrop: 1920px width (for featured/hero images)
- **Total**: ~78 JPEG files, approximately 50-100MB

## Files

- `download-images.sh` - Bash script using curl
- `download-images.js` - Node.js script using fetch
- `update-movies-paths.js` - Updates movies.ts to use local paths
- `image-mappings.json` - Generated mapping file (created by Node.js script)

## Notes

- YouTube video embeds are NOT downloaded (copyright/ToS restrictions)
- Videos will continue to stream from YouTube
- Images are served from `/public/images/` which Vite serves at `/images/`

## Troubleshooting

If downloads fail:
1. Check your internet connection
2. Run the script again - it will skip already downloaded images
3. Verify the `public/images/` directory has the files
4. Check file sizes - 0-byte files indicate failed downloads
