var convert = require('convert-units')

module.exports = (bot) => {
    bot.hear('convert', (payload, chat) => {
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
};