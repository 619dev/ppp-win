import { useEffect, useState } from 'react'
import { hydrateEncryptedMessageCache, useStore } from './store'
import { loadFromIndexedDB } from './crypto/keystore'
import { hydrateSenderKeys } from './crypto/groupCrypto'
import { applyNativeProxy } from './api/proxy-bridge'
import Login from './pages/Login'
import DesktopLayout from './components/DesktopLayout'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'

export default function App() {
  const token = useStore(s => s.token)
  const user = useStore(s => s.user)
  const theme = useStore(s => s.theme)
  const [hydratedAccount, setHydratedAccount] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Restore OS-protected keys and authenticated cache before mounting chats.
  useEffect(() => {
    let cancelled = false
    if (!token || !user?.id) {
      setHydratedAccount(null)
      return
    }
    Promise.all([
      loadFromIndexedDB(user.id),
      hydrateSenderKeys(user.id),
      hydrateEncryptedMessageCache(user.id),
    ]).finally(() => {
      if (!cancelled) setHydratedAccount(user.id)
    })
    return () => { cancelled = true }
  }, [token, user?.id])

  // Apply persisted proxy settings on app startup
  useEffect(() => {
    const { proxyList, activeProxyId } = useStore.getState()
    if (activeProxyId) {
      const activeProxy = proxyList.find(p => p.id === activeProxyId)
      if (activeProxy && activeProxy.host && activeProxy.port) {
        applyNativeProxy(activeProxy)
      }
    }
  }, [])

  // Skip service worker registration in Electron desktop
  useEffect(() => {
    if (!window.electronAPI?.isElectron) {
      // Web-only: register service worker
      import('./api/push').then(({ registerServiceWorker }) => {
        registerServiceWorker().catch(() => {})
      })
    }
  }, [])

  // No auth → Login page
  if (!token) {
    return <Login />
  }

  // Authenticated → Desktop layout
  return hydratedAccount === user?.id ? <DesktopLayout /> : null
}
