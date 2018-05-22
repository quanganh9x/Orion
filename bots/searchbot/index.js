const request = require('request');
const GOOGLE_API = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDjeakB1alo42nS2NNR9xjSK5Zyi2yMiSA&cx=010163171448574847880:qglriqbcnk4&fields=items(title,link)&hl=vi&num=5&q=";

module.exports = function (bot) {
  bot.hear(['tìm phim', 'kiếm phim', 'phim'], (payload, chat) => {
      chat.conversation((convo) => {
      const answer = (payload, convo) => {
          let text = payload.message.text;
          convo.say("Chờ xíu để mình tìm nhen...").then(() => {
              request(GOOGLE_API + "xem+phim+" + text.replace(" ", "+"), function (error, response, body) {
                  if (response && response.statusCode === 200) {
                      body = JSON.parse(body);
                      for (let i = 0; i < body.items.length; i++) {
                          if (body.items[i].link.includes("phimmoi.net")) {
                              body.items[i].link.replace("phimmoi.net","phi**oi.net");
                          }
                          chat.say(body.items[i].title + "\n" + body.items[i].link);
                      }
                  } else chat.say(":( không có link rùi bạn ơi");
                  convo.end();
              });
          });
      };
      convo.ask("Bạn muốn tìm phim gì?", answer);
      });
  });
};