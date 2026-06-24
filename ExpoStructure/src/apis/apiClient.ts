// API Client — base Axios/Fetch instance with interceptors
// Add your base URL, headers, and auth token injection here.

const BASE_URL = 'https://api.example.com/v1';

export const apiClient = {
  baseURL: BASE_URL,

  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(response.statusText);
    return response.json() as Promise<T>;
  },

  post: async <T>(endpoint: string, body: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json() as Promise<T>;
  },
};
