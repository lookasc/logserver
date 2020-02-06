require('dotenv').config();
const CONFIG = require('./config');
const MESSAGE = require('./message');
const { fork } = require('child_process');

startProcess(CONFIG.COLLECTOR.PATH);




function startProcess (path) {
	let newProcess = fork(path);
	registerMessageHandlerFor(newProcess);
}

function registerMessageHandlerFor (forkedProcess) {
	forkedProcess.on('message', (message) => {
		catchLogsFrom(message);
		catchErrorsFrom(message);
	});
}

function catchLogsFrom (message) {
	if (message.type === MESSAGE.LOG) console.log(`${message.source}: ${message.body}`);
}

function catchErrorsFrom (message) {
	if (message.type === MESSAGE.ERROR) console.error(`${message.source}: ${message.body}`);
}

