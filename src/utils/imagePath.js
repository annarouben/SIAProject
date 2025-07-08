// Utility function to handle image paths across the application
export const getImagePath = (path) => {
  // If path is missing or null, use the user.svg file instead
  if (!path) {
    return '/assets/img/persona/user.svg';
  }
  
  // Check if already an absolute URL (starts with http or https)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Check if path is explicitly set to default.png, use user.svg instead
  if (path.includes('default.png')) {
    return '/assets/img/persona/user.svg';
  }
  
  // Make sure path starts with a forward slash for consistent resolution
  return path.startsWith('/') ? path : `/${path}`;
};