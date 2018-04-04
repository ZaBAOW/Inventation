const expect = require('chai').expect;

describe(function() {
	it('should show that 1 = 1', function () {
		const a = 1;
		const b = 1;

		const answer = a + b;

		expect(answer).to.be.true;
	})
})