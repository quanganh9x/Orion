const GOOGLE_API = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDjeakB1alo42nS2NNR9xjSK5Zyi2yMiSA&cx=010163171448574847880:qglriqbcnk4&fields=items(title,link)&hl=vi&q=";
module.exports = function (bot) {
  bot.hear(['search phim'], (payload, chat) => {
    chat.conversation((convo) => {
      convo.question("Bạn muốn tìm phim gì", (payload, convo) => {
        var searchName = payload.messenge.text;
        var newName = name.replace(" ", "+");
        fetch(GOOGLE_API + "xem+phim+" + newName)
          .then(res => res.json())
          .then(json => {
            chat.say({
              title: json.items[0].title,
              link : json.items[0].link
            });
          });
        convo.say("Phim bạn tìm nè");
        convo.say(json.data[0].url);
      });
      convo.end(); // trả về thông tin cho người dùng xong thì end conversation
    });
  });
}