import type { ProxyConfig } from './store'

export interface ElectronAPI {
  // Platform info
  isElectron: boolean
  platform: 'win32'

  // Proxy management
  getProxy: () => Promise<{ proxyList: ProxyConfig[]; activeProxyId: string | null }>
  setProxyList: (list: ProxyConfig[]) => Promise<void>
  setActiveProxy: (id: string | null) => Promise<void>
  applyProxy: (config: ProxyConfig) => Promise<void>
  clearProxy: () => Promise<void>
  getProxyInfo: () => Promise<string>
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
