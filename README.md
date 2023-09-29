# 🌐 Media Server Setup Guide

Welcome to the Media Server setup guide! Media Server is a powerful streaming platform that allows you to broadcast content seamlessly. Whether you're a content creator, a business, or just someone looking to share content with the world, this guide will help you get started with setting up your very own Media Server. Let's dive in!

## 🖥️ Minimum Requirements 
- 🐧 OS: Debian 10+
- 🧠 RAM: 512MB
- 🚀 CPU: 1 Core

## 🛠️ Installation

### 1. System Tools & Node.js
```bash
apt update && apt install -y git curl nano xz-utils
curl -sL https://deb.nodesource.com/setup_15.x | bash -
apt install -y nodejs
```

### 2. FFmpeg Setup
```bash
cd /tmp && rm -r ffmpeg*
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
tar xvf ffmpeg-release-amd64-static.tar.xz
cd ffmpeg-* && mv ffmpeg ffprobe /usr/bin/
```

### 3. Clone & Setup Media Server
```bash
cd ~ && git clone https://github.com/mediafoundation/mediaserver.git
cd mediaserver && npm i
```

## 🚀 Running the App

Navigate to the Media Server directory and start it up:

```bash
node app.js
```

## 🌍 Testing the Server

Visit your server's IP in a browser. If everything's set up right, you'll see the Media Server homepage:

```
http://YOUR.IP.ADDRESS/
```
[![Home Page](https://docs.media.network/img/mediaserverexp.png)](https://docs.media.network/img/mediaserverexp.png)

## 🔒 Securing the Server

Protect your RTMP server by updating the default secret passphrase:

```bash
nano config.js
```

```js
const config = {
  passphrase: "Your Secret Passphrase",
  //...
}
```

## 🌐 Using Media Network to Scale

To scale up your streaming platform for millions of users and make it available through a powerful and decentralized CDN, add your server as a resource on Media Network via the [Media Network App](https://app.media.network). 

Follow [this tutorial](https://docs.media.network/ms-media) using your server IP address.

### Configuring Media Network Subdomain

After adding your origin server IP address to Media Network, a new random subdomain will be assigned to you. Update the config file of your Media Server with this domain:

```bash
nano config.js
```

```js
const config = {
  //...
  cdn_url: "https://Resource_ID.medianetwork.cloud",
  //...
}
```

> 💡 Remember to restart your Media Server after editing the configuration to apply changes.

### Removing a Stream

```bash
curl -X "DELETE" http://admin:admin@localhost/api/streams/live/STREAM_NAME
```

## 🛡️ Admin Panel

Access the built-in admin panel to monitor streams and network usage:

```
http://YOUR.IP.ADDRESS:8080/admin
```

Set up your admin credentials:

```js
// mediaserver/config.js
//...
auth: {
  api : true,
  api_user: 'admin',
  api_pass: 'admin',
},
//...
```

---

## 🙌 Credits

Media Server is a fork of illuspas' [Node-Media-Server](https://github.com/illuspas/Node-Media-Server), a Node.js implementation of RTMP/HTTP-FLV/WS-FLV/HLS/DASH Media Server based on Arut's [nginx RTMP Module](https://github.com/arut/nginx-rtmp-module).