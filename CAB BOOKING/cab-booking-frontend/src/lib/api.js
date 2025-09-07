import { getToken } from './auth'

const BASE = import.meta.env.VITE_API_BASE || '' // use proxy in dev when empty

export async function api(path, { method = 'GET', body, auth = false, headers = {} } = {}) {
  const token = auth ? getToken() : null
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.error || data?.message || 'Request failed'
    throw new Error(message)
  }
  return data
}
