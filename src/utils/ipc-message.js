function setProcessName (name) {
	process.name = name;
}

function sendMessage (type, body) {
	if (!type) throw new Error('Message has to have type parameter');

	let message = {
		source: process.name || `${process.title}-PID:${process.pid}`,
		type: type,
		body: body || null
	}

	if (process && process.send) {
		process.send(message);
	} else {
		console.log(JSON.stringify(message, null, 2));
	}
}

module.exports = {
	setProcessName,
	sendMessage
}

