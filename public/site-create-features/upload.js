$(document).on('click', '.upload-submit', function(event) {
    event.preventDefault();

    var selectedImage = $('.imageUrl').val();
    console.log('verifying url...');
    if(selectedImage.includes('i.imgur.com')){
        console.log('uploading new picture');
        var newImageTemplate = "<div class='mySlides fade'><div class='numbertext'>4 /4</div><img src='" + selectedImage + "' style='max-width:400px'><div class='text'>Caption Text</div></div>";
        var imageNumber = $('.dot-container span').length 
        var newDotTemplate = '<span class="dot" onclick="currentSlide(' + imageNumber + ')"></span>'
    
        $('.dot-container').append(newDotTemplate);
        $('.slideshow-container').append(newImageTemplate);
    } else{
        alert('the url for the image you are trying to upload is invalid. \n' +
                'make sure your url contains "i.imgur.com" instead of "imgur.com"')
    }

});