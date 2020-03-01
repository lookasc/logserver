const CONFIG = require('../../config');
const { createReadStream, createWriteStream } = require('fs');
const { createInterface } = require('readline');
const crypto = require('crypto');

const DECRYPT_KEY = crypto
	.createHash(CONFIG.DECRYPT.PASSWORD_HASH_ALGHORITM)
	.update(CONFIG.DECRYPT.PASSWORD)
	.digest();

class FileDecoder {

	constructor(fileName) {
		this.inputFileName = fileName;
		this.decryptedFileName = `${this.inputFileName}.${CONFIG.DECRYPT.FILES.DECRYPTED_BUFFER_FILE_EXTENSION}`;
		this.decryptedFileStream = createWriteStream(this.decryptedFileName);
	}

	decryptFile() {
		let lineByLineReader = createInterface({
			input: createReadStream(this.inputFileName),
			crlfDelay: Infinity
		});

		lineByLineReader.on('line', (line) => {
			this.decryptedFileStream.write(`${this.decrypt(line)}\n`);
		});

		return new Promise(resolve => {
			lineByLineReader.on('close', () => {
				resolve(this.decryptedFileName);
			});
		});
	}

	decrypt(data) {
		const iv = data.slice(0, 16);
		const encryptedData = data.slice(16);		
		let decipher = crypto.createDecipheriv(CONFIG.DECRYPT.ALGORITHM, Buffer.from(DECRYPT_KEY), iv);
		let decrypted = decipher.update(encryptedData);
		decrypted = Buffer.concat([decrypted, decrypted.final()]);
		return `${decrypted}`;
	}

}

module.exports = FileDecoder;