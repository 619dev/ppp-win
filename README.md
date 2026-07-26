<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 Windows 桌面客户端</strong></p>
  <p><strong>End-to-End Encrypted Messaging Windows Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-1.1.7-22c55e?style=flat-square" alt="Version 1.1.7" />
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

## v1.1.7

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
