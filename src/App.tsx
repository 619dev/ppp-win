import { useEffect, useState } from 'react'
import { hydrateEncryptedMessageCache, useStore } from './store'
import { ensureIdentityKeys } from './crypto/identity'
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
  const [secureHydrationError, setSecureHydrationError] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Restore OS-protected keys and authenticated cache before mounting chats.
  useEffect(() => {
    let cancelled = false
    if (!token || !user?.id) {
      setHydratedAccount(null)
      setSecureHydrationError(null)
      return
    }
    setSecureHydrationError(null)
    Promise.all([
      ensureIdentityKeys(user.id),
      hydrateSenderKeys(user.id),
      hydrateEncryptedMessageCache(user.id),
    ]).then(([keys]) => {
      if (!keys) throw new Error('Identity keys are unavailable')
      if (!cancelled) setHydratedAccount(user.id)
    }).catch(err => {
      console.error('[App] Secure state hydration failed:', err)
      if (!cancelled) {
        setHydratedAccount(null)
        setSecureHydrationError(err instanceof Error ? err.message : String(err))
      }
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
  if (hydratedAccount === user?.id) return <DesktopLayout />
  if (secureHydrationError) {
    return <div className="empty-state">
      <div>安全密钥加载失败，请关闭并重新打开应用。</div>
      {import.meta.env.DEV && <div style={{ marginTop: 12, padding: '0 20px', fontSize: 12, wordBreak: 'break-word' }}>{secureHydrationError}</div>}
    </div>
  }
  return null
}
