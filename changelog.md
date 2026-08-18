# Changelog / 更新日志

All notable changes and new features are recorded here. Historical entries below were migrated from the repository documentation.

所有重要版本改动和新特性统一记录于此。下方历史条目由仓库原有文档迁移而来。

## 2.4.7

- Fixed E2EE safety-number mismatches by deriving both views from the same pair of published identity keys; text appearance and its extra password remain independent of the E2EE safety number.
- Fixed one-to-one video calls that could play audio while leaving the remote video black; remote LiveKit tracks now use native track attachment and explicit mobile playback.
- Fixed the call-duration race that could leave an established call at `00:00`.
- Added ordered multi-image sending with a maximum of 20 images per selection and per-image upload progress.
- Added per-account, per-conversation scroll-position memory and a one-tap button to jump to the latest message.
- Updated the application and native platform versions to `2.4.7`.

- 修复 E2EE 安全号码不一致：双方现在基于服务器发布的同一对身份公钥计算；文本外观及其额外密码仍与 E2EE 安全号码相互独立。
- 修复私聊视频通话只有声音、远端画面黑屏的问题；远端 LiveKit 媒体改用原生轨道绑定，并显式兼容移动端播放。
- 修复通话已经接通但计时器停留在 `00:00` 的事件竞态。
- 新增多图片发送：一次最多选择 20 张，保持选择顺序并显示逐张上传进度。
- 新增按账号、按会话保存屏幕滚动位置，以及一键跳到最新消息按钮。
- 应用及原生平台版本统一更新为 `2.4.7`。

---

# Historical entries from README.md

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

# Historical entries from README_CN.md

## 🆕 v2.4.6 更新说明

- 文本外观现已明确定位为原有端对端加密之上的额外保险：消息正文先由共享额外密码加密并转换为所选外观，再进入私聊 E2EE（X25519 / ML-KEM-768）或群聊 Sender Key 加密链路。
- 私聊双方或群内所有成员需要自行约定并设置相同的额外密码；密码不会上传服务器或自动同步。
- 密码不一致时，原有 E2EE 和消息送达仍正常，但接收方只能看到文本外观密文，无法查看原文。
- 该功能不会替代、绕过或降级原有 E2EE；个人信息 > 消息隐私页面的 8 种语言说明已同步更新。

## 🆕 v2.4.5 更新说明

- 修复 Windows 桌面端“个人信息 > 消息隐私”中“开启额外加密”按钮点击无反应的问题
- 启用、解锁和关闭额外加密现统一使用应用内密码弹窗，不再依赖 Electron 不支持的原生 `prompt()`

## v2.4.4 更新说明

- 修复额外加密锁定状态下错误显示“设置密码”的问题；现在显示“输入解锁密码”，并同步全部 8 种语言。

- 修复关闭额外文本外观加密时未验证密码的安全问题；现在即使已解锁，也必须重新输入正确的额外密码才能关闭。
- 文本外观现已隐藏协议元数据，发送中的本地缓存不再保留消息原文。
- 额外聊天记录加密已移至个人信息 > 消息隐私，并全局应用于所有聊天。

- 加密失败时停止发送且不再回退明文，消息显示实际协议版本
- 新增额外聊天记录密码、8 种文本外观编码及 5/15/30/60 分钟后台自动锁定
- 未正确解锁时仅显示外观密文；私钥与 Sender Key 使用 Windows 安全存储保护，8 种语言文案完整同步

## 🆕 v2.4.0 更新说明

- 修复历史单向好友记录导致“已是好友”但联系人不可见的问题；再次添加时会自动刷新联系人列表

## v2.3.8 更新说明

- 修复首次安装或保留登录态升级后缺少本地身份密钥时无法启动的问题
- 修复安全存储迁移中断留下无效数据后反复启动失败的问题
- 关闭二维码扫描器时可靠释放摄像头，并修复返回按钮的点击层级
- 好友搜索结果会标记已有好友，避免重复发送好友申请

## v2.3.5 更新说明

- 使用 Windows 系统安全存储保护设备密钥、身份私钥和群聊 Sender Keys
- 本地聊天记录使用账户与用途绑定的认证加密，密文保存至独立 IndexedDB
- 聊天明文仅保留在运行内存中，持久化前移除解密字段
- 自动迁移并删除旧版 localStorage、sessionStorage 和 IndexedDB 中的明文密钥及聊天缓存
- 清理旧版未加密媒体缓存；损坏或遭篡改的缓存会被安全丢弃

## v2.3.3 更新说明

- 通话和语音录制期间自动保持屏幕唤醒
- 语音消息最长录制时间调整为 2 分钟，并在录音界面显示时限
- 达到录音时限后自动停止并发送，避免生成超长语音文件
- 完善聊天切换和页面卸载时的录音计时器、录音设备及媒体流清理

## v2.3.1 更新说明

- 新增长期设备会话与访问令牌自动刷新，减少正常使用中的重复登录
- 旧版登录会话可自动升级为可刷新的持久会话
- 增强 WebSocket 鉴权、心跳检测和网络恢复重连
- 新增离线发件箱、消息确认去重与断线消息补拉，提升弱网可靠性
- 退出登录时主动撤销当前设备会话，同时保留本地身份密钥

## v2.2.9 更新说明

- 新增贴纸持久化缓存，缓存贴纸包列表、贴纸元数据与媒体文件
- 已缓存贴纸可在离线状态或服务暂时不可用时继续展示
- 发送贴纸前完成本地缓存写入，静态、动画及视频贴纸统一使用稳定的 `file_id`
- “清空缓存”功能现会同时清理贴纸媒体缓存

## v2.2.8 更新说明

- 新增消息引用与回复预览，支持点击引用内容定位原消息
- 一对一语音和视频通话全面迁移至 LiveKit SFU，统一媒体连接、重连和轨道订阅
- 会话列表与通知可正确显示引用消息正文
- 在个人资料“关于”区域显示当前应用版本号
- 修复私聊语音通话无法播放远端声音的问题
- 修复慢速、快速变声模式切换后未实时应用的问题
- 优化私聊视频通话中的信息浮层，避免遮挡视频画面
- 优化聊天文字输入区自适应高度及中文输入法换行/发送行为
- 调整附件面板布局，并恢复图片附件入口
- 修复离线消息重放导致未读消息数字重复累加的问题
- 修复从通知或其他入口直接进入会话时未读数字未清零的问题
- 修复中文用户名搜索及中文输入法回车提交问题
- 修复私聊视频通话画面挂载问题
- 避免 WebSocket 处于连接中时重复创建连接
- 新增联系人、群组、消息、朋友圈及时间线离线缓存
- 消息本地缓存上限由每个会话 200 条提升至 2000 条
- 新增本地缓存清理入口
- 优化会话保持逻辑，普通网络或鉴权故障不再清除本地登录状态

---

# Historical entries from README_EN.md

## 🆕 What's New in v2.4.6

- Text appearance is now clearly documented as extra insurance above the existing end-to-end encryption: the shared extra password encrypts and renders the body first, followed by private-chat E2EE (X25519 / ML-KEM-768) or group Sender Key encryption.
- Both private-chat participants, or every group member, must agree on and configure the same extra password; it is never uploaded or synchronized.
- If passwords differ, E2EE and delivery still work, but recipients see only styled ciphertext and cannot read the original body.
- This feature never replaces, bypasses, or downgrades the original E2EE; the Profile > Message privacy explanation is updated in all eight UI languages.

## 🆕 What's New in v2.4.5

- Fixed the unresponsive “Enable extra encryption” control under Profile > Message privacy in the Windows desktop app
- Enabling, unlocking, and disabling extra encryption now use a consistent in-app password dialog instead of Electron's unsupported native `prompt()`

## What's New in v2.4.4

- Fixed the locked extra-encryption dialog so it requests the unlock password instead of asking users to set one, across all eight languages.

- Fixed a security issue that allowed extra text-appearance encryption to be disabled without password verification; the correct extra password must now be re-entered even while unlocked.
- Text appearance now hides protocol metadata and optimistic caches no longer retain original message bodies.
- Extra message-history encryption moved to Profile > Message privacy and applies globally to all chats.

- Encrypted sends fail closed instead of falling back to plaintext, with the actual protocol shown per message
- Adds an extra chat-history password, eight presentation codecs, and 5/15/30/60-minute background auto-lock
- Locked histories show presentation ciphertext only; private keys and Sender Keys use Windows secure storage, with all eight UI languages synchronized

## 🆕 What's New in v2.4.0

- Fixed legacy one-way friendship records causing an “Already friends” message while the contact remained invisible; adding the user again now repairs the relationship and refreshes the contact list immediately

## What's New in v2.3.8

- Fixed startup when a fresh install or retained session has no local identity keys
- Recovered safely from invalid secure-storage data left by an interrupted migration
- Reliably releases the camera when closing the QR scanner and fixes the back button's click layering
- Identifies existing friends in search results to prevent duplicate friend requests

## What's New in v2.3.5

- Protects the device key, identity private keys, and group Sender Keys with Windows secure storage
- Encrypts cached chat history with account- and purpose-bound authenticated envelopes in a dedicated IndexedDB
- Keeps display plaintext in memory only and strips decrypted fields before persistence
- Migrates and removes legacy plaintext keys and chat caches from localStorage, sessionStorage, and IndexedDB
- Removes the former unencrypted media cache and safely discards corrupt or tampered cache data

## What's New in v2.3.3

- Keeps the screen awake during calls and voice recording
- Limits voice messages to two minutes and displays the recording limit
- Automatically stops and sends a recording when it reaches the time limit
- Improves cleanup of recording timers, capture devices, and media streams when switching chats or leaving the page

## What's New in v2.3.1

- Added durable device sessions with automatic access-token refresh to reduce unnecessary sign-ins
- Added automatic migration of legacy login sessions to refreshable persistent sessions
- Improved WebSocket authentication, heartbeat monitoring, and reconnection after network recovery
- Added a durable offline outbox, acknowledgement deduplication, and missed-message catch-up for better reliability on unstable networks
- Logout now revokes the current device session while preserving local identity keys

## What's New in v2.2.9

- Added persistent sticker caching for pack lists, sticker metadata, and media files
- Cached stickers remain available offline or during temporary server failures
- Sticker media is cached before sending, with static, animated, and video stickers consistently using stable `file_id` values
- “Clear cache” now also removes cached sticker media

## What's New in v2.2.8

- Added message replies with quoted previews and navigation to the original message
- Migrated one-to-one voice and video calls to LiveKit SFU for unified media connection, reconnection, and track subscription
- Updated conversation and notification previews to show the body of replied messages correctly
- Added the current app version to the About section
- Fixed missing remote audio in one-to-one voice calls
- Fixed voice-mode changes not being applied in real time
- Improved the video-call information overlay to avoid obscuring the remote video
- Improved auto-growing chat input and Chinese IME newline/send behavior
- Refined the attachment panel layout and restored the image attachment entry
- Fixed duplicate unread-count increments when offline messages are replayed after reconnecting
- Fixed unread counts not clearing when a conversation is opened directly from a notification or another entry point
- Fixed Chinese username search and Enter handling with Chinese IMEs
- Fixed video element attachment in one-to-one video calls
- Prevented duplicate WebSocket connections while a connection is in progress
- Added offline caching for contacts, groups, messages, Moments, and Timeline
- Increased the local message cache from 200 to 2,000 messages per conversation
- Added a local cache clearing option
- Improved session persistence so ordinary network or authorization failures do not clear the local login
