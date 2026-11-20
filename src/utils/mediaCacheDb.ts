// Cache Storage requires an HTTP(S) origin. Packaged Electron uses file://.
export async function transactMediaCache<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T> | undefined,
): Promise<T | undefined> {
  const database = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('PaperPhoneMediaCache', 1)
    request.onupgradeneeded = () => request.result.createObjectStore('media')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  try {
    return await new Promise<T | undefined>((resolve, reject) => {
      const transaction = database.transaction('media', mode)
      const request = operation(transaction.objectStore('media'))
      transaction.oncomplete = () => resolve(request?.result)
      transaction.onabort = () => reject(transaction.error)
    })
  } finally {
    database.close()
  }
}
