const SPEAKER_RECOGNITION_API = "https://westus.api.cognitive.microsoft.com/spid/v1.0/";
const request = require('request');
var toWav = require('audiobuffer-to-wav');
var xhr = require('xhr');
var context = new AudioContext();

module.exports = (convo, intellibot, profileId) => {
	(async() => {
		if(profileId == null){
			convo.say("Hình như bạn chưa có tài khoản... Đợi mình chút xíu để bắt đầu tạo tài khoản mới nhé :p");
			await request.post({
				url: SPEAKER_RECOGNITION_API + 'verificationProfiles',
				headers: {
					'Content-type': 'application/octet-stream',
					'Ocp-Apim-Subscription-Key': 'f37cf47fdc0e4bbabf22a7d3b4bec2d2'
				},
				body: JSON.stringify({
					"locale": "en-US"
				})
			}, (error, response, body) => {
				convo.set('profileId', JSON.parse(body).verificationProfileId);
			});
			await convo.say("Ok, giờ bạn nói 3 lần câu này nhé, gửi lên qua 3 file khác nhau")
			await convo.ask("'apple juice tastes funny after toothpaste'", (payload, convo) => {
		        for (var i = 0; i < 3 /*hoặc payload.message.attachments.length idk*/ ; i++) {
		        	if (payload.message.attachments[i].type === 'audio') {
			        	xhr({
						  	uri: payload.message.attachments[i].payload.url,
						  	responseType: 'arraybuffer'
						}, function (err, body, resp) {
						  	if (err) throw err
						  	context.decodeAudioData(resp, function (buffer) {
							    var wav = toWav(buffer);
							    await request.post({
									url: SPEAKER_RECOGNITION_API + 'verificationProfiles/' + profileId + '/enroll',
									parameters: {
										'verificationProfileId': profileId
									},
									headers: {
										'Content-type': 'application/octet-stream',
										'Ocp-Apim-Subscription-Key': 'f37cf47fdc0e4bbabf22a7d3b4bec2d2'
									},
									encoding: null,
									body: wav
								}, (error, response, body) => {
									body = JSON.parse(body);
									convo.say('Còn ' + body.remainingEnrollments + ' lượt gửi lên.');
									if(body.remainingEnrollments == 0){
										convo.say('Đăng kí thành công! Bạn vui lòng thoát ra để xác minh giọng nói nhé');
										intellibot(convo);
									}
								});
						  	})
						})
			        }
		        }
		    });
		} else {
			await convo.say("Bạn có tài khoản rồi, giờ xác minh giọng nói nèo");
			await convo.say("Nói lại câu này giúp mình nhé")
			await convo.ask("'apple juice tastes funny after toothpaste'", (payload, convo) => {
		        if (payload.message.attachments[0].type === 'audio') {
		        	xhr({
					  	uri: payload.message.attachments[0].payload.url,
					  	responseType: 'arraybuffer'
					}, function (err, body, resp) {
					  	if (err) throw err
					  	context.decodeAudioData(resp, function (buffer) {
						    var wav = toWav(buffer);
						    await request.post({
								url: SPEAKER_RECOGNITION_API + 'verify',
								parameters: {
									'verificationProfileId': profileId
								},
								headers: {
									'Content-type': 'application/octet-stream',
									'Ocp-Apim-Subscription-Key': 'f37cf47fdc0e4bbabf22a7d3b4bec2d2'
								},
								encoding: null,
								body: wav
							}, (error, response, body) => {
								body = JSON.parse(body);
								if(body.result == "Accept"){
									await convo.say("Chúc mừng! Giọng trong file ghi âm bạn vừa gửi lên giống với dữ liệu chúng mình đã có!");
									await convo.say('Độ chính xác: ' + body.confidence);
								} else if (body.result == "Reject"){
									await convo.say("Không trùng khớp! Bạn là ai? Bạn đã làm gì với người dùng rồi???"); 
								}
							});
					  	})
					})
		        }
		    });
		    intellibot(convo);
		}
	})();
};




 


