const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const Player = require('./models/Player');

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
			// Match Player name
			Player.findOne({ name: name })
				.then((player) => {
					if (!player) {
						return done(null, false, { message: 'That user is not registered' });
					}
					// Match Password
					if (password == player.password) {
						return done(null, player);
					} else {
						console.log('Pass is incorrect');
						return done(null, false, { message: 'The password is not correct' });
					}
				})
				.catch((err) => console.log(err));
		})
	);

	passport.serializeUser((player, done) => {
		done(null, player.id);
	});

	passport.deserializeUser((id, done) => {
		Player.findById(id, (err, player) => {
			done(err, player);
		});
	});
};
