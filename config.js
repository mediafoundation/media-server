const config = {
  passphrase: "My Secret Passphrase",
  cdn_url: false,
  rtmp_url: false,
  auth: {
    api : true,
    api_user: 'admin',
    api_pass: 'admin',
  },
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 80,
    mediaroot: './media',
    webroot: './public',
    allow_origin: '*'
  }, 
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=5:hls_list_size=24:hls_flags=delete_segments]'
      }
    ],
  },
  logType:3
};


module.exports = config;
