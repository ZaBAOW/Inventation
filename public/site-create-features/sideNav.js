'use strict'


function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
	var newInfoBox = '<div class="info-container storable"><input type="button" class="remove-infoBox" value="&#10006"><textarea class="content" name="content" rows="10" cols="50"></textarea></div><br>';
	$('#website-container').append(newInfoBox);
}

function createCountdown(){
	var newCountDown = '<div class="count-container storable"><input type="button" class="remove-countdown" value="&#10006"><div action="/action_patge.php">Event (date and time):<input type="datetime-local" id = "eventDay" name="eventDay"><button class = "countDownSubmit" name="Send">Submit</button></div><p id="countdown"></p></div>';
	$('#website-container').append(newCountDown);
}

function createSlideShow() {
	var newSlideShow = '<div class="slide-container storable"><div class="slideshow-container"><input type="button" class="remove-slideshow" value="&#10006"><div class="mySlides fade"><div class="numbertext">1 / 1</div><img src="https://i.imgur.com/wYTCtRu.jpg" style="width: 100%"><div class="text">Caption Text</div></div><a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a><div style="text-align: center" class="dot-container"><span class="dot" onclick="currentSlide(1)"></span></div><div class="imageUpload"><div><label>Copy an image url to upload</label><input type="text" class="imageUrl" name="imageUrl" multiple></div><button class = "upload-submit">Submit</button></div></div>';

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
	createInfo();
	const content = {}
	const infoBoxContent = $(".info-container").text();
	const slideShowContent = $(".slide-container").text();
	const countDownContent = $(".count-container").text();
	const selectedDateContent = localStorage.selectedDate;
	content['infoBoxContent'] = infoBoxContent || null;
	content['slideShowContent'] = slideShowContent || null;
	content['countDownContent'] = countDownContent || null;
	content['selectedDateContent'] = selectedDateContent || null;
	console.log(content);
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
	const endpoint = `/session/${id}`;
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
		} else{
			return res.json();
		}
	})
	.then(function(data) {
		console.log('YOUR session has been retrieved');
		const infoBoxContent = data.data.infoBoxContent;
		const slideShowContent = data.data.slideShowContent;
		const countDownContent = data.data.countDownContent;
		const selectedDateContent = data.data.selectedDateContent;
		if(infoBoxContent !== null){
			createInfo();
			$('.content').append(infoBoxContent);
		}
		if(countDownContent !== null){
			createCountdown();
		}
		if(slideShowContent !== null){
			createSlideShow();
		}
		if(selectedDateContent !== null) {
			var eventDate = moment().countdown(selectedDateContent, countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toString();
			var moddedDate = eventDate.replace(/\D+/g, ":");
			var slicedTime = moddedDate.slice(0, moddedDate.length - 1);
			$('.count-container').append('<div class = "time-left">' + slicedTime + '</div>');
		}
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
	checkArea = $('#website-container').html();
	console.log('welcome back')
})


function saveSession() {
	const infoBoxContent = $(".content").val();
	const slideShowContent = $(".slide-container").text();
	const countDownContent = $(".count-container").text();
	const selectedDateContent = localStorage.selectedDate;
	console.log(selectedDateContent);
	const content = {};
	content['infoBoxContent'] = infoBoxContent || null;
	content['slideShowContent'] = slideShowContent || null;
	content['countDownContent'] = countDownContent || null;
	content['selectedDateContent'] = selectedDateContent || null;
	if(content.infoBoxContent === null && content.slideContent === null && content.countContent === null && content.selectedDateContent === null){
		alert('There is nothing to save. Please add a feature before saving');
		return;
	}
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
	.catch(function(err){
		console.log(err);
	})
}

