import { contextBridge, ipcRenderer } from 'electron'

interface ProxyConfig {
  id: string
  name: string
  type: 'socks5' | 'http' | 'https'
  host: string
  port: string
  username: string
  password: string
}

contextBridge.exposeInMainWorld('electronAPI', {
  // Platform info
  isElectron: true,
  platform: process.platform as 'win32',

  // Proxy management
  getProxy: () => ipcRenderer.invoke('electron-get-proxy'),
  setProxyList: (list: ProxyConfig[]) => ipcRenderer.invoke('electron-set-proxy-list', list),
  setActiveProxy: (id: string | null) => ipcRenderer.invoke('electron-set-active-proxy', id),
  applyProxy: (config: ProxyConfig) => ipcRenderer.invoke('electron-apply-proxy', config),
  clearProxy: () => ipcRenderer.invoke('electron-clear-proxy'),
  getProxyInfo: () => ipcRenderer.invoke('electron-get-proxy-info'),
})
