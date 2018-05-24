var User = require('../../models/user');
const pwned = require ('haveibeenpwned') ();


module.exports = function (chat) {
	pwned.breachedAccount (email, (err, data) =>{
	User.findOne({id: data.entry.id}, (err, result) =>{
		if (err) throw err;
		var email = result.email;
		console.log(email);

		
			if (err) throw err;
			const count = Object.keys (data).length;
			let i = 1;

			chat.say('Found %i breached', count);
			for (br in data) {
				console.log ('%i %i x', i, data[br]);
				chat.say('%i %i x', i, data[br])
				i++;
			}
			pwned.dataclasses((err, data) =>{
				if (err) throw err;
				for (var i = 0; i < (data).length; i++) {
					chat.say('pastes %i', data[i]);
				}
				

			});
		});
		db.close();
	});
}