/**
* Module requirement
*/

var express = require('express'),
	search = require('./search');

/**
* create app
*/

var app = express();

/**
* Configuration
*/

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});

/**
* Routes
*/

app.get('/', function get_root(req, res, next) {
	res.render('index');
});

app.get('/search', function do_search(req, res, next) {
	search(req.query.q, function (err, tweets) {
		if (err) return next(err);
		res.render('search', {results: tweets, search: req.query.q });
	});
});

/**
* Listen
*/
app.listen(3000);
