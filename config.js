const config = {
	COLLECTOR: {
		PROCESS_NAME: 'collector',
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
		ENABLED: process.env.ENCRYPT_DATA || 'true',
		PASSWORD: process.env.ENCRYPT_PASSWORD || 'testPass',
		PASSWORD_HASH_ALGHORITM: 'sha256',
		ALGORITHM: 'aes-256-cbc',
	}
};

const configForTests = {};

// module.exports = (process.env.NODE_ENV === 'test') ? configForTests : config;
module.exports = config;