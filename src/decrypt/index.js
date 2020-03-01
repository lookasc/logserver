require('dotenv').config(); // { path: '.env' }
const CONFIG = require('../../config');
const MESSAGE = require('../../message');
const { setProcessName, sendMessage } = require('../utils/ipc-message');

setProcessName(CONFIG.DECRYPT.PROCESS_NAME);
sendMessage(MESSAGE.LOG, 'Starting...');

process.on('message', (message) => {
	if (message.type === MESSAGE.DECRYPT.FILE_TO_DECRYPT) {
		
	}
});