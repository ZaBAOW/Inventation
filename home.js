'use strict';
const server = require('./server');
function userCreate() {
	console.log('running user create function');
	const endpoint = 'localhost:8080/users';
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', endpoint, true);
	xhttp.send();
	var response = JSON.parse(xhttp.resonseText);
	console.log(response);
}