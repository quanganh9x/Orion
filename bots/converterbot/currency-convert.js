var money = require("money");

module.exports = (from, to, num, convo) => {
  chat.conversation((convo) => {
    if (from == undefined) {
      convo.say("Ok của bạn đây: " + money(num).to(to) + to + " nhé~");
    }
    await convo.say("Ok của bạn đây: " + parseInt(num) + from + " bằng " + money(parseInt(num)).from(from).to(to) + to + " nhé~");
    convo.say("<3");
    convo.end();

  });

};