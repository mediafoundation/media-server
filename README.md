### Minimum Requirements 
- Debian 10+
- 512mb RAM
- 1 Core

### Install System Tools and Node.js
```bash
apt update; \
apt install -y git curl nano xz-utils; \
curl -sL https://deb.nodesource.com/setup_15.x | bash -; \
apt install -y nodejs
```

### Install FFmpeg
```bash
cd /tmp; \
rm -r ffmpeg*; \
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz; \
tar xvf ffmpeg-release-amd64-static.tar.xz; \
cd /tmp/ffmpeg-*/; \
mv ffmpeg ffprobe /usr/bin/;
```

### Clone Media Server Git Repository
 ```bash
cd ~; \
git clone https://github.com/mediafoundation/mediaserver.git; \
cd mediaserver; \
npm i
```

### Running the App

Make sure you are on the correct path, and run the following command to start your Media Server:

```bash
node app.js
```

### Testing the server

Open a web browser and go to your server IP address, you will see your Media Server home page if everything is setup correctly.
```
http://YOUR.IP.ADDRESS/
```
[ ![Home Page](https://docs.media.network/img/mediaserverexp.png) ](https://docs.media.network/img/mediaserverexp.png)

### Securing the server
In order to prevent unauthorized users to stream to your RTMP server, it's recommended to change the default secret passphrase. This passphrase is utilized to create safe stream keys.

```bash
nano config.js
```

```js title="mediaserver/config.js"
const config = {
  passphrase: "My Secret Passphrase",
//...
```

### Using Media Network to scale your Media Server

Optionally, to scale up your streaming plaform to million of users and make it available through a truly powerful and decentralized CDN, you can add your server as a resource on Media Network through the [Media Network App](https://app.media.network). 

Follow [this tutorial](https://docs.media.network/ms-media) using your server IP address.

#### Editing the config to use your generated Media Network subdomain

After adding your origin server IP address to Media Network, a new random subdomain will be assigned to you. The next step is editing the config file of your Media Server, assigning this newly generated domain as the CDN layer for your server.

```bash
nano config.js
```

```js title="mediaserver/config.js"
const config = {
//...
  cdn_url: "https://Resource_ID.medianetwork.cloud",
//...
```

:::info
Make sure to restart your Media Server instance after editing the configuration file, as it's required to apply changes.
:::


#### Removing a stream

```bash
curl -X "DELETE" http://admin:admin@localhost/api/streams/live/STREAM_NAME
```

### Admin Panel

Media Server comes with an admin panel and an API installed by default. Through this panel you'll be able to check streams and network usage details. It can be accessed through any web browser using the following URL:
```
http://YOUR.IP.ADDRESS:8080/admin
```

Admin Username and Password can be set-up by editing the config.js file and restarting the Media Server instance.

  ```js title="mediaserver/config.js"
//...
  auth: {
    api : true,
    api_user: 'admin',
    api_pass: 'admin',
  },
//...
```
---

### Credits

Media Server is a fork of illuspas' [Node-Media-Server](https://github.com/illuspas/Node-Media-Server), a Node.js modified implementation of RTMP/HTTP-FLV/WS-FLV/HLS/DASH Media Server Based on Arut's [nginx RTMP Module](https://github.com/arut/nginx-rtmp-module).