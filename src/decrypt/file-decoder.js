const CONFIG = require('../../config');
const { createReadStream, createWriteStream } = require('fs');
const { createInterface } = require('readline');
const crypto = require('crypto');

const DECRYPT_KEY = crypto
	.createHash(CONFIG.DECRYPT.PASSWORD_HASH_ALGHORITHM)
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
		const iv = Buffer.from(data.slice(0, 32), 'hex');
		const encryptedData = data.slice(32);	
		let decipher = crypto.createDecipheriv(CONFIG.DECRYPT.ALGORITHM, Buffer.from(DECRYPT_KEY), iv);
		let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return `${decrypted}`;
	}

}

module.exports = FileDecoder;