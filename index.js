const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const appRoutes = require('./routes/index');
require('custom-env').env();

const app = express();
const PORT = process.env.PORT || 3000;

require('./passport-config')(passport);

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Vars
app.use((req, res, next) => {
	res.locals.error = req.flash('error');
	next();
});

app.use(appRoutes);

async function start() {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASS}@cluster0.ai53k.mongodb.net/Type_Training_DB?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useFindAndModify: false,
			}
		);

		app.listen(PORT, () => {
			console.log('Server has been started');
		});
	} catch (e) {
		console.log(e);
	}
}

start();
