import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create axios instance with default config
const contentApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch page content from backend
 * @param {string} pageId - The page ID (e.g., 'home', 'about', 'services', 'contact', 'footer')
 * @returns {Promise} Page content data or null if not found
 */
export const getPageContent = async (pageId) => {
  try {
    const response = await contentApi.get(`/api/pages/public/${pageId}`);
    if (response.data.success && response.data.data.page) {
      return response.data.data.page;
    }
    return null;
  } catch (error) {
    // If API fails, return null to use default content
    console.warn(`Failed to fetch page content for ${pageId}:`, error.message);
    return null;
  }
};

/**
 * Convert sections array to flat object format (for easy use in components)
 * @param {Object} pageData - The page data from API with sections array
 * @returns {Object} Flat object with section keys (e.g., { hero1: {...}, services: [...] })
 */
export const convertSectionsToFlat = (pageData) => {
  if (!pageData || !pageData.sections || !Array.isArray(pageData.sections)) {
    return {};
  }
  
  const flatData = {};
  pageData.sections.forEach(section => {
    flatData[section.sectionId] = section.content || {};
  });
  
  return flatData;
};

/**
 * Get a specific field value from page content (works with flat format)
 * @param {Object} pageData - The page data object (flat format)
 * @param {string} sectionKey - The section key (e.g., 'hero1', 'services')
 * @param {string} field - The field name (e.g., 'title', 'description', 'image')
 * @param {string} defaultValue - Default value if not found
 * @returns {string} The field value or default
 */
export const getContentValue = (pageData, sectionKey, field, defaultValue = '') => {
  if (!pageData) {
    return defaultValue;
  }
  
  // If pageData has sections array, convert it first
  if (pageData.sections && Array.isArray(pageData.sections)) {
    pageData = convertSectionsToFlat(pageData);
  }
  
  const section = pageData[sectionKey];
  if (!section) {
    return defaultValue;
  }
  
  return section[field] || defaultValue;
};

/**
 * Helper to get image URL - handles both absolute URLs and relative paths
 * @param {string} imagePath - Image path from API or default
 * @param {string} defaultPath - Default local image path
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath, defaultPath = '') => {
  // If imagePath is provided and it's an absolute URL, use it
  if (imagePath) {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // If it's a relative path from uploads, construct full URL
    if (imagePath.startsWith('/uploads/')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    // If it's already a relative path to assets, use it as is (Vite will handle it)
    return imagePath;
  }
  
  // Return default path if no imagePath provided
  return defaultPath;
};

export default contentApi;

