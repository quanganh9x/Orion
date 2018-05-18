const GOOGLE_API = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDjeakB1alo42nS2NNR9xjSK5Zyi2yMiSA&cx=010163171448574847880:qglriqbcnk4&fields=items(title,link)&hl=vi&q=";
module.exports = function (bot) {
  bot.hear(['search phim'], (payload, chat) => {
    chat.conversation((convo) => {
      convo.question("Bạn muốn tìm phim gì", (payload, convo) => {
        var searchName = payload.messenge.text;
        var newName = searchName.replace(" ", "+");
        fetch(GOOGLE_API + "xem+phim+" + newName)
          .then(res => res.json())
          .then(json => {
            for (var i = 0; i <= 4; i++) {
              chat.say({
                title: json.items[i].title,
                link: json.items[i].link
              });
            }
          });
        convo.say("Phim bạn tìm nè");
        
      });
      convo.end(); // trả về thông tin cho người dùng xong thì end conversation
    });
  });
}