require('http').createServer(function onRequest(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Hello');

	setTimeout(function onTimeout() {
		res.end(' <b>World!</b>');
	});

}).listen(3000);