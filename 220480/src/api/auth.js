import axiosInstance from './axiosInstance';

/**
 * Registers the company with the test server.
 * @param {Object} companyDetails - Registration details.
 * @returns {Promise<Object>} - The registration response.
 */
export const registerCompany = async (companyDetails) => {
  try {
    const response = await axiosInstance.post('/register', companyDetails);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data || 'Registration failed. Please check your details and try again.'
    );
  }
};

/**
 * Obtains an authorization token using the provided credentials.
 * @param {Object} authDetails - Authentication details.
 * @returns {Promise<Object>} - The authentication response.
 */
export const getAuthToken = async (authDetails) => {
  try {
    const response = await axiosInstance.post('/auth', authDetails);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data || 'Authentication failed. Please verify your credentials.'
    );
  }
};
