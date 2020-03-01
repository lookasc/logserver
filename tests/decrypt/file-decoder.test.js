const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const CONFIG = require('../../config');
const FileDecoder = require('../../src/decrypt/file-decoder');

describe('FileDecoder class', () => {
	// dummy data encrypted with key 'testPass':
	// dummyDataEncrypted and dummyDataEncrypted2 store the same data
	const dummyDataAsText = 'This is test data to encrypt.';
	const dummyDataEncrypted  = '16a3ad1fa2f81fafec64d4e2a28ffc92ae2ac85e434d89a1af0284b08a78c097d542ba4cd3c32d86bf82d1c062d26a3b';
	const dummyDataEncrypted2 = '789a4e292ee5db297adc86c7a56d8ac137dbae6d506d334e14fd8366351c8baa8c7273ab2a852a253cc9db0699499b78';
	let dummyIngestedFileName;
	let fileDecoder;

	beforeEach(() => {
		dummyIngestedFileName = CONFIG.COLLECTOR.FILES.DIR
			+ (Math.floor(Math.random() * 1000000))
			+ '.'
			+ CONFIG.COLLECTOR.FILES.INACTIVE_BUFFER_FILE_EXTENSION;

		fs.mkdirSync(CONFIG.COLLECTOR.FILES.DIR, { recursive: true });
		fs.writeFileSync(dummyIngestedFileName, dummyDataEncrypted);
		fileDecoder = new FileDecoder(dummyIngestedFileName);
	});

	it('should create instance od FileDecoder', () => {
		expect(fileDecoder).to.be.instanceOf(FileDecoder);
	});

	it('should create "decryptedFileName" file on drive', (done) => {
		setTimeout(() => {
			expect(fs.existsSync(fileDecoder.decryptedFileName)).to.be.true;
			done();
		}, 0);
	});

	it('should properly decrypt data', () => {
		expect(fileDecoder.decrypt(dummyDataEncrypted)).to.equal(dummyDataAsText);
		expect(fileDecoder.decrypt(dummyDataEncrypted2)).to.equal(dummyDataAsText);
	});

	it('should resolve with decryptedFileName', (done) => {
		fileDecoder.decryptFile()
			.then(fileName => {
				expect(fileName).to.equal(fileDecoder.decryptedFileName);
				done();
			});
	});

});