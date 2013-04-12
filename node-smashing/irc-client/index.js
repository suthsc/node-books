var net = require("net");

var client = net.connect(6667, 'irc.freenode.net');
client.setEncoding('utf8');

client.on('connect', function onConnect() {
	client.write('NICK node-irc-client\r\n');
	client.write('USER node-irc-client 0 * :scott\r\n');
	client.write('JOIN #Node.js\r\n');
});
