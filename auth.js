module.exports = {
	isLoged: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash('error', 'Please, log in to play');
		res.redirect('/login');
	},
};
