require('http').createServer(function onRequest(req, res) {

	console.log(req.headers);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('Hello <b>World</b>');

}).listen(3000);