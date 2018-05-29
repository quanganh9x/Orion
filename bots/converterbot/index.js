var convert = require('convert-units');
var convert = require('./file-convert.js');

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
        await convo.say("Ok. Bạn gửi file lên cho mình nhé ;)");
        bot.on('attachment', (payload, chat) => {
          convert(from, to, {
            'Secret': 'EMvJmNOJCOQ3OPyB',
            'File': payload.message.attachments.payload.url.replace("://" , "%3A%2F%2F"),
            },
            function(err, response){
              await convo.say("Ok file của bạn ở link này nhé: " + response.Files[0].Url);
            }
          );
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