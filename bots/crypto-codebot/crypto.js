var cryptoBrowserify = require("crypto-browserify");

module.exports = (buf,from, convo) => {
  var hash = cryptoBrowserify.createHash(from,buf);
  hash.write();
  hash.end()
  hash.read();
};