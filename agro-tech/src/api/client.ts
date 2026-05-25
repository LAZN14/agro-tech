import { assetPath } from '../utils/assetPath'

const API_BASE = assetPath('/api')

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new ApiError(`API error: ${res.statusText}`, res.status)
  }

  return res.json() as Promise<T>
}
