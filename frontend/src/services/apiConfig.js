import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          alert('Session expired. Please log in again.');
          window.location.href = '/';
          break;
        case 403:
          alert('Forbidden: You do not have permission to access this resource.');
          break;
        case 500:
        case 503:
          alert('Server error: Please try again later.');
          break;
        default:
          alert(`Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else {
      alert('Network error or request timeout. Please check your internet connection.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
