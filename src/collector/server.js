const CONFIG = require('../../config');
const MESSAGE = require('../../message');
const dgram = require('dgram');
const { sendMessage } = require('../utils/ipc-message');

class Server {

	constructor(config) {
		this.server = dgram.createSocket('udp4');
		this.ingestBuffer = config.buffer;

		this.server.on('listening', () => {
			let address = this.server.address();
			sendMessage(MESSAGE.LOG, `Server started. Listening on UDP ${address.address}:${address.port}`);
		});

		this.server.on('error', error => {
			sendMessage(MESSAGE.ERROR, error);
		});

		this.server.on('message', message => {
			this.ingestBuffer.write(message);
		});

		this.server.bind(CONFIG.COLLECTOR.UDP.LISTEN_PORT);
	}

}

module.exports = Server;