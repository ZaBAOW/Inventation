'use strict'


function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
	var newInfoBox = '<div class="feature-container storable"><input type="button" class="remove-infoBox" value="&#10006"><textarea class="content" name="content" rows="10" cols="50"></textarea></div><br>';
	$('#website-container').append(newInfoBox);
}

function createCountdown(){
	var newCountDown = '<div class="feature-container storable"><input type="button" class="remove-countdown" value="&#10006"><form action="/action_patge.php">Event (date and time):<input type="datetime-local" name="eventDay"><button onsubmit="return setCountDown()" name="Send">Submit</button></form><p id="countdown"></p></div>';
	$('#website-container').append(newCountDown);
}

function createSlideShow() {
	var newSlideShow = '<div class="feature-container storable"><input type="button" class="remove-slideshow" value="&#10006"><div class="slideshow-container"><div class="mySlides fade"><div class="numbertext">1 / 3</div><img src="#" style="width: 100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">2 / 3</div><img src="https://imgur.com/r/cats/3lkm9AO" style="width: 100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">3 / 3</div><img src="https://imgur.com/r/cats/VTCP8Cq" style="width: 100%"><div class="text">Caption Text</div></div><a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a></div><br><div style="text-align: center"><span class="dot" onclick="currentSlide(1)"></span><span class="dot" onclick="currentSlide(2)"></span><span class="dot" onclick="currentSlide(3)"></span></div><form method="post" enctype="multipart/form-data"><div><label for="file">Choose an image to upload</label><input type="file" id="file" name="file" multiple></div><div><button onclick="imageUpload()">Upload</button></div></form></div>';

	$('#website-container').append(newSlideShow);
}

$(document).on('click', '.preview-btn' , function() {
	var currentSession = $("#website-container:not('.preview-btn-container')").html();
	localStorage.site = currentSession;
})

function returnHome () {
	window.location.replace("/homePage.html");
}


function createSession() {
	var content = $('#website-container').html();
	console.log(content);
	if(content === ""){
		createInfo();
		content = $('#website-container').html();
	}
	const endpoint = '/session/protected';
	const requestData = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.authToken
		},
		body: JSON.stringify({content: content})
	};
	fetch(endpoint, requestData)
	.then(function(res){return res.json();})
	.then(function(data) {
		if(data.code === 500) {
			console.log(data.message.message);
			return;
		}
		console.log(data.id);
		console.log('session succesfully created');
		localStorage.setItem('sessionId', data.id);
		if(data.code === 500){
			console.log('there is a duplicate of your session.')
		}
	})
	.catch(function(err) {
		console.log(err);
	});
}
function retrieveSession() {
	const endpoint = '/session'
	const requestData = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.authToken 
		},
		credentials: 'same-origin'
	}
	fetch(endpoint, requestData)
	.then(function(res) {
		console.log('sessions retrieved!');
	})
	.catch(function(error) {
		console.log(error);
	});
}

function retrieveSessionById() {
	const id = localStorage.sessionId;
	if(id === undefined) {
		var r = confirm("We could not find your session.\n" + "Would you like to create a session?" );
		if(r === true){
			createSession();
			return;
		} else{
			return;
		}
	}
	const endpoint = `/session/` + id;
	const requestData = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	}
	fetch(endpoint, requestData)
	.then(function(res) {
		if(res.code === 404){
			var r = confirm("We could not find your session.\n" + "Would you like to create a session?" );
			if(r === true){
				createSession();
			} else{
				return;
			}
		}
		return res.json();
	})
	.then(function(data) {
		console.log('YOUR session has been retrieved');
		const loadContent = data.data.content;
		$('#website-container').append(loadContent);
	})
	.catch(function(err) {
		console.log(err);
	});
}

function authValid() {
	var authCheck = localStorage.getItem('authToken');
	if(authCheck === "undefined" && authCheck !== null){
		window.location.replace("/login.html");
	}
	else if(authCheck !== "undefined" && authCheck === null){

		window.location.replace("/login.html");
	}
	else {
		console.log('Validation of authToken successfull');
	}
}

$(document).ready(function() {
	authValid();
	retrieveSessionById()
	var checkArea = $('#website-container').html()
	// if(localStorage.sessionId === "undefined") {
	// 	createSession();
	// }
	// else if(checkArea === ""){
	// 	createSession();
	// }
	checkArea = $('#website-container').html();
	console.log('welcome back')
})


function saveSession() {
	const content = $('#website-container').not('.preview-btn-container').html();
	const id = localStorage.sessionId;
	const endpoint = `/session/${id}`;
	const requestData = {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({content: content})
	};
	fetch(endpoint, requestData)
	.then(function(data) {
		alert('session succesfully saved');
		console.log('session succesfully saved');
	})
}

