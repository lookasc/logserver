const CONFIG = require('../../config');
const MESSAGE = require('../../message');
const dgram = require('dgram');

class Server {

	constructor(config) {
		this.server = dgram.createSocket('udp4');
		this.ingestBuffer = config.buffer;

		this.server.on('listening', () => {
			let address = this.server.address();
			if (process.send) {
			process.send({
				source: CONFIG.COLLECTOR.PROCESS_NAME,
				message: MESSAGE.LOG,
				params: `Server started. Listening on UDP ${address.address}:${address.port}`
			});}
		});

		this.server.on('error', error => {
			process.send({
				source: CONFIG.COLLECTOR.PROCESS_NAME,
				message: MESSAGE.ERROR,
				params: error
			});
		});

		this.server.on('message', message => {
			this.ingestBuffer.write(message);
		});

		this.server.bind(CONFIG.COLLECTOR.UDP.LISTEN_PORT);
	}

}

module.exports = Server;