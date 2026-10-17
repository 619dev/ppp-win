// Identity trust records use the Windows secure-storage bridge, like identity keys.
export { getSecureSecret as getBrowserSecret, setSecureSecret as setBrowserSecret, deleteSecureSecret as deleteBrowserSecret } from '../api/secure-storage'
