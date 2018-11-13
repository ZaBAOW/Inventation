//var slideIndex = 0;
//var n = 0;
//
//
//function plusSlides(n) {
//    showSlides(slideIndex += n);
//}
//
//
//function currentSlide(n) {
//    showSlides(slideIndex = n);
//}
//
//
//
//function showSlides(n) {
//    var i;
//    var slides = document.getElementsByClassName("mySlides");
//    var dots = document.getElementsByClassName("dot");
//    var prev = document.getElementsByClassName("prev");
//    var next = document.getElementsByClassName("next");
//    if (slides.length == 0) {
//        prev[0].style.display = "none"
//        next[0].style.display = "none"
//    }
//    if (n > slides.length) {
//        slideIndex = 1
//    }
//    if (n < 1) {
//        slideIndex = slides.length
//    }
//    for (i = 0; i < slides.length; i++) {
//        slides[i].style.display = "none"
//    }
//    for (i = 1; i < dots.length; i++) {
//        dots[i].className = dots[i].className.replace(" active", "");
//    }
//    console.log("slideIndex: ", slides[slideIndex - 1]);
//    slides[slideIndex - 1].style.display = "block";
//    dots[slideIndex - 1].className += " active";
//}
//
$(document).on('click', '.remove-slideshow', function () {
    $(this).parent().parent().remove();
});
