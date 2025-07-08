// Simplified utility function to handle image paths across environments

// Check if we're running in a GitHub Pages environment
const isGitHubPages = () => {
  return window.location.hostname === 'annarouben.github.io' || 
         window.location.hostname.endsWith('.github.io');
};

// Repository name for GitHub Pages
const REPO_NAME = '/SIAProject';

export const getImagePath = (path) => {
  // Handle null/undefined paths
  if (!path) {
    return isGitHubPages() 
      ? `${REPO_NAME}/assets/img/persona/user.svg` 
      : '/assets/img/persona/user.svg';
  }
  
  // Handle absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Add leading slash if needed (for both environments)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // For GitHub Pages, add the repository name prefix
  if (isGitHubPages()) {
    // Don't add repo name if it's already there
    if (normalizedPath.startsWith(REPO_NAME)) {
      return normalizedPath;
    }
    return `${REPO_NAME}${normalizedPath}`;
  }
  
  // For local development, just return the normalized path
  return normalizedPath;
};