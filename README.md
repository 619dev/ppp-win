<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 Windows 桌面客户端</strong></p>
  <p><strong>End-to-End Encrypted Messaging Windows Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.6.5-22c55e?style=flat-square" alt="Version 2.6.5" />
    <img src="https://img.shields.io/badge/Electron-36-47848F?style=flat-square&logo=electron" alt="Electron" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License" />
  </p>
</div>

---

[📖 中文文档](README_CN.md) | [📖 English Documentation](README_EN.md)

---

## 更新日志

完整版本更新记录已迁移至 [changelog.md](changelog.md)。

### 2.6.5

- 同步 Mac 2.6.5 好友关系修复。可在个人资料页添加或删除好友，关系变更及重连后刷新好友列表。群聊使用服务端公布的成员公钥验证签名，以 Sender Key 加密，并在成员变更后轮换密钥。额外文本加密用于私聊。
- 身份信任记录使用 Windows 安全存储；同步缓存持久化、附件鉴权刷新、头像地址规范化与八语言安全提示。
- 服务端需包含好友关系修复，群聊参与者需使用兼容新版群聊模式的客户端。验证命令及原生双客户端验收项目见 [tests/README.md](tests/README.md)。

- Syncs the Mac 2.6.5 friendship fixes. Add or remove friends from their profiles. Contacts refresh when relationships change and after reconnecting. Group chats verify signatures with server-published member keys and encrypt messages with Sender Keys, which rotate on membership changes. Extra text encryption applies to private chats.
- Stores identity trust through Windows secure storage and updates durable sync, attachment authorization refresh, avatar URL normalization and security text in eight languages.
- Use a server with the friendship fixes and clients compatible with the updated group chat mode. See [tests/README.md](tests/README.md) for automated checks and native two-client acceptance.


当前源码版本为 **2.6.5**，个人信息页面底部显示 `PaperPhonePlus v2.6.5`。类型检查、安全／群聊／同步、附件、八语言测试及生产构建已通过；已清理项目构建缓存和旧产物，并交叉编译生成 Windows x64 NSIS 安装版、便携版及 SHA-256 校验文件；Windows 原生运行、安全存储和双客户端互通仍待验收。


The source version is **2.6.5**, and the profile footer displays `PaperPhonePlus v2.6.5`. Type checking, security/group/sync, attachment, eight-language checks and the production build passed. A clean cross-build generated Windows x64 NSIS and portable executables with SHA-256 checksums; native runtime, secure storage and two-client acceptance still require verification on Windows.

---

Copyright © 2025 619dev · Licensed under [AGPL-3.0](LICENSE)

## 🔐 Extra-encrypted text appearance: design and security boundary

Extra text encryption adds a layer of protection to private chats. Private chats remain protected by the existing X25519 key agreement, Ed25519 signatures and message-encryption path; group chats continue to use the Sender Key protocol. Identity private keys and group Sender Keys remain protected by Windows secure storage.

When enabled, each private message is processed in this order:

1. The sender first protects the message body with the extra password shared by both participants. PBKDF2-SHA-256 (210,000 iterations and a random salt) derives an AES-256-GCM key; every message has an independent random IV and an authentication tag for integrity.
2. The complete extra-encryption frame (version, salt, IV, and ciphertext) is then encoded with one of eight selectable text appearances. This is not merely decorative character substitution: the visible characters carry the extra encrypted ciphertext.
3. That appearance ciphertext then enters the project's original encryption path: private-chat E2EE. The server still receives the original E2EE ciphertext plus metadata required for delivery.
4. The recipient reverses the order: first decrypt the original E2EE layer, then decode the text-appearance frame and decrypt the body with the extra password.

The extra password is never uploaded, synchronized automatically, or distributed by the server. Both people in a private chat must set the same password. Text appearances do not need to match: every message carries its own appearance identifier, so the recipient automatically detects and decodes the sender's choice. For example, one person may send Buddhist text while another sends Hangul; if the extra password matches, both decrypt normally. A user's appearance setting controls only the ciphertext appearance of messages they send. When extra encryption is enabled, sending requires the password to be unlocked first. If the recipient password is missing, locked, or different, the app displays the appearance ciphertext instead of the original text.

The app does not persist the extra password. While unlocked it exists only in the current process memory; locally, the app stores only a random salt and AES-GCM verification data used to check whether an entered password is correct. Users can lock immediately or automatically 5, 15, 30, or 60 minutes after the app leaves the foreground. This layer adds an independent shared secret beyond E2EE; it does not replace a strong password, device lock, or system secure storage, and it cannot provide absolute protection on a fully compromised device while the password remains in memory.

## 🔐 额外加密文本外观：工作原理与安全边界

额外文本加密为私聊增加一层保护。私聊使用 X25519 密钥协商与 Ed25519 签名，群聊使用 Sender Key 和服务端公布的成员公钥。身份私钥和群聊 Sender Key 继续由 Windows 系统安全存储保护。

启用后，每条私聊消息按以下顺序处理：

1. 发送方先用私聊双方约定的额外密码处理消息正文。密码通过 PBKDF2-SHA-256（210,000 次迭代及随机盐）派生 AES-256-GCM 密钥；每条消息使用独立随机 IV，并通过认证标签校验完整性。
2. 额外加密后的完整数据帧（版本、盐、IV 和密文）再转换成所选的 8 种文本外观之一。这不是单纯替换字符的装饰效果，外观字符实际承载的是额外加密密文。
3. 该外观密文随后才进入项目原有加密链路。服务器接收私聊 E2EE 密文及投递所需元数据。
4. 接收端执行相反流程：先用原有 E2EE 解密消息，再还原文本外观数据，并用额外密码解密出正文。

额外密码不会上传、自动同步或由服务器分发。私聊双方必须设置相同密码。文本外观不需要一致：每条消息都会携带自己的外观类型标记，接收端会自动识别并还原发送方选择的外观。例如一方发送“与佛论禅”、另一方发送“韩文”，只要额外密码相同，双方都能正常解密；每个人的外观设置只决定自己发出的密文样式。启用额外加密后，发送前需要先解锁密码；接收端密码缺失、仍处于锁定状态或密码不一致时，只能显示文本外观密文，无法显示原文。

应用不会持久保存额外密码：解锁后密码只保留在当前运行内存中，本地仅保存随机盐和用于验证密码是否正确的 AES-GCM 验证数据。用户可以立即锁定，也可在应用离开前台 5、15、30 或 60 分钟后自动锁定。此额外层用于在原有 E2EE 之外增加一个独立的共享秘密；它不能替代强密码、设备锁、系统安全存储，也不能在设备已被完全控制且密码仍驻留内存时提供绝对保护。
