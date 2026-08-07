<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 Windows 桌面客户端</strong></p>
  <p><strong>End-to-End Encrypted Messaging Windows Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.3.3-22c55e?style=flat-square" alt="Version 2.3.3" />
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
