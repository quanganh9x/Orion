const cognitiveServices = require('cognitive-services');
const spellcheck = new cognitiveServices.bingSpellCheckV7({
    apiKey: "2ff21eaca8a94c1da719c24e54289d19",
    endpoint: "api.cognitive.microsoft.com"
});

var parameters = {
    "mode": "proof",
    "mkt": "en-us"
};

module.exports = (convo, intellibot) => {
	(async () => {
		await convo.say('Chú ý: chưa hỗ trợ check lỗi tiếng Việt T_T');
	    await convo.ask('Gửi đoạn văn bản tiếng Anh cần check lên cho mình nhé :x', (payload, convo) => {
	       	convo.set('body', 'text=' + payload.message.text.replace(/ /g, '+'));
	       	spellCheckClient.spellCheck({
			    parameters,
			    body
			}).then(response => {
			    if (response.errors) {
			    	convo.say('Không check được lỗi ><');
			    	intellibot(convo);
			    } else {
			    	for (var i = 0; i < response.flaggedTokens.length; i++) {
			    		var offset = response.flaggedTokens[i].offset;
			    		var wrong = response.flaggedTokens[i].token;
			    		var right = response.flaggedTokens[i].suggestions[0].suggestion;
			    		await convo.say('Phát hiện lỗi ở vị trí thứ ' + offset + ', chữ: "' + wrong + '" nên thay bằng "' + right);
			    		// Đoạn dưới này hơi não, cơ mà thôi cứ thêm vào vì người dùng :>
			    		if(response.flaggedTokens[i].suggestions.length > 1){
			    			var orText = '...hoặc thay bằng: ';
			    			for(var y = 1; y < response.flaggedTokens[i].suggestions.length; y++){
			    				if (y == response.flaggedTokens[i].suggestions.length -1 && y > 1) {
			    					orText += ' hoặc ';
			    				}
			    				orText += '"';
			    				orText += response.flaggedTokens[i].suggestions[y].suggestion;
			    				orText += '"';
			    				if (y == response.flaggedTokens[i].suggestions.length -1) {
			    					orText += '.';
			    				} else orText += ',';
			    			}
			    			convo.say(orText);
			    			intellibot(convo);
			    		}
			    	}
			    }
			});
	    });
	})();
};