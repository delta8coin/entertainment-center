# Resonix Library Setup Instructions

This guide will help you set up the GitHub-based storage system for the Resonix Library feature.

## Overview

The Resonix Library allows users to share their 432 Hz conversions with the community. When a user converts a song and checks "Share this healing version with the community," the converted audio file is automatically uploaded to a GitHub repository and displayed in the public Library page.

## Prerequisites

- A GitHub account
- A GitHub repository (public or private) to store the library files
- Vercel account (for deployment and environment variables)

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Choose a name for your library repository (e.g., `resonix-library`)
4. You can make it either:
   - **Public**: Anyone can see the files (recommended for community libraries)
   - **Private**: Only you can see the files (if you want to keep it restricted)
5. Click "Create repository"

## Step 2: Create a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Resonix Library Access")
4. Set expiration (choose "No expiration" for permanent access, or set a custom date)
5. Select the following scopes:
   - ✅ `repo` (Full control of private repositories)
     - This gives access to read and write to repository contents
6. Click "Generate token"
7. **IMPORTANT**: Copy the token immediately and save it securely. You won't be able to see it again!

## Step 3: Configure Environment Variables in Vercel

If you're deploying to Vercel:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following two environment variables:

### Variable 1: GITHUB_LIBRARY_TOKEN
- **Name**: `GITHUB_LIBRARY_TOKEN`
- **Value**: Your GitHub personal access token (from Step 2)
- **Environments**: Production, Preview, Development (select all)

### Variable 2: GITHUB_LIBRARY_REPO
- **Name**: `GITHUB_LIBRARY_REPO`
- **Value**: Your repository in the format `username/repo-name`
  - Example: `delta8coin/resonix-library`
  - Replace `delta8coin` with your GitHub username
  - Replace `resonix-library` with your repository name
- **Environments**: Production, Preview, Development (select all)

4. Click "Save" for each variable

## Step 4: Redeploy Your Application

After adding the environment variables:

1. Go to the "Deployments" tab in Vercel
2. Click the three dots (•••) on your latest deployment
3. Click "Redeploy"
4. Or simply push a new commit to trigger a deployment

## Step 5: Initialize the Library (Optional)

The first time someone shares a song, the API will automatically create:
- A `library/` folder in your GitHub repository
- An `index.json` file that tracks all uploaded songs
- The first audio file

You don't need to create these manually - they'll be created automatically!

## Local Development Setup

If you're testing locally:

1. Create a `.env.local` file in your project root:
```bash
GITHUB_LIBRARY_TOKEN=your_github_token_here
GITHUB_LIBRARY_REPO=username/repo-name
```

2. Make sure `.env.local` is in your `.gitignore` file (it should be by default)

3. Restart your development server

## File Structure in GitHub

Once songs are uploaded, your GitHub repository will look like this:

```
resonix-library/
└── library/
    ├── index.json
    ├── 2025-11-20_song-name_432hz.wav
    ├── 2025-11-20_another-song_432hz.wav
    └── ...
```

### index.json format:
```json
{
  "songs": [
    {
      "id": "1732108800000-abc123",
      "title": "Amazing Song",
      "originalFrequency": 440,
      "targetFrequency": 432,
      "uploadDate": "2025-11-20T12:00:00.000Z",
      "uploaderName": "Anonymous",
      "fileName": "2025-11-20_amazing-song_432hz.wav",
      "playCount": 0,
      "likes": 0
    }
  ],
  "lastUpdated": "2025-11-20T12:00:00.000Z"
}
```

## Accessing Library Files

Uploaded files are accessible via GitHub raw URLs:
```
https://raw.githubusercontent.com/username/repo-name/main/library/filename.wav
```

These URLs are used by the Library page to stream and download files.

## Troubleshooting

### "GitHub configuration missing" error
- Make sure both `GITHUB_LIBRARY_TOKEN` and `GITHUB_LIBRARY_REPO` are set in Vercel
- Redeploy after adding the variables
- Check that variable names are spelled correctly (case-sensitive)

### "Failed to upload audio file" error
- Verify your GitHub token has the `repo` scope enabled
- Check that the repository name is in the correct format: `username/repo-name`
- Ensure the token hasn't expired

### Library page shows "No songs yet"
- Check the browser console for any API errors
- Verify the repository exists and the token has access to it
- Make sure the API routes are deployed correctly

### Files not appearing in GitHub
- Check the API logs in Vercel for any errors
- Verify the GitHub token has write permissions
- Ensure the repository isn't archived or read-only

## Security Notes

🔒 **Keep your GitHub token secure:**
- Never commit your token to Git
- Never share your token publicly
- Use Vercel environment variables to store it securely
- Consider using a token with minimal necessary permissions
- Set an expiration date for added security

## Advanced: Custom Repository Setup

You can customize the repository structure by modifying the API routes:

- Change the `library/` folder path in `/api/save-to-library.ts`
- Modify the `index.json` structure to add more metadata
- Add webhook notifications when new songs are uploaded
- Implement GitHub Actions to process uploaded files (e.g., generate waveforms)

## Support

If you encounter any issues:
1. Check the Vercel deployment logs for errors
2. Verify environment variables are set correctly
3. Test the GitHub API access using a tool like Postman
4. Review the browser console for client-side errors

---

**Congratulations!** Your Resonix Library is now set up and ready to accept community healing frequency conversions! 🎵✨
