<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 Windows 桌面客户端</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.4.1-22c55e?style=flat-square" alt="Version 2.4.1" />
    <img src="https://img.shields.io/badge/Electron-36-47848F?style=flat-square&logo=electron" alt="Electron" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License" />
  </p>
</div>

---

[English](README_EN.md)

---

## 📖 简介

PaperPhonePlus Desktop 是 [Paperphone-plus](https://github.com/619dev/Paperphone-plus) 的 Windows 桌面客户端版本，基于 Electron 构建。它将原项目的 React 前端封装为原生桌面应用，提供完整的即时通讯功能，并内置网络代理支持。

## 🆕 v2.4.1 更新说明

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

## ✨ 功能特性

### 💬 即时通讯
- 私聊 & 群聊，支持文字、图片、视频、文件、语音消息
- 基于 LiveKit SFU 的一对一视频/语音通话
- 基于 LiveKit SFU 的群组语音和视频会议（最多 100 人）
- 会议主席、全员静音、讲课模式与自由讨论模式
- 参会者列表、发言状态、摄像头及麦克风状态显示
- 朋友圈（Moments）动态发布与浏览
- 联系人管理、扫码添加好友，以及在桌面侧边栏搜索用户并发送好友请求
- 联系人侧边栏同时显示好友与群聊，支持搜索和直接进入会话
- 完整的会议界面与通知多语言支持

### 🔐 端对端加密
- **E2EE（端对端加密）**：所有消息在发送前加密，服务器无法读取
- **前向保密（Forward Secrecy）**：基于 Double Ratchet 算法，每条消息使用不同密钥
- **抗量子加密**：集成 CRYSTALS-Kyber 后量子密钥封装，抵御量子计算攻击
- **加密库**：libsodium (X25519, XSalsa20-Poly1305, Ed25519)

### 🌐 网络代理
- 支持 **SOCKS5**、**HTTP**、**HTTPS** 代理协议
- 系统级透明代理 — 所有 HTTP 和 WebSocket 流量自动走代理
- 多代理配置管理，一键切换
- 代理延迟测试
- 配置持久化，重启自动恢复

### 🖥️ 桌面特性
- NSIS 安装包 + 免安装便携版（x64）
- Telegram 风格桌面横屏布局（左侧边栏 + 右侧主面板）
- 侧边栏宽度可拖拽调整（280px–480px）
- 窗口位置 & 大小记忆
- 外部链接自动在系统浏览器中打开
- 暗色模式支持

## 📦 安装

### 从 Release 下载

前往 [Releases](../../releases) 页面下载安装包：

| 文件 | 说明 |
|------|------|
| `PaperPhonePlus-2.4.1-Windows-Setup.exe` | NSIS 安装包（Windows x64） |
| `PaperPhonePlus-2.4.1-Windows-Portable.exe` | 免安装便携版（Windows x64） |

安装版允许选择安装目录，并默认保留本地应用数据；便携版无需安装即可运行。首次加入会议时，请允许 Windows 使用摄像头和麦克风。

### 从源码构建

#### 环境要求

- Node.js >= 18
- npm >= 9
- Windows 系统（推荐）或 macOS / Linux（交叉编译）

#### 步骤

```bash
# 克隆仓库
git clone https://github.com/619dev/ppp-win.git
cd ppp-win

# 安装依赖
npm install

# 开发模式（Vite 热重载 + Electron）
npm run dev:electron

# 构建生产版本
npm run build

# 打包 Windows 安装包
npm run build:win
```

## 🎥 视频会议部署要求

桌面端通过服务端获取 LiveKit 访问令牌，因此仅升级客户端还不足以启用会议功能。部署环境需要：

1. 服务端包含上游最新的会议接口 `POST /api/calls/meeting-token`
2. 配置并启动可由参会者访问的 LiveKit 服务
3. 在服务端设置正确的 LiveKit URL、API Key 和 API Secret
4. 反向代理允许 HTTPS、WebSocket/WSS 和 LiveKit 所需媒体端口通过

会议控制消息（全员静音、讲课模式）通过 LiveKit 数据通道传递。HTTP 和 WebSocket 信令会遵循应用内代理设置；音视频媒体能否通过代理取决于所使用代理和 LiveKit 的网络配置。

## 🔧 代理配置

1. 打开应用，进入登录页面
2. 点击代理设置图标
3. 添加代理节点（支持 SOCKS5 / HTTP / HTTPS）
4. 填写主机、端口、用户名（可选）、密码（可选）
5. 激活代理并测试连接

代理通过 Electron 的 `session.setProxy()` API 实现，对所有网络请求（包括 WebSocket）透明生效。

## 🏗️ 技术架构

```
┌─────────────────────────────────────────┐
│            Electron Main Process         │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │  Proxy  │  │  Window  │  │  IPC   │ │
│  │ Manager │  │ Manager  │  │Handler │ │
│  └─────────┘  └──────────┘  └────────┘ │
│       ↕ session.setProxy()    ↕ IPC     │
├─────────────────────────────────────────┤
│          Preload (contextBridge)         │
├─────────────────────────────────────────┤
│          Renderer (React 19 + Vite)      │
│  ┌──────┐ ┌───────┐ ┌──────┐ ┌──────┐ │
│  │Login │ │ Chats │ │Calls │ │Moments│ │
│  └──────┘ └───────┘ └──────┘ └──────┘ │
│  ┌─────────────────────────────────┐   │
│  │  Crypto (libsodium + Kyber)     │   │
│  │  Double Ratchet + E2EE          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 技术栈

| 层级 | 技术 |
|------|------|
| 桌面框架 | Electron 36 |
| 前端框架 | React 19 + TypeScript 5.7 |
| 构建工具 | Vite 6 |
| 状态管理 | Zustand 5 |
| 视频会议 | LiveKit Client 2.20（SFU） |
| 加密 | libsodium-wrappers-sumo + crystals-kyber-js |
| 打包 | electron-builder (NSIS + Portable) |
| 持久化 | electron-store |

## 📁 项目结构

```
├── electron/
│   ├── main.ts          # 主进程：窗口、代理、IPC
│   └── preload.ts       # 预加载：安全 API 桥接
├── src/
│   ├── api/             # HTTP、WebSocket、代理桥接
│   ├── components/      # UI 组件
│   ├── contexts/        # React Context（通话等）
│   ├── crypto/          # E2EE 加密模块
│   ├── hooks/           # 自定义 Hooks
│   ├── i18n/            # 国际化
│   ├── pages/           # 页面组件
│   ├── store/           # Zustand 状态管理
│   ├── utils/           # 工具函数
│   ├── electron.d.ts    # Electron API 类型声明
│   └── main.tsx         # React 入口
├── build/
│   ├── icon.ico         # Windows 应用图标
│   ├── icon.png         # 通用 PNG 图标
│   └── icons/           # 各尺寸 PNG 图标
├── electron-builder.yml # 打包配置（Windows NSIS + Portable）
├── tsconfig.electron.json # Electron TypeScript 配置
├── vite.config.ts       # Vite 构建配置
└── package.json         # 项目配置
```

## 📄 许可证

本项目基于 [Paperphone-plus](https://github.com/619dev/Paperphone-plus) 开发，采用 [GNU Affero General Public License v3.0](LICENSE)（AGPL-3.0）许可证。

这意味着：
- ✅ 你可以自由使用、修改和分发本软件
- ✅ 你可以将本软件用于商业用途
- 📋 你必须公开修改后的源代码
- 📋 修改后的版本必须同样使用 AGPL-3.0 许可证
- 📋 通过网络提供服务时，也必须提供源代码

完整许可证文本请参阅 [LICENSE](LICENSE) 文件。

Copyright © 2025 619dev
