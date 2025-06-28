// Utility function to handle image paths across the application
export const getImagePath = (imagePath) => {
  if (!imagePath) return ''; // Handle null/undefined paths
  
  // Get base URL from Vite's environment variables
  const base = import.meta.env.MODE === 'development' ? '' : '/SIAProject';
  
  // If the path already starts with http/https, it's an external URL
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, prepend the base path
  return `${base}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};