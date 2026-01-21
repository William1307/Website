---
id: 2
title: "RustDesk: Your Open-Source & Secure Remote Desktop Solution"
date: "Dec 15, 2025"
readTime: "12 min"
tag: "SysAdmin"
---

Say goodbye to TeamViewer and its limitations. **RustDesk** is a powerful open-source alternative for remote desktop control, self-hosted on your VPS. Performance, security, and total control: that's what we love.

### Why RustDesk?
RustDesk offers a complete remote desktop solution with end-to-end encryption, self-hosting capability, and a simple interface. Perfect for managing your servers, helping your loved ones, or working from anywhere.

#### Key Advantages
* **Open-Source:** Source code available, security audit possible
* **Self-Hosted:** Control your own relay servers
* **Performance:** Written in Rust, ultra-fast and lightweight
* **Multi-Platform:** Windows, Linux, macOS, Android, iOS
* **Encryption:** Enhanced security with end-to-end encryption

---

### VPS Installation
We're going to deploy RustDesk on our OVH VPS with Docker. Simple, fast, efficient.

```bash
docker run --name rustdesk-server \
  -p 21115:21115 -p 21116:21116 -p 21116:21116/udp \
  -p 21117:21117 -p 21118:21118 -p 21119:21119 \
  -v rustdesk-data:/data \
  rustdesk/rustdesk-server:latest
```

> Your RustDesk server is now operational! Configure your clients to point to your VPS and enjoy secure, high-performance remote control.
