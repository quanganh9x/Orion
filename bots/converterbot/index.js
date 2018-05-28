var money = require("./currency-convert");

module.exports = function (bot) {
  bot.hear(['đổi', 'convert'], (payload, chat) => {
    chat.conversation((convo) => {
      convo.say("[ConvertBOT] v1.0 xin chào mừng!").then(() => {
        const searchbot = (convo) => {
          convo.ask(() => { }, (payload, convo) => {
            (async () => {
              switch (payload.message.text) {
                case 'tiền':
                  await convo.ask("Đây là các đồng tiền thông dụng", (payload, convo) => {
                    await convo.say("1.Đô la Mỹ : USD \n 2.Việt Nam Đồng : VND \n 3. Yên Nhật : JPY \n 4.Bảng Anh : EUR \n 5. Đô Úc : AUD \n 6. Nhân dân tệ : CNY \n 7. Baht Thái : THB \n 8. Won Hàn Quốc : KRW \n 9. Đô Singapo : SGD \n 10. Đô la Hồng Công : HKD");
                    await convo.ask("Bạn muốn đổi từ đồng tiền nào?", (payload, convo) => {
                      convo.set("from", payload.message.text);
                      await convo.ask("Và sang đồng tiền ...?", (payload, convo) => {
                        convo.set("to", payload.message.text);
                        await convo.ask("Ok. Đổi từ bao nhiêu sang nhỉ?", (payload, convo) => {
                          convo.set("num", payload.message.text);
                        })
                      })
                    });
                    money(from, to, num, convo);
                  });
                  break;
                default:
                  await convo.say("Không có tuỳ chọn này :( Ý bạn là \'tiền\' hoặc ?");
                  break;
              }
              searchbot(convo);
            })();
          });
        };
        searchbot(convo);
      });
    });
  });
};
