var money = require("money");

module.exports = (bot) => {
    bot.hear(['Tiền tệ','Đổi tiền','currency'], (payload, chat) => {
        chat.conversation((convo) => {
      		(async ()=>{
            await convo.say("Đây là các đồng tiền thông dụng");
            await convo.say("1.Đô la Mỹ : USD \n 2.Việt Nam Đồng : VND \n 3. Yên Nhật : JPY \n 4.Bảng Anh : EUR \n 5. Đô Úc : AUD \n 6. Nhân dân tệ : CNY \n 7. Baht Thái : THB \n 8. Won Hàn Quốc : KRW \n 9. Đô Singapo : SGD \n 10. Đô la Hồng Công : HKD");                  
      			await convo.say("Bạn muốn đổi từ đồng tiền nào?").then(() => {
                	convo.set("from", payload.message.text);
            	});
            	await convo.say("Và sang đồng tiền ...?").then(() => {
                	convo.set("to", payload.message.text);
            	});
            	await convo.say("Ok. Đổi từ bao nhiêu sang nhỉ?").then(() => {
                	convo.set("num", payload.message.text);
            	});
            	await convo.say("Ok của bạn đây: " + parseInt(num) + from + " bằng " +money(parseInt(num)).from(from).to(to) + to + " nhé~");
            	convo.say("<3");
            	convo.end();
      		});
      	});
    });
};