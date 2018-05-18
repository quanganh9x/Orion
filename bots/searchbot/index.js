const SEARCH_API = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDjeakB1alo42nS2NNR9xjSK5Zyi2yMiSA&cx=017576662512468239146:omuauf_lfve&q=';
module.exports = function (bot) {
  bot.hear(['search phim'], (payload, chat) => {
    chat.conversation((convo) => {
      convo.question("Bạn muốn tìm phim gì", (payload, convo) => {
        var name = payload.messenge.text;       
        fetch(SEARCH_API + name)
          .then(res => res.json())
          .then(json => {
            chat.say({
              attachment: 'image',
              url: json.data[0].images.fixed_height.url
            });
          });
        convo.say("Link của thím è");
        convo.say(json.data[0].url);
      });
      convo.end(); // trả về thông tin cho người dùng xong thì end conversation
    });
  });
}