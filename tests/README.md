# Windows 2.6.8 verification

```sh
npx tsc --noEmit
npm run test:security
npm run test:attachments
npm run test:media-cache
npm run test:i18n
npm run build:win
```

The suites use real cryptography with mocked transport and secret storage. They cover signed message tampering, mutual verification, identity replacement, group epochs and membership, offline catch-up, cache-before-cursor ordering, attachment authorization and localization for 92 security, 15 account deletion and 11 password recovery keys in eight languages. They do not exercise the native Electron secure-storage bridge or replace two-client acceptance.

Use a server with the friendship fixes and compatible clients. Verify add/remove actions on contact profiles, contact refresh after reconnect, and group messaging between members who have yet to verify each other privately. Verify both directions of the password handshake, profile focus refresh, changed-key rejection, group leave/kick and offline recovery manually. Trust records use the existing Windows secure-storage bridge. A green identity badge requires the mutual password handshake. Cached signature flags are never trusted. Legacy unsigned private history is refused after pinning. Group signatures use server-published member keys.

The signed path uses X25519 and Ed25519. Real ML-KEM registration is not implemented. Signatures do not encrypt uploaded attachment bytes; previously lost group keys cannot be recovered by upgrading.

## Windows 2.6.8 acceptance

- Install or run the portable executable and confirm `PaperPhonePlus v2.6.8` at the bottom of Profile. Verify the executables against `SHA256SUMS.txt`.
- Verify the green profile check after mutual verification, the group message signature check, the lock for pending decryption and the warning for failed verification.
- Check emoji categories, insertion, recents and stickers. Exercise call controls, QR scanning, language settings, proxy add/delete and the Discover sidebar.
- With a compatible 2.6.7 server, open avatars, Moments, Timeline media and chat attachments. Reopen the app offline and verify cached items. Switch accounts and verify cache isolation. Clear the offline cache from Profile and check that the media is fetched again on reconnect.
- Scroll Timeline, open a post and return to the same position. Upload several images and a video. Verify the filename and progress, disabled selection and publish controls, and recovery from a failed upload.
- Use disposable accounts to verify the default one-year inactivity period and each selectable period. Check that the server removes an expired test account and ends its session. Verify erroneous and valid passwords in the immediate deletion dialog.
- Enable two-factor authentication on a disposable account. Reset the password with a valid six-digit authenticator code, check invalid and expired codes, and verify that the new password works and previous sessions are revoked.
