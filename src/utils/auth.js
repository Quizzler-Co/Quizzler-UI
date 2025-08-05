/**
 * Authentication utilities
 * Helper functions for managing authentication state and tokens
 */

import UserService from "../services/UserService";

/**
 * Check if user is currently authenticated
 * @returns {boolean} - True if user has valid token
 */
export const isAuthenticated = () => {
  return UserService.isAuthenticated();
};

/**
 * Get the current auth token with bearer prefix
 * @returns {string|null} - Authorization header value or null
 */
export const getAuthHeader = () => {
  return UserService.getAuthToken();
};

/**
 * Logout user and clear all auth data
 */
export const logout = () => {
  UserService.logout();
  // Optional: redirect to home page or refresh
  // window.location.href = '/';
};

/**
 * Create authenticated fetch function that automatically includes auth headers
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} - Fetch response
 */
export const authenticatedFetch = async (url, options = {}) => {
  const authToken = getAuthHeader();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (authToken) {
    headers.Authorization = authToken;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

/**
 * Check if the current token is expired (basic check)
 * Note: This is a simple implementation. In production, you might want to
 * decode the JWT and check the expiration time properly.
 * @returns {boolean} - True if token appears to be expired
 */
export const isTokenExpired = () => {
  const token = UserService.getAuthToken();
  if (!token) return true;

  // For JWT tokens, you could decode and check the exp claim
  // For now, we'll just return false since we can't easily decode without a library
  return false;
};

/**
 * Redirect to login if not authenticated
 * @param {string} redirectPath - Optional path to redirect to after login
 */
export const requireAuth = (redirectPath) => {
  if (!isAuthenticated()) {
    // You can implement your own redirect logic here
    console.log("Authentication required");
    if (redirectPath) {
      sessionStorage.setItem("redirectAfterLogin", redirectPath);
    }
    return false;
  }
  return true;
};
