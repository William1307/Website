---
id: 1
title: "Pi-hole + Unbound: The Ultimate DNS on Raspberry Pi 5"
date: "Dec 08, 2025"
readTime: "10 min"
tag: "Network"
---

![Pi-hole Banner](/Images/Pi_hole_article_banner.png)

Today, we're tackling a big one: taking back total control of our internet requests. We're going to install **Pi-hole** (the ad blocker) coupled with **Unbound** (a recursive DNS resolver). All on my Raspberry Pi 5 8GB. Spoiler: it's totally overkill (a Pi Zero would suffice), but we love it.

### Why are we doing this? (The theory minute)

#### 1. What is a DNS?
Imagine that DNS (Domain Name System) is the phonebook of the Internet. When you type `google.com`, your computer doesn't know where it is. It asks a DNS server: "Hey, what is Google's IP address?". The server answers `142.250.xxx.xxx`, and boom, the page appears.

#### 2. Why a "Recursive" DNS?
By default, your internet box uses your ISP's DNS (or Google 8.8.8.8). Basically, you're asking a middleman to search for you. So, they know everything you visit.

With **Unbound** in recursive mode, we cut out the middleman. Your Raspberry Pi will talk directly to the "Root Servers" (the big bosses of the Internet).

* **Privacy:** Nobody (not Google, nor your ISP) sees your DNS requests.
* **Security:** We use DNSSEC to validate that the answers are authentic.
* **Zero Ads:** Pi-hole filters requests before they even leave.

---

### Step 1: Prepare the beast
We are on a Raspberry Pi 5. Make sure you have Raspberry Pi OS installed and up to date. Open the terminal (or connect via SSH) and run the classic update:

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Pi-hole
The Pi-hole installation is automated. This is the "Network-wide Ad Blocking" that will protect all devices in the house.

```bash
curl -sSL https://install.pi-hole.net | bash
```

### Step 3: Install Unbound
This is where the magic happens. We install Unbound so we no longer depend on Google's DNS.

```bash
sudo apt install unbound
```

> And there you go! Your Pi-hole now queries your local Unbound instance. It's clean, private, and runs perfectly on the Pi 5.
