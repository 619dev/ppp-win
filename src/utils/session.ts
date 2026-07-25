import { useStore } from '../store'

export function endSession(reason = 'session_revoked') {
  console.info(`[Session] Explicit logout signal received: ${reason}`)
  useStore.getState().logout()
}

export function isExplicitLogoutSignal(data: unknown, headers?: Headers): boolean {
  const headerAction = headers?.get('x-session-action')?.toLowerCase()
  if (headerAction === 'logout' || headerAction === 'revoke' || headerAction === 'revoked') return true
  if (!data || typeof data !== 'object') return false
  const value = data as Record<string, unknown>
  const signal = String(value.code ?? value.type ?? value.action ?? '').toLowerCase()
  return value.logout === true || [
    'logout', 'force_logout', 'session_revoked', 'session_terminated',
    'account_disabled', 'account_deleted',
  ].includes(signal)
}
