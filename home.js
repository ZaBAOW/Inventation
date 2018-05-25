'use strict';
const HOST_NAME = process.env.HOST_NAME;
function userCreate() {
	console.log('running user create function');
	const endpoint = HOST_NAME;
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', endpoint, true);
	xhttp.send();
	var response = JSON.parse(xhttp.responseText);
	console.log(response);
}