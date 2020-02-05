const chai = require('chai');
const expect = chai.expect;
const { fork } = require('child_process');
const { setProcessName, sendMessage } = require('../../src/utils/ipc-message');


describe('IPC message functions', () => {
	let testProcessName = 'testProcessName';
	let dummyMessageSourcePath = './tests/utils/dummy-message-source.test'

	before(() => {
	});

	it('should give a name for a process', () => {
		setProcessName(testProcessName);
		expect(process.name).equals(testProcessName);
	});

	it('should throw when type param not provided', () => {
		expect(() => sendMessage()).to.throw();
	});

	it('should receive proper message from child process', (done) => {
		let child = fork(dummyMessageSourcePath);
		child.on('message', message => {
			expect(message).to.include.keys(['source', 'type', 'body']);
			expect(message.source).equals('dummyMessageSource');
			expect(message.type).equals('testMessageType');
			expect(message.body).equals('testMessageBody');
			done();
		});
		child.send('sendDummyMessage');
	});

	after(() => {
	});

});
