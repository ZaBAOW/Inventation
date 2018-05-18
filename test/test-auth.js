'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const {User} = require('../models/users');
const { JWT_SECRET, DATABASE_URL, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth endpoints', function () {
	const username = 'exampleUser';
	const password = 'examplePassword';
	const firstName = 'Example';
	const lastName = 'User';

	before(function () {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	beforeEach(function() {
		return User.hashPassword(password).then(password => User.create({
			username,
			password,
			firstName,
			lastName
		})
		);
	});

	afterEach(function () {
		return User.remove({});
	});

	describe('/', function () {
		it('Should retun a valid auth token', function(){
			return chai.request(app).post('/auth/login')
			.send({username, password})
			.then(res => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('object');
				const token = res.body.authToken;
				expect(token).to.be.a('string');
				const payload = jwt.verify(token, JWT_SECRET, {
					algoritm: ['HS256']
				});
			});
		});
	});
});