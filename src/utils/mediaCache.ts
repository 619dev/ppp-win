import { normalizeFileUrl } from '../api/http'
import { transactMediaCache } from './mediaCacheDb'

export const MEDIA_CACHE_NAME = 'paperphone-media-v3'
const pending = new Map<string, Promise<Blob>>()
const refreshed = new Set<string>()
let cacheGeneration = 0
window.addEventListener?.('online', () => refreshed.clear())

export async function clearMediaCache(): Promise<void> {
  cacheGeneration++
  refreshed.clear()
  pending.clear()
  if (window.location.protocol === 'file:') {
    await transactMediaCache('readwrite', store => store.clear())
  }
}

function accountId(): string {
  try { return JSON.parse(localStorage.getItem('user') || 'null')?.id || 'anonymous' }
  catch { return 'anonymous' }
}

/** Cache original bytes, including encrypted attachments, never decrypted chat data. */
export async function cachedMediaBlob(raw: string, download?: () => Promise<Blob>): Promise<Blob> {
  const url = new URL(normalizeFileUrl(raw), window.location.href || window.location.origin)
  url.hash = ''
  const account = accountId()
  const key = new Request(`${url.href}${url.search ? '&' : '?'}__pp_account=${encodeURIComponent(account)}`)
  const id = key.url
  const existing = pending.get(id)
  if (existing) return existing
  const generation = cacheGeneration
  const useIndexedDb = window.location.protocol === 'file:'
  const task = (async () => {
    let cache: Cache | undefined
    let cached: Blob | undefined
    try {
      if (useIndexedDb) {
        cached = await transactMediaCache('readonly', store => store.get(id))
      } else {
        cache = await caches.open(MEDIA_CACHE_NAME)
        cached = await (await cache.match(key))?.blob()
      }
    } catch { /* Storage unavailable. */ }
    const fetchBlob = async () => {
      if (download) return download()
      const base = new URL(localStorage.getItem('serverUrl') || import.meta.env.VITE_API_URL || window.location.origin, window.location.href || window.location.origin)
      const token = localStorage.getItem('token')
      const response = await fetch(url.href, {
        headers: url.origin === base.origin && url.pathname.startsWith('/api/files/') && token
          ? { Authorization: `Bearer ${token}` } : undefined,
      })
      if (!response.ok) throw new Error(`Media download failed: ${response.status}`)
      return response.blob()
    }
    const update = async () => {
      if (accountId() !== account) throw new Error('Media account changed')
      const blob = await fetchBlob()
      if (accountId() !== account) throw new Error('Media account changed')
      if (generation !== cacheGeneration) return blob
      try {
        if (useIndexedDb) {
          await transactMediaCache('readwrite', store => {
            return generation === cacheGeneration ? store.put(blob, id) : undefined
          })
        } else {
          await cache?.put(key, new Response(blob))
        }
      } catch { /* Quota failure must not prevent display. */ }
      if (generation === cacheGeneration && accountId() === account) {
        refreshed.add(id)
        window.dispatchEvent?.(new CustomEvent('pp-media-updated', { detail: { url: url.href, blob } }))
      }
      return blob
    }
    if (cached) {
      // Revalidate once per session/reconnect. Navigation itself never downloads again.
      if (!refreshed.has(id)) {
        refreshed.add(id)
        void update().catch(() => refreshed.delete(id))
      }
      return cached
    }
    return update()
  })()
  pending.set(id, task)
  try { return await task } finally { if (pending.get(id) === task) pending.delete(id) }
}
