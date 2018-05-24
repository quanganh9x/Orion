var mongoose = require('mongoose');
var Model = require('../../models/user');
const pwned = require ('haveibeenpwned') ();


export.checkEmail = function (chat) {
	Model.findOne({id: payload.sender:id}, (err, result) =>{
		if (err) throw err;
		var email = result.email;
		console.log(email);

		pwned.breachedAccount (email, (err, data) =>{
			if (err) throw err;
			const count = Object.keys (data).length;
			let i = 1;

			chat.say('Found %i breached', count);
			for (br in data) {
				console.log ('%i %i x', i, data[br]);
				chat.say('%i %i x', i, data[br])
				i++;
			}
		};
		db.close();
	});
}