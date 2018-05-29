const request = require('request');
const FormData = require('form-data');
const fs = require('fs');

module.exports = (srcFormat, dstFormat, params, callback, convo) => {
  var form = new FormData();
    var paramsDowncase = {};
    Object.keys(params).forEach(function(k){
        var v = params[k].toString();
        k = k.toLowerCase();
        v = fs.existsSync(v) ? fs.createReadStream(v) : v;
        paramsDowncase[k] = v;
        form.append(k, v);
    });
    var authParam = paramsDowncase.secret ? `Secret=${paramsDowncase.secret}` : `Token=${paramsDowncase.token}`;
    form.submit({ protocol: 'https:', port: 443, host: 'v2.convertapi.com', path: `/${srcFormat}/to/${dstFormat}?${authParam}&StoreFile=true` }, callback);
};