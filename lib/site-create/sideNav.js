function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
	var newInfoBox = '<textarea class="content" rows="10" cols="50"></textarea><br>';
	$('#website-container').append(newInfoBox);
}

function createCountdown(){
	var newCountDown = '<form action="/action_patge.php">Event (date and time):<input type="datetime-local" name="eventDay"><input onsubmit="return setCountDown()" type="submit" name="Send"></form><p id="countdown"></p>';
	$('#website-container').append(newCountDown);
}

function createSlideShow() {
	var newSlideShow = '<div class="slideshow-container"><div class="mySlides fade"><div class="numbertext">1 / 3</div><img src="https://imgur.com/r/cats/4o6t4C1" style="width: 100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">2 / 3</div><img src="https://imgur.com/r/cats/3lkm9AO" style="width: 100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">3 / 3</div><img src="https://imgur.com/r/cats/VTCP8Cq" style="width: 100%"><div class="text">Caption Text</div></div><a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a></div><br><div style="text-align: center"><span class="dot" onclick="currentSlide(1)"></span><span class="dot" onclick="currentSlide(2)"></span><span class="dot" onclick="currentSlide(3)"></span></div><form method="post" enctype="multipart/form-data"><div><label for="file">Choose an image to upload</label><input type="file" id="file" name="file" multiple></div><div><button onclick="imageUpload()">Upload</button></div></form>';

	$('#website-container').append(newSlideShow);
}
