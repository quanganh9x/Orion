var convert = require('convert-units');
// var convert = require('./file-convert.js');
const request = require('request');
var FILECONVERT_API = 'https://v2.convertapi.com/';

module.exports = (bot) => {
  bot.hear('convert file', (payload, chat) => {
    chat.conversation((convo) => {
      (async ()=>{
      	await convo.ask("Bạn muốn đổi từ định dạng file nào?", (payload, convo) => {
          convo.set("from", payload.message.text);
        });
        await convo.ask("Và sang định dạng ...? Chú ý: chưa hỗ trợ đổi từ pdf sang doc, xlsx,...", (payload, convo) => {
          convo.set("to", payload.message.text);
        });
        await convo.ask("Ok. Bạn gửi file lên cho mình nhé ;)", (payload, convo) => {
          if (payload.message.attachments[0].type == "file" || payload.message.attachments[0].type == "image"){

            // Hoặc là dùng request thôi không dùng code mẫu bên convertapi.com nữa?
            await request.get({
              url: FILECONVERT_API + to + '/to/' + from + '?Secret=EMvJmNOJCOQ3OPyB&File=' + payload.message.attachments[0].payload.url.replace(/:/g , "%3A").replace(/\//g , "%2F").replace(/\?/g , "%3F").replace(/&/g , "%26").replace(/=/g , "%3D").replace(/%/g , "%25") + '&StoreFile=true',
              headers: {
                'Accept': 'application/json'
              }
            }, (err, response, body) => {
              convo.say("Ok file của bạn ở link này nhé: " + body.Files[0].Url);
            });

            // convert(from, to, {
            //   'Secret': 'EMvJmNOJCOQ3OPyB',
            //   'File': payload.message.attachments[0].payload.url.replace(/:/g , "%3A").replace(/\//g , "%2F").replace(/\?/g , "%3F").replace(/&/g , "%26").replace(/=/g , "%3D").replace(/%/g , "%25"),
            //   },
            //   function(err, response){
            //     await convo.say("Ok file của bạn ở link này nhé: " + response.Files[0].Url);
            //   }
            // );

          }
        });
        convo.say("<3");
        convo.end();
      });
    });
  });
  bot.hear('convert metrics', (payload, chat) => {
   chat.conversation((convo) => {
    (async ()=>{
      await convo.ask("Bạn muốn đổi từ đơn vị nào?", (payload, convo) => {
         convo.set("from", payload.message.text);
     });
     await convo.ask("Và sang đơn vị ...?", (payload, convo) => {
         convo.set("to", payload.message.text);
     });
     await convo.ask("Ok. Đổi từ bao nhiêu sang nhỉ?", (payload, convo) => {
         convo.set("num", payload.message.text);
     });
     await convo.say("Ok của bạn đây: " + parseInt(num) + from + " bằng " + convert(parseInt(num)).from(from).to('to') + to + " nhé~");
     convo.say("<3");
     convo.end();
    });
  });
});