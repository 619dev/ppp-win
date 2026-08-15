<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 Windows 桌面客户端</strong></p>
  <p><strong>End-to-End Encrypted Messaging Windows Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.4.6-22c55e?style=flat-square" alt="Version 2.4.6" />
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

## v2.4.6

- Text appearance is extra insurance above the existing E2EE: the shared extra password encrypts the body first, followed by private-chat E2EE or group Sender Key encryption. Both private-chat participants, or every group member, need the same password. Different passwords still allow delivery but show only styled ciphertext. / 文本外观是原有 E2EE 之上的额外保险：正文先由共享额外密码加密，再由私聊 E2EE 或群聊 Sender Key 加密。私聊双方或群内所有成员需使用相同密码；密码不一致时消息仍会送达，但只能看到文本外观密文。
- The password is never uploaded or synchronized, and this feature never replaces, bypasses, or downgrades E2EE. / 密码不会上传或自动同步；该功能不替代、不绕过也不降级原有 E2EE。

## v2.4.5

- Fixed the unresponsive “Enable extra encryption” control in the Windows desktop app by replacing Electron's unsupported native password prompt with an in-app password dialog.

- 修复 Windows 桌面端“开启额外加密”按钮点击无反应的问题，使用应用内密码弹窗替代 Electron 不支持的原生密码提示框。

## v2.4.4

- Fixed the locked extra-encryption dialog so it requests the unlock password instead of asking users to set one, across all eight languages.

- 修复关闭额外文本外观加密时未验证密码的安全问题；现在即使已解锁，也必须重新输入正确的额外密码才能关闭。
- 文本外观现已隐藏协议元数据，发送中的本地缓存不再保留消息原文。
- 额外聊天记录加密已移至个人信息 > 消息隐私，并全局应用于所有聊天。

- 加密失败时停止发送且不再回退明文，消息显示实际协议版本
- 新增额外聊天记录密码、8 种文本外观编码及 5/15/30/60 分钟后台自动锁定
- 未正确解锁时仅显示外观密文；私钥与 Sender Key 使用 Windows 安全存储保护，8 种语言文案完整同步

## v2.4.0

- 修复历史单向好友记录导致“已是好友”但联系人不可见的问题；再次添加时会自动刷新联系人列表

## v2.3.8

- 修复首次安装或保留登录态升级后缺少本地身份密钥时无法启动的问题
- 修复安全存储迁移中断留下无效数据后反复启动失败的问题
- 关闭二维码扫描器时可靠释放摄像头，并修复返回按钮的点击层级
- 好友搜索结果会标记已有好友，避免重复发送好友申请

## v2.3.5

- 使用 Windows 系统安全存储保护设备密钥、身份私钥和群聊 Sender Keys
- 本地聊天记录使用账户与用途绑定的认证加密，密文保存至独立 IndexedDB
- 聊天明文仅保留在运行内存中，持久化前移除解密字段
- 自动迁移并删除旧版明文密钥、消息缓存与未加密媒体缓存
- 损坏或遭篡改的缓存会被安全丢弃

## v2.3.3

- 通话和语音录制期间自动保持屏幕唤醒
- 语音消息最长录制时间调整为 2 分钟，并显示录制时限
- 录音超时后自动停止并发送，避免生成超长语音文件
- 完善聊天切换和页面卸载时的录音计时器、录音设备及媒体流清理

## v2.3.1

- 新增长期设备会话与访问令牌自动刷新，减少正常使用中的重复登录
- 旧版登录会话可自动升级为可刷新的持久会话
- 增强 WebSocket 鉴权、心跳检测和网络恢复重连
- 新增离线发件箱、消息确认去重与断线消息补拉，提升弱网可靠性
- 退出登录时主动撤销当前设备会话，同时保留本地身份密钥

## v2.2.9

- 新增贴纸持久化缓存：贴纸包列表、贴纸元数据和媒体文件均可复用本地缓存
- 优化离线及服务暂时不可用时的贴纸展示
- 发送贴纸前完成本地缓存写入，静态、动画和视频贴纸统一使用稳定的 `file_id`
- “清空缓存”功能同步清理贴纸媒体缓存

## v2.2.8

- 新增消息引用与回复预览，支持从引用内容定位原消息
- 一对一语音和视频通话全面迁移至 LiveKit，提升连接与重连稳定性
- 在“关于”区域显示当前应用版本号
- 修复私聊语音通话无远端声音的问题
- 修复变声模式切换未实时应用的问题
- 优化聊天文字输入区的自适应高度、中文输入法及附件面板布局
- 修复离线消息重放导致未读消息数字重复累加的问题
- 修复从通知或其他入口直接进入会话时未读数字未清零的问题
- 修复中文用户名搜索及中文输入法回车提交问题
- 修复私聊视频通话画面挂载和 WebSocket 重复连接问题
- 新增联系人、群组、消息、朋友圈及时间线离线缓存
- 新增本地缓存清理功能
- 优化会话保持逻辑，仅在服务端明确注销时退出登录
- 提供 Windows x64 安装版与免安装便携版

---

Copyright © 2025 619dev · Licensed under [AGPL-3.0](LICENSE)

## 🔐 Extra-encrypted text appearance: design and security boundary

This feature is **extra insurance on top of the existing end-to-end encryption (E2EE)**. It does not replace E2EE with a visual encoding, and it never bypasses or weakens the original encryption. Private chats remain protected by the existing X25519 / ML-KEM-768 key agreement and message-encryption path; group chats continue to use the Sender Key protocol. Identity private keys and group Sender Keys remain protected by Windows secure storage.

When enabled, every message is processed in this order:

1. The sender first protects the message body with the extra password shared by both participants or by all group members. PBKDF2-SHA-256 (210,000 iterations and a random salt) derives an AES-256-GCM key; every message has an independent random IV and an authentication tag for integrity.
2. The complete extra-encryption frame (version, salt, IV, and ciphertext) is then encoded with one of eight selectable text appearances. This is not merely decorative character substitution: the visible characters carry the extra encrypted ciphertext.
3. That appearance ciphertext then enters the project's original encryption path: private-chat E2EE or group Sender Key encryption. The server still receives the original E2EE/Sender-Key ciphertext plus metadata required for delivery.
4. The recipient reverses the order: first decrypt the original E2EE/Sender-Key layer, then decode the text-appearance frame and decrypt the body with the extra password.

The extra password is never uploaded, synchronized automatically, or distributed by the server. Both people in a private chat must set the same password; every group member who needs to read the plaintext must also set that same password. Text appearances do not need to match: every message carries its own appearance identifier, so the recipient automatically detects and decodes the sender's choice. For example, one person may send Buddhist text while another sends Hangul; if the extra password matches, both decrypt normally. A user's appearance setting controls only the ciphertext appearance of messages they send. If the password is missing, locked, or different, messages are still sent and received normally and the original E2EE layer still decrypts successfully, but the app can display only the appearance ciphertext—not the original text.

The app does not persist the extra password. While unlocked it exists only in the current process memory; locally, the app stores only a random salt and AES-GCM verification data used to check whether an entered password is correct. Users can lock immediately or automatically 5, 15, 30, or 60 minutes after the app leaves the foreground. This layer adds an independent shared secret beyond E2EE; it does not replace a strong password, device lock, or system secure storage, and it cannot provide absolute protection on a fully compromised device while the password remains in memory.

## 🔐 额外加密文本外观：工作原理与安全边界

这项功能是**建立在原有端到端加密（E2EE）之上的额外保险**，不是用文本外观代替 E2EE，也不会绕过或降低原有加密。私聊仍由 X25519 / ML-KEM-768 密钥协商及原有消息加密链路保护；群聊仍使用 Sender Key 协议。身份私钥和群聊 Sender Key 继续由 Windows 系统安全存储保护。

启用后，每条消息按以下顺序处理：

1. 发送方先用双方或群内全员约定的额外密码处理消息正文。密码通过 PBKDF2-SHA-256（210,000 次迭代及随机盐）派生 AES-256-GCM 密钥；每条消息使用独立随机 IV，并通过认证标签校验完整性。
2. 额外加密后的完整数据帧（版本、盐、IV 和密文）再转换成所选的 8 种文本外观之一。这不是单纯替换字符的装饰效果，外观字符实际承载的是额外加密密文。
3. 该外观密文随后才进入项目原有加密链路：私聊使用 E2EE，群聊使用 Sender Key；服务器接收到的仍是原有 E2EE／Sender Key 密文及投递所需元数据。
4. 接收端执行相反流程：先用原有 E2EE／Sender Key 解密消息，再还原文本外观数据，并用额外密码解密出正文。

额外密码不会上传、自动同步或由服务器分发。私聊双方必须设置相同密码；群聊中希望阅读正文的所有成员也必须设置相同密码。文本外观不需要一致：每条消息都会携带自己的外观类型标记，接收端会自动识别并还原发送方选择的外观。例如一方发送“与佛论禅”、另一方发送“韩文”，只要额外密码相同，双方都能正常解密；每个人的外观设置只决定自己发出的密文样式。密码缺失、仍处于锁定状态或密码不一致时，消息依然能够正常发送、接收并完成原有 E2EE 解密，但应用只能显示文本外观密文，无法显示原文。

应用不会持久保存额外密码：解锁后密码只保留在当前运行内存中，本地仅保存随机盐和用于验证密码是否正确的 AES-GCM 验证数据。用户可以立即锁定，也可在应用离开前台 5、15、30 或 60 分钟后自动锁定。此额外层用于在原有 E2EE 之外增加一个独立的共享秘密；它不能替代强密码、设备锁、系统安全存储，也不能在设备已被完全控制且密码仍驻留内存时提供绝对保护。
