const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api'
const TOKEN_KEY = 'incredibletech.auth'

export class ApiError extends Error {
  constructor(message, status, fields = {}) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

export async function api(path, options = {}) {
  const session = JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null')
  const headers = { Accept: 'application/json', ...options.headers }
  if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json'
  if (session?.token) headers.Authorization = `Bearer ${session.token}`
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (response.status === 204) return null
  const type = response.headers.get('content-type') || ''
  const data = type.includes('json') ? await response.json() : await response.text()
  if (!response.ok) {
    if (response.status === 401) window.dispatchEvent(new Event('auth:expired'))
    const fields = data && typeof data === 'object' && !('message' in data) ? data : {}
    const message = data?.message || (typeof data === 'string' && data) || Object.values(fields)[0] || `Request failed (${response.status})`
    throw new ApiError(message, response.status, fields)
  }
  return data
}

export const json = (method, body) => ({ method, body: JSON.stringify(body) })
export { TOKEN_KEY }