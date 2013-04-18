/**
 * Module Dependencies
 */

var connect = require('connect');

/**
 * Create Server.
 */

var server = connect.createServer();

/**
 * Handle Static Files.
 */

server.use(connect.static(__dirname + '/website'));

/**
 * Listen.
 */

server.listen(3000);
