// Utility function to handle image paths across the application
export const getImagePath = (path) => {
  // Return the user.svg path if no path is provided
  if (!path) {
    return '/assets/img/persona/user.svg';
  }
  
  // If path is explicitly set to default.png, use user.svg instead
  if (path.includes('default.png')) {
    return '/assets/img/persona/user.svg';
  }
  
  // Handle regular paths
  if (path.startsWith('/') || path.startsWith('http')) {
    return path;
  }
  
  return `/${path}`;
};