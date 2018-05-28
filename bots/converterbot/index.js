var convert = require('convert-units')

module.exports = (bot) => {
    bot.hear('convert', (payload, chat) => {
        chat.conversation((convo) => {
      		(async ()=>{
      			await convo.say("Bạn muốn đổi từ đơn vị nào?").then(() => {
                	convo.set("from", payload.message.text);
            	});
            	await convo.say("Và sang đơn vị ...?").then(() => {
                	convo.set("to", payload.message.text);
            	});
            	await convo.say("Ok. Đổi từ bao nhiêu sang nhỉ?").then(() => {
                	convo.set("num", payload.message.text);
            	});
            	await convo.say("Ok của bạn đây: " + parseInt(num) + from + " bằng " + convert(parseInt(num)).from(from).to('to') + to + " nhé~");
            	convo.say("<3");
            	convo.end();
      		});
      	});
    });
};