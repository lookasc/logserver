const CONFIG = require('../../config');
const dgram = require('dgram');


class Server {

	constructor(config) {
		this.server = dgram.createSocket('udp4');
		this.ingestBuffer = config.buffer;

		this.server.on('listening', () => {
			let address = this.server.address();
			console.log(`Collector server started and listen on UDP ${address.address}:${address.port}`);
		});

		this.server.on('error', error => {
			console.log(error);
		});

		this.server.on('message', message => {
			this.ingestBuffer.write(message);
		});

		this.server.bind(CONFIG.COLLECTOR.UDP.LISTEN_PORT);
	}

}

module.exports = Server;