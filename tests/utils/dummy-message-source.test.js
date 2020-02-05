const { setProcessName, sendMessage } = require('../../src/utils/ipc-message');

setProcessName('dummyMessageSource');

process.on('message', (message) => {
	if (message === 'sendDummyMessage') {
		sendMessage('testMessageType', 'testMessageBody');
	}
});

