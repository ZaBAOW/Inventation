'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/Inventation';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-test';
exports.PORT = process.env.PORT || 8080;