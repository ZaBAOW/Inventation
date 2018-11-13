const IMG_UPLOAD_ENDPOINT = "https://api.cloudinary.com/v1_1/zabaow/image/upload";
const API_KEY = "638832767114418";
var n = 0;
var slideIndex = 1;

function apiSignature(timestamp, uid) {
    let signatureString = "public_id=" + uid + "&timestamp=" + timestamp + "KtoSOxrHph-EpcGXUHW3x2eA3MA";
    return $.sha1(signatureString);
}

$('#website-container').on('submit', function (event) {
    event.preventDefault();
    console.log('image upload starting');
    console.log($(this).find('.file-select'));
    const file = $(this).find('.file-select')[0].files[0];
    console.log('file', file);
    uploadImage(file);
    var slides = document.getElementsByClassName("mySlides");
    if(slides.length > 0){
        console.log(slides.length);
        showSlides(n, slideIndex);
    } else {
        console.log(slides);
    }
});

function uploadImage(file) {
    console.log('file = ', file);
    let uid = uuidv1(10);
    let timestamp = new Date().getTime();
    let data = new FormData();

    data.append('file', file);
    data.append('add_tag', uid);
    data.append('timestamp', timestamp);
    data.append('public_id', uid);
    data.append('api_key', API_KEY);
    data.append('signature', apiSignature(timestamp, uid));
    console.log('data =', data);

    $.ajax({
            type: "POST",
            url: IMG_UPLOAD_ENDPOINT,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json'
        })
        .done(function (result) {
            let uploadDataObject = {
                'userImageUrl': result.secure_url,
            }
            // addImageToDb(uploadDataObject);
            var upload_url = result.secure_url;
            var prev = document.getElementsByClassName("prev");
            var next = document.getElementsByClassName("next");
//            saveSession(upload_url);
            prev[0].style.display = "block"
            next[0].style.display = "block"
            var newImageTemplate = "<div class='mySlides fade'><img src='" + result.secure_url + ">";
            var imageNumber = $('.dot-container span').length
            var newDotTemplate = '<span class="dot" onclick="currentSlide(' + imageNumber + ')"></span>'
            $('.slideshow-container').prepend(newImageTemplate);
            $('.dot-container').append(newDotTemplate);
        });
//    $(this).find('.file-select').remove();

}

function plusSlides(n, slideIndex) {
    showSlides(slideIndex += n);
}


function currentSlide(n, slideIndex) {
    showSlides(slideIndex = n);
}



function showSlides(n, slideIndex) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    var prev = document.getElementsByClassName("prev");
    var next = document.getElementsByClassName("next");
    if (slides.length == 0) {
        prev[0].style.display = "none"
        next[0].style.display = "none"
    }
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    for (i = 1; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
        console.log(dots[i].classname);
    }
    console.log(slideIndex);
    slides[slideIndex - 1].style.display = "block";
//    dots[slideIndex - 1].className += " active";
}

//function showSlidesInitial(n, slideIndex) {
//    var i;
//    var slides = $('.mySlides');
//    var x  $('.mySlides');
//    if(n > slides.length) {slideIndex = 1};
//    if(n < 1) {slideIndex = slides.lenght}
//    for(i = 0; i < slides.lenght; i++) {
//        slides[i].style.display = "none";
//    }
//    slides[slideIndex - 1].style.display = "block";
//
//}
