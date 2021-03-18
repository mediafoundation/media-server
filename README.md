### Requirements
- 512mb RAM
- 2 Cores
- Debian 10+

### Install system tools and node.js
```bash
apt install -y git htop curl xz-utils; \
curl -sL https://deb.nodesource.com/setup_15.x | bash -; \
apt install -y nodejs
```

### Install ffmpeg
```bash
cd /tmp; \
rm -rf /tmp/ffmpeg-git*; \
wget https://media.network/static/ffmpeg-release-amd64-static.tar.xz; \
tar xvf ffmpeg-release-amd64-static.tar.xz; \
cd /tmp/ffmpeg-*/; \
mv ffmpeg ffprobe /usr/bin/; \
cd /root;
```

### Clone the Media Server git repository
 ```bash
git clone https://github.com/mediafoundation/mediaserver.git; \
cd mediaserver; \
npm i
```

### Edit configuration
In order to protect your app, it's recommended to change the secret phrase and password. The passphrase is utilized to create safe streamkeys, while admin password is needed to authenticate on the web management panel.

Let's modify config.js and then save it.
```bash
nano config.js
```

```js title="mediaserver/config.js"
const config = {
  passphrase: "My Secret Passphrase",
  auth: {
    api : true,
    api_user: 'admin',
    api_pass: 'admin',
  },
  rtmp: {
//...
```
### Run the app

```bash
node app &
```

---

#### Credits

Media Server is a fork of illuspas' [Node-Media-Server](https://github.com/illuspas/Node-Media-Server), a Node.js modified implementation of RTMP/HTTP-FLV/WS-FLV/HLS/DASH Media Server Based on Arut's [nginx RTMP Module](https://github.com/arut/nginx-rtmp-module).
