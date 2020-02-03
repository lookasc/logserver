const CONFIG = require('../../config');
const dgram = require('dgram');

var udpClient = dgram.createSocket('udp4');

process.on('message', (message) => {

	if (message.command === 'sendDummyLog') {
		udpClient.send(message.content, 0, message.content.length, CONFIG.COLLECTOR.UDP.LISTEN_PORT, 'localhost', (err) => {
			if (err) throw new Error(err);
		});
	}

});

