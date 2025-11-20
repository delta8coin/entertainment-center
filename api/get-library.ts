import type { VercelRequest, VercelResponse } from '@vercel/node';

interface LibrarySong {
  id: string;
  title: string;
  originalFrequency: number;
  targetFrequency: number;
  uploadDate: string;
  uploaderName?: string;
  fileName: string;
  fileUrl: string;
  playCount: number;
  likes: number;
}

interface LibraryIndex {
  songs: Array<Omit<LibrarySong, 'fileUrl'>>;
  lastUpdated: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_LIBRARY_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_LIBRARY_REPO; // Format: "username/repo-name"

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).json({
      error: 'GitHub configuration missing',
      message: 'Please set GITHUB_LIBRARY_TOKEN and GITHUB_LIBRARY_REPO environment variables',
    });
  }

  try {
    // GitHub API base URL
    const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

    // Fetch index.json
    const indexResponse = await fetch(`${apiBase}/library/index.json`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!indexResponse.ok) {
      if (indexResponse.status === 404) {
        // Index doesn't exist yet - return empty library
        return res.status(200).json({
          songs: [],
          lastUpdated: new Date().toISOString(),
        });
      }
      throw new Error('Failed to fetch library index');
    }

    const indexData = await indexResponse.json();
    const content = Buffer.from(indexData.content, 'base64').toString('utf-8');
    const libraryIndex: LibraryIndex = JSON.parse(content);

    // Add file URLs for each song (GitHub raw URLs)
    const songsWithUrls: LibrarySong[] = libraryIndex.songs.map((song) => ({
      ...song,
      fileUrl: `https://raw.githubusercontent.com/${GITHUB_REPO}/main/library/${song.fileName}`,
    }));

    return res.status(200).json({
      songs: songsWithUrls,
      lastUpdated: libraryIndex.lastUpdated,
    });
  } catch (error: any) {
    console.error('Error fetching library:', error);
    return res.status(500).json({
      error: 'Failed to fetch library',
      message: error.message || 'Unknown error',
    });
  }
}
