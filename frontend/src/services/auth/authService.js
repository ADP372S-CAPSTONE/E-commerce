import { api, json } from '../api/apiClient.js'

export const authService = {
  login: (credentials) => api('/auth/login', json('POST', credentials)),
  register: (details) => api('/users/register', json('POST', details)),
  profile: () => api('/users/me'),
  updateProfile: (details) => api('/users/me', json('PUT', details)),
  deactivate: () => api('/users/me/deactivate', { method: 'PATCH' }),
}