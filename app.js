const NodeMediaServer = require('./');
const config = require('./config');
const CryptoJS = require("crypto-js");

var nms = new NodeMediaServer(config)
nms.run();

nms.on('prePublish', (id, StreamPath, args) => {

  var encrypted = CryptoJS.SHA256(config.passphrase+StreamPath);

  if(encrypted != args["pwd"]){
    let session = nms.getSession(id);
    session.reject();
    console.log('[Rejected]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  } else {
    console.log('[Connected]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  }

});
