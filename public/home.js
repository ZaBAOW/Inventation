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

function toLogin() {
    var redirectUrl = "/login.html";
    window.location.replace(redirectUrl)
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
            alert('Either your password is less than 10 characters or your username is already in use.');
            console.log('This username already exists in the database');
            return;
        }
        console.log('Request succeeded with JSON response', data);
        var id = data.id;
        console.log(id);
        localStorage.setItem('userProfile', JSON.stringify(data));
        var redirectUrl = "/login.html";
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
    var userId;
    if(username === '' || password === ''){
        console.log('oops! looks like at least one of the required two fields have been left blank!');
        return;
    }
    fetch('/users/' + username, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log('response data: ', data.user);
        localStorage.setItem('userID', data.user);
    })
    .catch(err => {
        console.log('user retrieval error:', err);
    })

    const endpoint = '/auth/login';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username: username, password: password})
    })
    .then(function(res) {
        console.log(res.status);
        if(res.status === 401) {
            alert('The username and/or password is incorrect.');
            return;
        } if(res.status === 200) {
            return res.json();
        }
    })
    .then(function(data) {
        console.log(data);
        console.log('logging you on!');
        localStorage.setItem('authToken', data.authToken);
        var redirectUrl = "/create.html"
        window.location.replace(redirectUrl);
    })
    .catch(err => {
        console.log("user login error ", err);
    });
}

function getJwt(res) {
    console.log('retrieving client jwt...')
    const endpoint = '/auth/protected';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'
        },
        credentials: 'include'
    })
    .then(function(res) {
        console.log('got the jwt');
        console.log(res);
    })
    .catch(err => {
        console.log('jwt retrieval error', err);
    });
}
