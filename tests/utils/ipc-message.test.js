const chai = require('chai');
const expect = chai.expect;
const { fork } = require('child_process');
const { setProcessName, sendMessage } = require('../../src/utils/ipc-message');


describe('IPC message functions', () => {
	let testProcessName = 'testProcessName';

	before(() => {
	});

	it('should give a name for a process', () => {
		expect(process).to.not.include.keys(['name']);
		setProcessName(testProcessName);
		expect(process).to.include.keys(['name']);
		expect(process.name).equals(testProcessName);
	});

	after(() => {
	});

});
