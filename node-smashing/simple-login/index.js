/**
 * Module dependencies
 */

var connect = require('connect'),
	users = require('./users');

/**
 * Create server
 */

var server = connect(
connect.logger('dev'),
connect.bodyParser(),
connect.cookieParser(),
connect.session({
	secret: 'my app secret'
}),

function returning_user(req, res, next) {
	if ('/' == req.url && req.session.logged_in) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.end('Welcome back, <b>' + req.session.name + '</b>. ' +
			'<a href="/logout">Logout</a>');
	} else {
		next();
	}
},

function anonymous_user(req, res, next) {
	if ('/' == req.url && 'GET' == req.method) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.end([
			'<form action="/login" method="POST">',
			'<fieldset>',
			'<legend>Please Login</legend>',
			'<p>User: <input type="text" name="user"/></p>',
			'<p>Password: <input type="password" name="password"/></p>',
			'<button>Submit</button>',
			'</fieldset>',
			'</form>'].join(''));
	} else {
		next();
	}
},

function user_authentication(req, res, next) {

	console.log(req.body);

	if ('/login' == req.url && 'POST' == req.method) {
		res.writeHead(200);
		if (!users[req.body.user] || req.body.password != users[req.body.user].password) {
			res.end('Bad username/password');
		} else {
			req.session.logged_in = true;
			req.session.name = users[req.body.user].name;
			res.end('Authenticated!');
		}
	} else {
		next();
	}
},

function user_logout(req, res, next) {
	if ('/logout' == req.url) {
		req.session.logged_id = false;
		res.writeHead(200);
		res.end('Logged out!');
	} else {
		next();
	}
});

/**
 * Listen.
 */

server.listen(3000);