// Utility function to handle image paths across the application

// Check if we're running in a GitHub Pages environment
const isGitHubPages = () => {
  return window.location.hostname === 'annarouben.github.io' || 
         window.location.hostname.endsWith('.github.io');
};

// Repository name for GitHub Pages
const REPO_NAME = '/SIAReact';

export const getImagePath = (path) => {
  console.log('Original path:', path);
  
  // Handle null/undefined
  if (!path) {
    console.log('Returning default for empty path');
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
    const result = path.startsWith('/') ? path : `/${path}`;
    console.log('Transformed path (local):', result);
    return result;
  }
  
  // Add repository name for GitHub Pages and ensure consistent path format
  let result = '';
  if (path.startsWith(REPO_NAME + '/')) {
    // Path already includes the repo name, use as is
    result = path;
  } else {
    // Add repo name prefix to path
    result = path.startsWith('/') 
      ? `${REPO_NAME}${path}` 
      : `${REPO_NAME}/${path}`;
  }
  
  console.log('Transformed path (GitHub Pages):', result);
  return result;
};