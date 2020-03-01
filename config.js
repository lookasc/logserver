const config = {
	COLLECTOR: {
		PATH: './src/collector',
		PROCESS_NAME: 'Collector',
		UDP: {
			LISTEN_PORT: process.env.UDP_LISTEN_PORT || 67,
		},
		FILES: {
			DIR: './data/ingest/',
			ACTIVE_BUFFER_FILE_EXTENSION: 'active',
			INACTIVE_BUFFER_FILE_EXTENSION: 'inactive',
			ACTIVE_BUFFER_MAX_SIZE: process.env.ACTIVE_INGEST_BUFFER_MAX_SIZE || '256k',
			ACTIVE_BUFFER_MAX_AGE: process.env.ACTIVE_INGEST_BUFFER_MAX_AGE || 60
		},
	},
	DECRYPT: {
		PROCESS_NAME: 'Decrypt',
		ENABLED: process.env.DECRYPT_DATA || true,
		PASSWORD: process.env.DECRYPT_PASSWORD || 'testPass',
		PASSWORD_HASH_ALGHORITHM: 'sha256',
		ALGORITHM: 'aes-256-cbc',
		FILES: {
			DIR: './data/decrypt/',
			DECRYPTED_BUFFER_FILE_EXTENSION: 'decrypted',
		}
	}
};

const configForTests = {
	COLLECTOR: {
		PROCESS_NAME: 'collector',
		UDP: {
			LISTEN_PORT: 12121,
		},
		FILES: {
			DIR: './data/ingest/',
			ACTIVE_BUFFER_FILE_EXTENSION: 'active',
			INACTIVE_BUFFER_FILE_EXTENSION: 'inactive',
			ACTIVE_BUFFER_MAX_SIZE: process.env.ACTIVE_INGEST_BUFFER_MAX_SIZE || '256k',
			ACTIVE_BUFFER_MAX_AGE: process.env.ACTIVE_INGEST_BUFFER_MAX_AGE || 60
		},
	},
	DECRYPT: {
		PROCESS_NAME: 'Decrypt',
		ENABLED: process.env.DECRYPT_DATA || true,
		PASSWORD: process.env.DECRYPT_PASSWORD || 'testPass',
		PASSWORD_HASH_ALGHORITHM: 'sha256',
		ALGORITHM: 'aes-256-cbc',
		FILES: {
			DIR: './data/decrypt/',
			DECRYPTED_BUFFER_FILE_EXTENSION: 'decrypted',
		}
	}
};

module.exports = (process.env.NODE_ENV === 'test') ? configForTests : config;