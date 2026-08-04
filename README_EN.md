<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>End-to-End Encrypted Messaging Windows Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.3.1-22c55e?style=flat-square" alt="Version 2.3.1" />
    <img src="https://img.shields.io/badge/Electron-36-47848F?style=flat-square&logo=electron" alt="Electron" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License" />
  </p>
</div>

---

[中文](README_CN.md)

---

## 📖 Introduction

PaperPhonePlus Desktop is the Windows desktop client of [Paperphone-plus](https://github.com/619dev/Paperphone-plus), built with Electron. It wraps the original React frontend into a native desktop application with full instant messaging capabilities and built-in network proxy support.

## 🆕 What's New in v2.3.1

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

## ✨ Features

### 💬 Instant Messaging
- Private & group chat with text, images, videos, files, and voice messages
- LiveKit SFU-backed one-on-one video and voice calls
- LiveKit SFU-backed group voice and video meetings for up to 100 participants
- Host controls, mute all, lecture mode, and open discussion mode
- Participant list with speaking, camera, and microphone status
- Moments (timeline) posting and browsing
- Contact management, QR code friend requests, and sidebar user search with friend requests
- Friends and groups displayed together in the contacts sidebar with search and direct navigation
- Complete localization for the meeting interface and notifications

### 🔐 End-to-End Encryption
- **E2EE**: All messages encrypted before sending; the server cannot read them
- **Forward Secrecy**: Based on the Double Ratchet algorithm, each message uses a unique key
- **Post-Quantum Encryption**: Integrated CRYSTALS-Kyber for resistance against quantum computing attacks
- **Crypto Library**: libsodium (X25519, XSalsa20-Poly1305, Ed25519)

### 🌐 Network Proxy
- Supports **SOCKS5**, **HTTP**, and **HTTPS** proxy protocols
- System-level transparent proxy — all HTTP and WebSocket traffic automatically routed through proxy
- Multiple proxy profile management with one-click switching
- Proxy latency testing
- Persistent configuration, auto-restored on restart

### 🖥️ Desktop Features
- NSIS installer + portable executable (x64)
- Telegram-style desktop layout (left sidebar + right main panel)
- Draggable sidebar width (280px–480px)
- Window position & size persistence
- External links open in system browser
- Dark mode support

## 📦 Installation

### Download from Releases

Go to the [Releases](../../releases) page and download:

| File | Description |
|------|-------------|
| `PaperPhonePlus-2.3.1-Windows-Setup.exe` | NSIS installer (Windows x64) |
| `PaperPhonePlus-2.3.1-Windows-Portable.exe` | Portable executable (Windows x64) |

The installer lets users select the destination and preserves local app data by default. The portable build runs without installation. Allow Windows camera and microphone access when joining a meeting for the first time.

### Build from Source

#### Prerequisites

- Node.js >= 18
- npm >= 9
- Windows system (recommended) or macOS / Linux (cross-compilation)

#### Steps

```bash
# Clone the repository
git clone https://github.com/619dev/ppp-win.git
cd ppp-win

# Install dependencies
npm install

# Development mode (Vite HMR + Electron)
npm run dev:electron

# Production build
npm run build

# Package for Windows
npm run build:win
```

## 🎥 Video Meeting Deployment

The desktop client obtains a LiveKit access token from the application server, so updating the client alone does not enable meetings. The deployment must:

1. Run a server version that provides `POST /api/calls/meeting-token`
2. Run a LiveKit service reachable by every participant
3. Configure the correct LiveKit URL, API Key, and API Secret on the server
4. Allow HTTPS, WebSocket/WSS, and the required LiveKit media ports through the reverse proxy and firewall

Meeting controls such as mute-all and lecture mode use the LiveKit data channel. HTTP and WebSocket signaling follows the in-app proxy setting; media proxy support depends on the proxy type and LiveKit network configuration.

## 🔧 Proxy Configuration

1. Open the app and go to the login page
2. Tap the proxy settings icon
3. Add a proxy node (SOCKS5 / HTTP / HTTPS)
4. Enter host, port, username (optional), and password (optional)
5. Activate the proxy and test the connection

The proxy is implemented via Electron's `session.setProxy()` API, transparently covering all network requests including WebSocket connections.

## 🏗️ Architecture

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

### Tech Stack

| Layer | Technology |
|-------|----------:|
| Desktop Framework | Electron 36 |
| Frontend | React 19 + TypeScript 5.7 |
| Build Tool | Vite 6 |
| State Management | Zustand 5 |
| Video Meetings | LiveKit Client 2.20 (SFU) |
| Encryption | libsodium-wrappers-sumo + crystals-kyber-js |
| Packaging | electron-builder (NSIS + Portable) |
| Persistence | electron-store |

## 📁 Project Structure

```
├── electron/
│   ├── main.ts          # Main process: window, proxy, IPC
│   └── preload.ts       # Preload: secure API bridge
├── src/
│   ├── api/             # HTTP, WebSocket, proxy bridge
│   ├── components/      # UI components
│   ├── contexts/        # React Context (calls, etc.)
│   ├── crypto/          # E2EE encryption modules
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Internationalization
│   ├── pages/           # Page components
│   ├── store/           # Zustand state management
│   ├── utils/           # Utility functions
│   ├── electron.d.ts    # Electron API type declarations
│   └── main.tsx         # React entry point
├── build/
│   ├── icon.ico         # Windows app icon
│   ├── icon.png         # Universal PNG icon
│   └── icons/           # Multi-size PNG icons
├── electron-builder.yml # Packaging config (Windows NSIS + Portable)
├── tsconfig.electron.json # Electron TypeScript config
├── vite.config.ts       # Vite build configuration
└── package.json         # Project configuration
```

## 📄 License

This project is built upon [Paperphone-plus](https://github.com/619dev/Paperphone-plus) and is licensed under the [GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0).

This means:
- ✅ You are free to use, modify, and distribute this software
- ✅ You may use this software for commercial purposes
- 📋 You must disclose the source code of any modifications
- 📋 Modified versions must be licensed under AGPL-3.0 as well
- 📋 If you provide the software as a network service, you must make the source code available

See the [LICENSE](LICENSE) file for the full license text.

Copyright © 2025 619dev
