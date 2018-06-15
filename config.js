'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/Inventation';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.SESSION = {
	name: 'session',
	keys: ['key1', 'key2'],
	signed: false,
	cookie: {
		sameSite: 'strict',
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000
	}
}