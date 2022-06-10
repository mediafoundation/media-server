const NodeMediaServer = require('./');
const config = require('./config');
const CryptoJS = require("crypto-js");
const fs = require('fs');
const path = require('path');

var nms = new NodeMediaServer(config)
nms.run();



nms.on('prePublish', (id, StreamPath, args) => {

  let file = path.join(__dirname + '/blacklist.json');

  let blacklist;

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      blacklist = JSON.parse(data);
      blacklist.forEach(ip => {
        console.log(ip);
      });
    }
    let session = nms.getSession(id);
    if(blacklist.includes(session.socket.remoteAddress)){
      console.log("####### USER IP IS BANNED",session.socket.remoteAddress)
      session.reject();
    }
  });

  var encrypted = CryptoJS.SHA256(config.passphrase+StreamPath).toString();
  var encshort = encrypted.substring(0,6);

  if(encshort != args["pwd"]){
    let session = nms.getSession(id);
    session.reject();
    console.log('[Rejected]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  } else {
    console.log('[Connected]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  }

});
