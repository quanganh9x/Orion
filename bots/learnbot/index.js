var client = require('node-wolfram');
var wolfram = new client('9WTJXY-KEKYY3AGXQ');
var translator = require('google-translator');

module.exports = function (bot) {
  	bot.hear(['learn'], (payload, chat) => {
      	chat.conversation((convo) => {
      		(async ()=>{
      			convo.say("Bạn muốn biết gì nè?").then(() => {
                	var text = payload.message.text;
                	translator('vi' ,'en' ,text ,response => {
				    	// if(response.isCorrect==false){
				     //  		convo.ask('Mình không hiểu? Ý bạn là : %s phải không?',response.text).then(() => {
				      			// How to xử lí tiếp???
				     //  		});
				   		// }
				   		wolfram.query(response.text, function(err, result) {
						    if(err){
						        convo.say("Không hỏi được bác Wolfram???");
						    }
						    else{
						        for(var a=0; a<result.queryresult.pod.length; a++){
						            var pod = result.queryresult.pod[a];
						            translator('en', 'vi', pod.$.title, response => {
						            	var title = response.text;
						            	await convo.say(title);
						            });
						            for(var b=0; b<pod.subpod.length; b++){
						                var subpod = pod.subpod[b];
					                	for(var c=0; c<subpod.plaintext.length; c++){
						                    var subpodText = subpod.plaintext[c];
						                    if (subpodText == "") {
						                    	continue;
						                    }
						                    translator('en', 'vi', subpodText, response => {
						                    	await convo.say(response.text);
						                    });
						                }
						                for(var d=0; d<subpod.img.length; d++){
						                    var subpodImageURL = subpod.img[d].$.src;
						                    if (subpodImageURL == "") {
						                    	continue;
						                    }
						                    await convo.sendAttachment('image', subpodImageURL);
						                }
						            }
						        }
						    }
						});
					});
            	});
            	convo.say("Văn mình hơi lủng củng tẹo bạn thông cảm nhé ;p");
            	convo.end();
      		});
      	});
  	});
};