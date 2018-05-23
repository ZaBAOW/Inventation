'use strict';
function userCreate() {
	console.log('running user create function');
	const endpoint = 'https://zabaow.github.io/Inventation/users';
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', endpoint, true);
	xhttp.send();
	var response = JSON.parse(xhttp.responseText);
	console.log(response);
}