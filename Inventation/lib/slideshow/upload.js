function imageUpload() {
	var selectedFile = document.getElementById('file').files[0];
	
	var newImageTemplate = "<div class='mySlides fade'><div class='numbertext'>4 /4</div><img src='" + selectedFile + "'><div class='text'>Caption Text</div></div>";

	document.getElementByClassName('slideshow-container').append(newImageTemplate);
}