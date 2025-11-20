import type { VercelRequest, VercelResponse } from '@vercel/node';

interface SaveToLibraryRequest {
  title: string;
  originalFrequency: number;
  targetFrequency: number;
  uploaderName?: string;
  audioData: string; // base64 encoded audio file
}

interface LibraryIndex {
  songs: Array<{
    id: string;
    title: string;
    originalFrequency: number;
    targetFrequency: number;
    uploadDate: string;
    uploaderName?: string;
    fileName: string;
    playCount: number;
    likes: number;
  }>;
  lastUpdated: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
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
    const { title, originalFrequency, targetFrequency, uploaderName, audioData }: SaveToLibraryRequest = req.body;

    if (!title || !originalFrequency || !targetFrequency || !audioData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().split('T')[0];
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const fileName = `${timestamp}_${sanitizedTitle}_${targetFrequency}hz.wav`;
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // GitHub API base URL
    const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

    // Step 1: Fetch current index.json
    let currentIndex: LibraryIndex = { songs: [], lastUpdated: new Date().toISOString() };
    try {
      const indexResponse = await fetch(`${apiBase}/library/index.json`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        const content = Buffer.from(indexData.content, 'base64').toString('utf-8');
        currentIndex = JSON.parse(content);
        currentIndex.sha = indexData.sha; // Store SHA for updating
      }
    } catch (error) {
      console.log('Index file does not exist yet, creating new one');
    }

    // Step 2: Upload audio file to GitHub
    const audioPath = `library/${fileName}`;
    const audioUploadResponse = await fetch(`${apiBase}/${audioPath}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add ${title} (${targetFrequency} Hz)`,
        content: audioData.split(',')[1] || audioData, // Remove data:audio/wav;base64, prefix if present
      }),
    });

    if (!audioUploadResponse.ok) {
      const error = await audioUploadResponse.json();
      throw new Error(`Failed to upload audio file: ${error.message}`);
    }

    // Step 3: Update index.json
    const newSong = {
      id,
      title,
      originalFrequency,
      targetFrequency,
      uploadDate: new Date().toISOString(),
      uploaderName: uploaderName || 'Anonymous',
      fileName,
      playCount: 0,
      likes: 0,
    };

    currentIndex.songs.unshift(newSong); // Add to beginning
    currentIndex.lastUpdated = new Date().toISOString();

    const indexContent = Buffer.from(JSON.stringify(currentIndex, null, 2)).toString('base64');
    const indexUpdatePayload: any = {
      message: `Update library index - add ${title}`,
      content: indexContent,
    };

    // Include SHA if updating existing file
    if ((currentIndex as any).sha) {
      indexUpdatePayload.sha = (currentIndex as any).sha;
    }

    const indexUpdateResponse = await fetch(`${apiBase}/library/index.json`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indexUpdatePayload),
    });

    if (!indexUpdateResponse.ok) {
      const error = await indexUpdateResponse.json();
      throw new Error(`Failed to update index: ${error.message}`);
    }

    return res.status(200).json({
      success: true,
      song: newSong,
      message: 'Song added to library successfully!',
    });
  } catch (error: any) {
    console.error('Error saving to library:', error);
    return res.status(500).json({
      error: 'Failed to save to library',
      message: error.message || 'Unknown error',
    });
  }
}
