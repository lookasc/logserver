require('dotenv').config(); // { path: '.env' }
const CONFIG = require('../../config');
const MESSAGE = require('../../message');
const Server = require('./server');
const { FileBuffer } = require('filebuffer');

process.send({
	source: CONFIG.COLLECTOR.PROCESS_NAME,
	message: MESSAGE.LOG,
	params: 'Starting...'
});

const bufferConfigurtion = {
  dataDir: CONFIG.COLLECTOR.FILES.DIR,
  activeBufferFileExtension: CONFIG.COLLECTOR.FILES.ACTIVE_BUFFER_FILE_EXTENSION,
  inactiveBufferFileExtension: CONFIG.COLLECTOR.FILES.INACTIVE_BUFFER_FILE_EXTENSION,
  activeBufferMaxSize: CONFIG.COLLECTOR.FILES.ACTIVE_BUFFER_MAX_SIZE,
  activeBufferMaxAge: CONFIG.COLLECTOR.FILES.ACTIVE_BUFFER_MAX_AGE,
  allowTimeRollover: true
};

const dataBuffer = new FileBuffer(bufferConfigurtion);

dataBuffer.on('bufferExchange', e => {
	process.send({
		source: CONFIG.COLLECTOR.PROCESS_NAME,
		message: MESSAGE.COLLECTOR.INGESTED_DATA_READY,
		params: e.fileName
	})
});

new Server({
	buffer: dataBuffer 
});