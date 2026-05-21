import { useEffect } from 'react'
import { useStore } from './store'
import { loadFromIndexedDB } from './crypto/keystore'
import { applyNativeProxy } from './api/proxy-bridge'
import Login from './pages/Login'
import DesktopLayout from './components/DesktopLayout'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'

export default function App() {
  const token = useStore(s => s.token)
  const theme = useStore(s => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Hydrate crypto keys from IndexedDB
  useEffect(() => {
    loadFromIndexedDB().catch(() => {})
  }, [])

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
  return <DesktopLayout />
}
