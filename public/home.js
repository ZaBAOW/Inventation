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
	var url = $('.url').val();
	const endpoint = '/users';
	console.log('running user create function');
	fetch(endpoint , {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username: username, password: password, firstName: firstName, lastName: lastName})
	})
	.then(res => res.json())
	.then(function(data) {
		if(data.code === 422) {
			console.log('This username already exists in the database');
			return;
		}
		console.log('Request succeeded with JSON response', data);
		var id = data.id;
		console.log(id);
		localStorage.setItem('userProfile', JSON.stringify(data));
		var redirectUrl = JSON.parse(localStorage.userProfile).url;
		window.location.replace(redirectUrl);
	});
}

function userRemove() {
	if(localStorage.userProfile === undefined) {
		console.log('Sorry there was no profile to delete');
		return;
	}
	var userId = JSON.parse(localStorage.userProfile).id;
	console.log('running user remove function')
	const endpoint = '/users/' + userId;
	fetch(endpoint , {
		method: 'DELETE',
		headers: {
			'Accept': 'applicaltion/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({message: 'we have remove the profile with id: ' + userId})
	})
	.then(function(res) {
		console.log('user removal successful');
		console.log(res);
	});

	localStorage.clear();
}

function userLogin() {
	var username = $('.username').val();
	var password = $('.password').val();
	const endpoint = '/login';
	fetch(endpoint, {
		method: 'POST',
		headers: {
			'Accept': 'application/json,',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({message: 'user is being logged in'})
	})
	.then(function(res) {
		console.log('user has logged on');
		console.log(res);
	});
}