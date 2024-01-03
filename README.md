# 🌐 Media Server Setup Guide

Welcome to the Media Server setup guide! Media Server is a robust streaming platform designed for seamless content broadcasting. Ideal for content creators, businesses, or individuals keen on sharing content globally, this guide will assist you in establishing your Media Server. Let's begin!

## 🖥️ Minimum Requirements 
- 🐧 OS: Debian 10 or higher
- 🧠 RAM: Minimum of 512MB
- 🚀 CPU: At least 1 Core

## Easy Installation with Ansible

For a hassle-free installation of Media Server using Ansible, visit the [media-server-deploy](https://github.com/mediafoundation/media-server-deploy) repository.

## 🛠️ Manual Installation

### 1. System Tools & Node.js
Install necessary tools and Node.js:
```bash
apt update && apt install -y git curl nano xz-utils
curl -sL https://deb.nodesource.com/setup_15.x | bash -
apt install -y nodejs
```

### 2. FFmpeg Setup
Set up FFmpeg for media processing:
```bash
cd /tmp && rm -r ffmpeg*
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
tar xvf ffmpeg-release-amd64-static.tar.xz
cd ffmpeg-* && mv ffmpeg ffprobe /usr/bin/
```

### 3. Clone & Setup Media Server
Clone the repository and install dependencies:
```bash
cd ~ && git clone https://github.com/mediafoundation/mediaserver.git
cd mediaserver && npm i
```

## Configuration

- Rename `config.js.example` to `config.js`.
- Customize `config.js` with your settings.

## 🔒 Securing the Server

Update the secret passphrase to secure your RTMP server:
```bash
nano config.js
```
```js
const config = {
  passphrase: "Your Secret Passphrase",
  //...
}
```

### Configuring CDN Domain

After CDN integration, update Media Server's config with your new subdomain:
```bash
nano config.js
```
```js
const config = {
  //...
  cdn_url: "https://cdn.example.com",
  //...
}
```

## 🚀 Running the App

To launch Media Server, navigate to its directory and run:
```bash
node app.js
```

## 🌍 Testing the Server

Ensure proper setup by visiting your server's IP in a browser. You should see the Media Server homepage:
```
http://YOUR.IP.ADDRESS/
```
[![Home Page](https://docs.media.network/img/mediaserverexp.png)](https://docs.media.network/img/mediaserverexp.png)


> 💡 Restart Media Server after configuration changes.

### Removing a Stream

Delete a stream using:
```bash
curl -X "DELETE" http://admin:admin@localhost/api/streams/live/STREAM_NAME
```

## 🛡️ Admin Panel

Monitor streams and network usage via the admin panel:
```
http://YOUR.IP.ADDRESS:8080/admin
```
Set admin credentials in `config.js`:
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

Media Server is based on illuspas' [Node-Media-Server](https://github.com/illuspas/Node-Media-Server), a Node.js implementation of a RTMP/HTTP-FLV/WS-FLV/HLS/DASH Media Server, utilizing Arut's [nginx RTMP Module](https://github.com/arut/nginx-rtmp-module).
