var money = require("money");

module.exports = (from, to, num,convo) => {
  chat.conversation((convo) => {
    (async () => {           
      await convo.say("Ok của bạn đây: " + parseInt(num) + from + " bằng " + money(parseInt(num)).from(from).to(to) + to + " nhé~");
      convo.say("<3");
      convo.end();
    });
  });

};