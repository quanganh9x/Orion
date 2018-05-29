var cryptoBrowserify = require("crypto-browserify");

module.exports = (name,from, convo) => {
  var hash = cryptoBrowserify.createHash(from);
  hash.write();
};