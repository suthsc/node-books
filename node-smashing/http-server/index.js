require('http').createServer(function onRequest(req, res) {
	res.writeHead(200, {'Content-Type': 'image/jpg'});

	var stream = require('fs').createReadStream('image.jpg').pipe(res);

}).listen(3000);