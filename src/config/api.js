/**
 * API Configuration
 * Uses environment variable for API base URL
 * 
 * In development: Uses relative path, Vite proxy forwards /api to localhost:8086
 * In preview/production: Uses VITE_API_BASE_URL env variable or defaults to API Gateway
 * 
 * Usage:
 *   import { API_BASE_URL } from '../config/api';
 *   const response = await fetch(`${API_BASE_URL}/endpoint`);
 */

// Determine API base URL based on environment
let API_BASE_URL;

if (import.meta.env.VITE_API_BASE_URL) {
  // Use explicit env variable if set (for Cloudflare Tunnel or custom backend URL)
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (import.meta.env.DEV) {
  // Development mode: use relative path (Vite proxy will forward to localhost:8086)
  API_BASE_URL = '/api/v1';
} else {
  // Production/preview mode: 
  // - If using Express server (npm run serve): relative path works (proxy handles it)
  // - If using Vite preview (npm run preview): use full URL to API Gateway
  // Check if we're on the same origin as the API Gateway
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  if (isLocalhost) {
    // Use full URL to API Gateway when running locally (works with both Express and Vite preview)
    API_BASE_URL = 'http://localhost:8086/api/v1';
  } else {
    // Production/Cloudflare Tunnel: use relative path (Express proxy will handle it)
    API_BASE_URL = '/api/v1';
  }
}

// Log API base URL for debugging
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Mode:', import.meta.env.DEV ? 'DEV' : 'PREVIEW/PROD');
console.log('VITE_API_BASE_URL env:', import.meta.env.VITE_API_BASE_URL || 'not set');

export { API_BASE_URL };

// Helper function to build full API endpoint URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

