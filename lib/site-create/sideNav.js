'use strict'
$(document).ready(function() {
	
	if(localStorage.site !== null){
		$('#website-container').append(localStorage.site);
	}
})

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
	var newInfoBox = '<div class="infobox-container storable"><input type="button" class="remove-infoBox" value="&#10006"><textarea class="content" name="content" rows="10" cols="50"></textarea></div><br>';
	$('#website-container').append(newInfoBox);
}

function createCountdown(){
	var newCountDown = '<div class="countdown-container storable"><input type="button" class="remove-countdown" value="&#10006"><form action="/action_patge.php">Event (date and time):<input type="datetime-local" name="eventDay"><button onsubmit="return setCountDown()" name="Send">Submit</button></form><p id="countdown"></p></div>';
	$('#website-container').append(newCountDown);
}

function createSlideShow() {
	var newSlideShow = '<div class="slideshow storable"><input type="button" class="remove-slideshow" value="&#10006"><div class="slideshow-container"><div class="mySlides fade"><div class="numbertext">1 / 3</div><img src="#" style="width: 100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">2 / 3</div><img src="https://imgur.com/r/cats/3lkm9AO" style="width: 100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">3 / 3</div><img src="https://imgur.com/r/cats/VTCP8Cq" style="width: 100%"><div class="text">Caption Text</div></div><a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a></div><br><div style="text-align: center"><span class="dot" onclick="currentSlide(1)"></span><span class="dot" onclick="currentSlide(2)"></span><span class="dot" onclick="currentSlide(3)"></span></div><form method="post" enctype="multipart/form-data"><div><label for="file">Choose an image to upload</label><input type="file" id="file" name="file" multiple></div><div><button onclick="imageUpload()">Upload</button></div></form></div>';

	$('#website-container').append(newSlideShow);
}

$(document).on('click', '.preview-btn' , function() {
	var currentSession = $("#website-container:not('.preview-btn-container')").html();
	localStorage.site = currentSession;
})

function returnHome () {
	window.location.replace("http://localhost:8080/homePage.html");
}

function saveSession() {
	var content = $('website-container').find('storable').html();
	const endpoint = '/session';
	fetch(endpoint, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({content: content})
	})
	.then((res) => res.json())
	.then(function(data) {
		console.log('session succesfully saved');
	})
}