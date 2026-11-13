# Windows 2.6.5 verification

```sh
npx tsc --noEmit
npm run test:security
npm run test:attachments
npm run test:i18n
npm run build
```

The suites use real cryptography with mocked transport and secret storage. They cover signed message tampering, mutual verification, identity replacement, group epochs and membership, offline catch-up, cache-before-cursor ordering, attachment authorization and 92 security keys in eight languages. They do not exercise the native Electron secure-storage bridge or replace two-client acceptance.

Use a server with the friendship fixes and compatible clients. Verify add/remove actions on contact profiles, contact refresh after reconnect, and group messaging between members who have yet to verify each other privately. Verify both directions of the password handshake, profile focus refresh, changed-key rejection, group leave/kick and offline recovery manually. Trust records use the existing Windows secure-storage bridge. A green identity badge requires the mutual password handshake. Cached signature flags are never trusted. Legacy unsigned private history is refused after pinning. Group signatures use server-published member keys.

The signed path uses X25519 and Ed25519. Real ML-KEM registration is not implemented. Signatures do not encrypt uploaded attachment bytes; previously lost group keys cannot be recovered by upgrading.

应用版本、package-lock 根包版本与个人信息页底部均为 **2.6.5**。Windows 原生安全存储、双客户端互通和安装包运行仍需在 Windows 上验收。

本次已通过上述全部自动化检查和生产构建。已通过 `npm run build:win` 交叉编译生成 2.6.5 Windows x64 安装版和便携版，并检查打包后的版本、主进程／预加载入口及渲染资源。发布文件附带 `SHA256SUMS.txt`；Windows 原生运行和双客户端互通仍待验收。
