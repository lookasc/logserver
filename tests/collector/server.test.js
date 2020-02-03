const chai = require('chai');
const expect = chai.expect;
const Server = require('../../src/collector/server');
const { fork } = require('child_process');

const dummyBuffer = {
	activeBuffer: {
		size: 0
	},
	write: function (data) {
		this.activeBuffer.size += data.length;
	}
};

describe('CollectorServer class', () => {
	let server;
	let dummyLogSource;
	let dummyData = 'dummyData';

	before(() => {
		dummyLogSource = fork('./tests/collector/dummy-log-source.test');
		server = new Server({
			buffer: dummyBuffer
		});
	});

	it('should create instance of Server', () => {
		expect(server).to.be.instanceOf(Server);
	});

	it('should have buffer empty', () => {
		expect(server.ingestBuffer.activeBuffer.size).to.equal(0);
	});

	it('should read data through UDP and save to buffer', (done) => {
		dummyLogSource.send({
			command: 'sendDummyLog',
			content: dummyData
		});
		setTimeout(() => {
			expect(server.ingestBuffer.activeBuffer.size).to.equal(dummyData.length);
			done();
		}, 500);
	});

	after(() => {
		dummyLogSource.kill('SIGINT');
		server.server.close(() => {});
	});

});
