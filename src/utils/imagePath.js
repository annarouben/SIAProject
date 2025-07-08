// Utility function to handle image paths across the application

// Check if we're running in a GitHub Pages environment
const isGitHubPages = () => {
  return window.location.hostname === 'annarouben.github.io' || 
         window.location.hostname.endsWith('.github.io');
};

// Repository name for GitHub Pages
const REPO_NAME = '/SIAReact';

export const getImagePath = (path) => {
  // Handle null/undefined
  if (!path) {
    return isGitHubPages() 
      ? `${REPO_NAME}/assets/img/persona/user.svg` 
      : '/assets/img/persona/user.svg';
  }
  
  // Check if already an absolute URL (starts with http or https)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Check if path is explicitly set to default.png, use user.svg instead
  if (path.includes('default.png')) {
    return isGitHubPages() 
      ? `${REPO_NAME}/assets/img/persona/user.svg` 
      : '/assets/img/persona/user.svg';
  }
  
  // If not running on GitHub Pages, use the path as-is (with leading slash)
  if (!isGitHubPages()) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // GITHUB PAGES ENVIRONMENT - Fix path handling
  
  // Make sure we don't add the repo name twice
  if (path.startsWith(REPO_NAME)) {
    return path;
  }
  
  // Make sure path has proper structure with repo name
  return path.startsWith('/') 
    ? `${REPO_NAME}${path}` 
    : `${REPO_NAME}/${path}`;
};