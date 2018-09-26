'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://Zabel:willyb1234@ds233739.mlab.com:33739/inventation';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://demo:willyb1234@ds113853.mlab.com:13853/inventationtest';
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
