const Logger = require('./node_core_logger');

const Tls = require('tls');
const Fs = require('fs');
const Net = require('net');
const NodeRtmpSession = require('./node_rtmp_session');
const NodeCoreUtils = require('./node_core_utils');

const context = require('./node_core_ctx');

const RTMP_PORT = 1935;
const RTMPS_PORT = 443;

class NodeRtmpServer {
  constructor(config) {
    config.rtmp.port = this.port = config.rtmp.port ? config.rtmp.port : RTMP_PORT;
    this.tcpServer = Net.createServer((socket) => {
      let session = new NodeRtmpSession(config, socket);
      session.run();
    })

    if (config.rtmp.ssl){
      config.rtmp.ssl.port = this.sslPort = config.rtmp.ssl.port ? config.rtmp.ssl.port : RTMPS_PORT;
      try {
        const options = {
          key: Fs.readFileSync(config.rtmp.ssl.key),
          cert: Fs.readFileSync(config.rtmp.ssl.cert)
        }
        this.tlsServer = Tls.createServer(options, (socket) => {
          let session = new NodeRtmpSession(config, socket);
          session.run();
        });
      } catch (e) {
        Logger.error(`Media Server - Rtmps Server error while reading ssl certs: <${e}>`);
      }
    }
  }

  run() {
    this.tcpServer.listen(this.port, () => {
      Logger.log(`Media Server - Rtmp Server started on port: ${this.port}`);
    });

    this.tcpServer.on('error', (e) => {
      Logger.error(`Media Server - Rtmp Server ${e}`);
    });

    this.tcpServer.on('close', () => {
      Logger.log(`Media Server - Rtmp Server Close.`);
    });

    if (this.tlsServer) {
      this.tlsServer.listen(this.sslPort, () => {
        Logger.log(`Media Server - Rtmps Server started on port: ${this.sslPort}`);
      });

      this.tlsServer.on('error', (e) => {
        Logger.error(`Media Server - Rtmps Server ${e}`);
      });

      this.tlsServer.on('close', () => {
        Logger.log(`Media Server - Rtmps Server Close.`);
      });
    }
  }

  stop() {
    this.tcpServer.close();

    if (this.tlsServer) {
      this.tlsServer.close();
    }

    context.sessions.forEach((session, id) => {
      if (session instanceof NodeRtmpSession)
        session.stop();
    });
  }
}

module.exports = NodeRtmpServer
