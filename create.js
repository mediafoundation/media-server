var args = process.argv.slice(2);

var CryptoJS = require("crypto-js");
const config = require('./config');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

if(typeof args[0] != "undefined"){
  var streamkey = args[0];
} else {
  var streamkey = makeid(8);
}

var encrypted = CryptoJS.SHA256(config.passphrase+"/live/"+streamkey).toString();
var encshort = encrypted.substring(0,6);

console.log(streamkey+"?pwd="+encshort);
