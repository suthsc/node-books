var net = require("net");

var count = 0,
	users = {};

var server = net.createServer(function handleConnection(conn) {

	// the nickname for the current connection
	var nickname;

	function broadcast(msg, exceptMyself) {
		for (var i in users) {
			if (!exceptMyself || i != nickname) {
				users[i].write(msg);
			}
		}
	}

	// set the connection encoding
	conn.setEncoding('utf8');

	// handle connection
	console.log('\033[90m	new connection!\033[39m');
	conn.write('\n > welcome to \033[92mnode-chat\033[39m!' +
		'\n > ' + count + ' other people are connected at this time.' +
		'\n > please write your name and press enter: ');
	count++;

	conn.on('data', function onData(data) {

		// remove new line and carriage return
		data = data.replace('\r\n', '');

		// the first piece of data is the nickname
		if (!nickname) {
			if (users[data]) {
				conn.write('\033[93m> nickname already in use. try again:\033[39m  ');
				return;
			} else {
				nickname = data;
				users[nickname] = conn;

				broadcast('\033[90m > ' + nickname + ' joined the room.\033[39m\n');

			}
		} else {
			// otherwise you consider it a chat message
			broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n');
		}

		console.log(data);
	});
	conn.on('close', function onClose() {
		count--;
		delete users[nickname];
		broadcast('\033[90m > ' + nickname + ' left the room.\033[39m\n');
	});
});

server.listen(3000, function startServer() {
	console.log('\033[96m	server listening on *:3000\033[39m');
});