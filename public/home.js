'use strict';
const HOST_NAME = '/users';
function getUsers() {
	console.log('running get user function');
	const endpoint = HOST_NAME;
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', endpoint, true);
	xhttp.send();
	var response = JSON.parse(xhttp.responseText);
	console.log(response);
}

function userCreate() {
	var username = $('.username').val();
	var password = $('.password').val();
	var firstName = $('.firstName').val();
	var lastName = $('.lastName').val();
	const endpoint = '/users';
	console.log('running user create function');
	fetch(endpoint , {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username: username, password: password, firstName: firstName, lastName: lastName})
	})
	.then(function(response) {
		var content = response.json();
		console.log(content);
		return content;
	});

	// const content = await rawResponse.json();

	// console.log(content)
}