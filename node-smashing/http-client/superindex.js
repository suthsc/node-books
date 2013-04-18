var request = require('superagent');
request.get('http://search.twitter.com/search.json')
	.send({
	q: 'justin bieber'
})
	.end(function onResponse(res) {
	console.log(res.body);
});