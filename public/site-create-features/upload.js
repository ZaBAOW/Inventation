function imageUpload(e) {
	$(document).on('submit', function(e){
		e.preventDefault();


		var selectedFile = document.getElementById('file').files[0];



		// copyFile(selectedFile, uploadPath, function(error) {
		// 	if(error){return console.error(error)};
		// 	console.log('file was copied');
		// });
		
		var newImageTemplate = "<div class='mySlides fade'><div class='numbertext'>4 /4</div><img src='img/" + selectedFile.name + "'><div class='text'>Caption Text</div></div>";

		$('.slideshow-container').append(newImageTemplate);
	});
}