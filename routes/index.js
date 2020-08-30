const { Router } = require('express');
const router = Router();
const passport = require('passport');
const Player = require('../models/Player');
const { isLoged } = require('../auth');

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/game-start',
		failureRedirect: '/login',
		failureFlash: true,
	})(req, res, next);
});

router.post('/register', (req, res) => {
	const { name, password } = req.body;
	let error;
	if (error) {
		res.render('/login', {
			error,
			name,
			password,
		});
	} else {
		Player.findOne({ name: name }).then((player) => {
			if (player) {
				error = 'This name already exists';
				res.render('register', {
					error,
					name,
					password,
				});
			} else {
				const newPlayer = new Player({
					name,
					password,
				});
				newPlayer
					.save()
					.then((player) => {
						req.flash('succes_msg', 'You are now registered and you can play');
						res.redirect('/login');
					})
					.catch((err) => console.log(err));
			}
		});
	}
});

router.get('/game-start', isLoged, (req, res) => {
	res.render('game-start');
});

module.exports = router;
