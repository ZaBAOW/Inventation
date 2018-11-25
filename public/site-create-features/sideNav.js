'use strict'

var timeoutInMiliseconds = 3600000;
var timeoutId;
var n = 0;
var slideIndex = 1;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function displayMessage(message) {
    $("#message-box span").html(message);
    $("#message-box").fadeIn();
    $("#message-box").fadeOut(5000);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
    if($('.info-container').length == 1) {
        $('.info-container')[0].remove();
    }
    var newInfoBox = "";
    newInfoBox += `<div class="info-container storable">`;
    newInfoBox += `<input type="button" class="remove-infoBox" value="&#10006">`;
    newInfoBox += `<textarea aria-label="info-box-content" class="info-box-content" name="content" rows="10" cols="50" placeholder="Enter some information about your event">`;
    newInfoBox += `</textarea>`;
    newInfoBox += `</div>`;
    $('#website-container').append(newInfoBox);
}

function createCountdown() {
    if($('.count-container').length == 1) {
        $('.count-container')[0].remove();
    }
    var newCountdown = "";
    newCountdown += `<div class="count-container storable">`;
    newCountdown += `<input type="button" class="remove-countdown" value="&#10006">`;
    newCountdown += `<div class="date-selector" action="/action_patge.php">`;
    newCountdown += `Event (date and time):`;
    newCountdown += `<input aria-label="eventDay" type="datetime-local" class="eventDay" name="eventDay">`;
    newCountdown += `<button class = "countDownSubmit" name="Send">`;
    newCountdown += `Submit`;
    newCountdown += `</button>`;
    newCountdown += `</div>`;
    newCountdown += `<p class="countdown-description">`;
    newCountdown += `(Hours) (Minutes) (Seconds)`;
    newCountdown += `</p>`;
    newCountdown += `</div>`;
    $('#website-container').append(newCountdown);
}


function createSlideShow() {
    if($('.slide-container').length == 1) {
        $('.slide-container')[0].remove();
    }
    var newSlideShow = ""
    newSlideShow += `<div class="slide-container storable"><div class="slideshow-container">`;
    newSlideShow += `<input type="button" class="remove-slideshow" value="&#10006">`;
    newSlideShow += `<a class="prev" onclick="prevSlide()">&#10094;`;
    newSlideShow += `</a>`;
    newSlideShow += `<a class="next" onclick="nextSlide()">&#10095;`;
    newSlideShow += `</a>`;
    newSlideShow += `<div style="text-align: center" class="dot-container">`;
    newSlideShow += `</div>`;
    newSlideShow += `<div class="imageUpload">`;
    newSlideShow += `<div>`;
    newSlideShow += `<input aria-label="file-select" name="file" type="file" class="file-select" data-cloudinary-field="image_id" data-form-data="{ "transformation": {"crop":"limit","tags":"samples" "width":3000,"height":2000}}"/>`;
    newSlideShow += `</div><button class = "upload-submit">`;
    newSlideShow += `Submit`;
    newSlideShow += `</button>`;
    newSlideShow += `</div>`;
    newSlideShow += `</div>`;
    $('#website-container').append(newSlideShow);
}

$(document).on('click', '.preview-btn', function () {
    var currentSession = $("#website-container:not('.preview-btn-container')").html();
    localStorage.site = currentSession;
})

function returnHome() {
    var r = confirm('Are you sure you want to sign out? \n' + 'any unsaved changes will be lost.');
    if (r === true) {
        window.location.replace("/homePage.html");
    } else {
        return
    }
}


function createSession() {
    createInfo();
    const content = {}
    const infoBoxContent = $(".info-container").text();
    const slideShowContent = []
    const countDownContent = $(".count-container").text();
    const selectedDateContent = localStorage.selectedDate;
    content['infoBoxContent'] = infoBoxContent || null;
    content['slideShowContent'] = slideShowContent || null;
    content['countDownContent'] = countDownContent || null;
    content['selectedDateContent'] = selectedDateContent || null;
    const endpoint = '/session';
    const requestData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.authToken
        },
        body: JSON.stringify({
            content: content
        })
    };
    fetch(endpoint, requestData)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (data.code === 500) {
                console.log(data.message.message);
                return;
            }
            console.log("session id: ", data.id);
            displayMessage('session succesfully created');
            localStorage.setItem('sessionId', data.id);
            if (data.code === 409) {
                console.log('there is a duplicate of your session.')
                displayMessage('You already have a session stored, your good to go');
            }
        })
        .catch(function (err) {
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
        .then(function (res) {
            console.log('sessions retrieved!');
        })
        .catch(function (error) {
            console.log(error);
        });
}

function retrieveSessionById() {
    const userId = localStorage.userID;
    const endpoint = `/session/${userId}`;
    const requestData = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }
    fetch(endpoint, requestData)
        .then(function (res) {
            if (res.code === 404) {
                var r = confirm("We could not find your session.\n" + "Would you like to create a session?");
                if (r === true) {
                    createSession();
                } else {
                    return;
                }
            } else {
                return res.json();
            }
        })
        .then(function (data) {
            if(data.data == null) {
                var r = confirm("You have not created a session yet.\n" + "Would you like to create a session?");
                if (r === true) {
                    createSession();
                } else {
                    return;
                }
            }
            localStorage.setItem('sessionId', data.data._id);
            displayMessage('YOUR session has been retrieved');
            const infoBoxContent = data.data.infoBoxContent;
            const slideShowContent = data.data.slideShowContent;
            const countDownContent = data.data.countDownContent;
            const selectedDateContent = data.data.selectedDateContent;
            if (infoBoxContent !== null) {
                createInfo();
                $('.info-box-content').append(infoBoxContent);
            }
            if (countDownContent !== null) {
                createCountdown();
            }
            if (slideShowContent.length !== 0) {
                createSlideShow();
                var i;
                for (i = 0; i < slideShowContent.length; i++) {
                    console.log(slideShowContent[i].image);
                    var image = slideShowContent[i].image;
                    var imageNumber = $('.dot-container span').length;
                    var newImageTemplate = "<div class='mySlides image" + imageNumber + " fade'></div>";
                    var newImage = "<img class='slide-image' src='" + image + "'>";
                    var newDotTemplate = '<span class="dot" onclick="currentSlide(' + imageNumber + ')"></span>';
                    $('.dot-container').append(newDotTemplate);
                    $('.slideshow-container').prepend(newImageTemplate);
                    $(`.mySlides.image${imageNumber}`).append(newImage);
                }
            }
            if (selectedDateContent !== null) {
                var eventDate = moment().countdown(selectedDateContent, countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toString();
                var moddedDate = eventDate.replace(/\D+/g, ":");
                var slicedTime = moddedDate.slice(0, moddedDate.length - 1);
                $('.count-container').append('<div class = "time-left">' + slicedTime + '</div>');
            }
        })
        .catch(function (err) {
            console.log(err);
        });
//    alert('done retrieving session');
}

function authValid() {
    var authCheck = localStorage.getItem('userID');
    if (authCheck === "undefined" && authCheck !== null) {
        window.location.replace("/login.html");
    } else if (authCheck !== "undefined" && authCheck === null) {
        alert('We could not find your user ID\n you will be returned to the login page to login');
        window.location.replace("/login.html");
    } else {
        console.log('Validation of authToken successfull');
    }
}

function saveSession(upload_url) {
    const infoBoxContent = $(".info-box-content").val();
    var slideShowContent = "";
    var slides = document.getElementsByClassName('mySlides');
    if(slides.length == 0 && upload_url == undefined) {
        slideShowContent = [];
    } else if (slides.length != 0 && upload_url == undefined) {
        slideShowContent = [];
        for(var i = 0; i < slides.length; i++) {
            var image = slides[i].children[0].src;
            console.log(image);
            slideShowContent.push(image);
        }
        console.log(slideShowContent);
    } else {
        slideShowContent = upload_url;
    }
    const countDownContent = $(".count-container").text();
    const selectedDateContent = localStorage.selectedDate;
    console.log(selectedDateContent);
    const content = {};
    content['infoBoxContent'] = infoBoxContent || null;
    content['slideShowContent'] = slideShowContent || null;
    content['countDownContent'] = countDownContent || null;
    content['selectedDateContent'] = selectedDateContent || null;
    if (content.infoBoxContent === null && content.slideContent === null && content.countContent === null && content.selectedDateContent === null) {
        displayMessage('There is nothing to save. Please add a feature before saving');
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
        body: JSON.stringify({
            content: content
        })
    };
    fetch(endpoint, requestData)
        .then(function (data) {
            displayMessage('session succesfully saved');
            console.log('session succesfully saved');
        })
        .catch(function (err) {
            console.log(err);
        })
}

function previewSession() {
    console.log('creating new preview');
    $('.preview-seperator').remove();
    $('.preview-container').remove();
    $('.create-body').append("<hr class='preview-seperator'>");

    const previewInfo = $(".info-box-content").val();
    const previewCountdown = $(".time-left").text();

    $('.create-body').append("<div class='preview-container'></div>");
    $('.preview-container').append("<div class='info-preview-container'></div>");
    $('.info-preview-container').append("<span class='info-preview-content'></span>");
    $('.preview-container').append("<div class='countdown-preview-container'></div>");
    $('.preview-container').append("<div class='slideshow-preview-container'></div>");


    if(previewInfo == undefined) {
        $('.info-preview-content').append('There currenlty no event information on your site.  Make sure you type some out, or no one will know what your event is about.');
    } else {
        $('.info-preview-content').append(previewInfo);
    }
    $('.countdown-preview-container').append('<p class="countdown-description">(Hours) (Minutes) (Seconds)</p>');
    if(previewCountdown == "") {
        $('.countdown-preview-container').append('Countdown was not set.');
    } else {
        $('.countdown-preview-container').append(previewCountdown);
    }


    $('.slideshow-preview-container').append('<div class="slide-container-preview storable"></div>');
    $('.slide-container-preview').append('<div class="slideshow-preview"></div>')
    $('.slideshow-preview').append('<a class="prevPreview" onclick="prevSlidePreview()">&#10094;</a>');
    $('.slideshow-preview').append('<a class="nextPreview" onclick="nextSlidePreview()">&#10095;</a>');
    $('.slideshow-preview').append('<div style="text-align: center" class="preview-dot-container"></div>');
    var slides = document.getElementsByClassName('mySlides');
    console.log(slides.length);
    for(var i = 0; i < slides.length; i++) {
        var image = slides[i].children[0].src;
        console.log(image);

        if( i == 0) {
            $('.slideshow-preview').append('<div class= "preview-slide preview' + i + '" style = "display: block"></div>');
        } else {
            $('.slideshow-preview').append('<div class= "preview-slide preview' + i + '" style = "display: none"></div>');
        }
        $('.preview' + i).append("<img class='preview-image' src='" + image + "'>");
        $('.preview-dot-container').append('<span class="preview-dot"></span>')
    }
    showPreviewSlides();
}

window.onbeforeunload = function() {
    localStorage.removeItem('userID');
    localStorage.removeItem('sessionId');
    return null;
}

function setupTimers() {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);

    startTimer();
}

function startTimer() {
    timeoutId = window.setTimeout(deleteLocalStorageExpire, timeoutInMiliseconds)
}

function resetTimer() {
    window.clearTimeout(timeoutId);
    startTimer();
}

function deleteLocalStorageExpire() {
    saveSession();
    localStorage.removeItem('userID');
    localStorage.removeItem('sessionId');
    window.location.replace("/login.html");
    window.location.replace("/login.html");
    return null;
}

function plusSlides(n) {
    console.log(n);
    slideIndex = (slideIndex += n);
    showSlides(slideIndex, n);
}


function currentSlide(slideIndex, n) {
    console.log(n);
    console.log(slideIndex);
    showSlides((slideIndex = n), n);
}

function nextSlide() {
    var i;
    var currentSlide;
    var currentDot;
    var nextDot;
    var followingSlide;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    var next = document.getElementsByClassName("next");
    var prev = document.getElementsByClassName("prev");
    prev[0].style.display = "block"
    for(i = 0; i < slides.length; i++) {
        if(slides[i].style.display == "block") {
            currentSlide = slides[i];
            followingSlide = slides[i + 1];
            currentDot = dots[i];
            nextDot = dots[i + 1];
            if((i + 1) == slides.length) {
                next[0].style.display = "none";
            } else {
                currentSlide.style.display = "none";
                followingSlide.style.display = "block";
//                dots[nextDot].className += "active";
//                dots[currentDot].className.replace("active", "");
            }
            break;
        }
    }
}

function prevSlide() {
    var i;
    var currentSlide;
    var currentDot;
    var previousDot;
    var previousSlide;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    var next = document.getElementsByClassName("next");
    var prev = document.getElementsByClassName("prev");
    next[0].style.display = "block";
    for(i = 0; i < slides.length; i++) {
        if(slides[i].style.display == "block") {
            currentSlide =  slides[i];
            previousSlide = slides[i - 1];
//            currentDot = dots[i];
//            previousDot = dots[i - 1];
            if((i - 1) < 0) {
                prev[0].style.display = "none"
            } else {
                currentSlide.style.display = "none";
                previousSlide.style.display = "block";
            }
        }
    }
}

function nextSlidePreview() {
    var i;
    var currentSlide;
    var currentDot;
    var nextDot;
    var followingSlide;
    var slides = document.getElementsByClassName("preview-slide");
    var dots = document.getElementsByClassName("preview-dot");
    var next = document.getElementsByClassName("nextPreview");
    var prev = document.getElementsByClassName("prevPreview");
    prev[0].style.display = "block"
    for(i = 0; i < slides.length; i++) {
        if(slides[i].style.display == "block") {
            currentSlide = slides[i];
            followingSlide = slides[i + 1];
            currentDot = dots[i];
            nextDot = dots[i + 1];
            if((i + 1) >= slides.length) {
                next[0].style.display = "none";
            } else {
                currentSlide.style.display = "none";
                followingSlide.style.display = "block";
            }
            break;
        }
    }
}

function prevSlidePreview() {
    var i;
    var currentSlide;
    var currentDot;
    var previousDot;
    var previousSlide;
    var slides = document.getElementsByClassName("preview-slide");
    var dots = document.getElementsByClassName("preview-dot");
    var next = document.getElementsByClassName("nextPreview");
    var prev = document.getElementsByClassName("prevPreview");
    next[0].style.display = "block";
    for(i = 0; i < slides.length; i++) {
        if(slides[i].style.display == "block") {
            currentSlide =  slides[i];
            previousSlide = slides[i - 1];
            //            currentDot = dots[i];
            //            previousDot = dots[i - 1];
            if((i - 1) < 0) {
                prev[0].style.display = "none"
            } else {
                currentSlide.style.display = "none";
                previousSlide.style.display = "block";
                //                dots[previousDot].className += "active"
                //                dots[currentDot].className.replace("active", "");
            }
        }
    }
}

function showSlides(slideIndex, n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    var prev = document.getElementsByClassName("prev");
    var next = document.getElementsByClassName("next");
    if (slides.length == 0) {
        prev[0].style.display = "none";
        next[0].style.display = "none";
    } else {
//        if (n > slides.length) {
//            slideIndex = 2;
//        }
//        if (n < 1) {
//            slideIndex = slides.length;
//        }
        for (i = 0; i < slides.length; i++) {
            //        $(".mySlides:nth-child("+i+")").toggleClass("visible");
            $('.mySlides').hide();
        }
        for (i = 1; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        $('.mySlides:first-child').show();
        //    $(".mySlides:nth-child("+ (slideIndex) +") img").css('display', 'block');
        //    slides[slideIndex - 1].show();1
//        dots[0].className += " active";
    }
}

function showPreviewSlides() {
    var i;
    var slides = document.getElementsByClassName("preview-slide");
    var dots = document.getElementsByClassName('preview-dot');
    var prev = document.getElementsByClassName('nextPreview');
    var next = document.getElementsByClassName('prevPreview');
    if (slides.length == 0) {
        prev[0].style.display = "none";
        next[0].style.display = "none";
    } else {
//        for (i = 0; i <slides.length; i++) {
//            $('.preview' + i).hide();
//        }
        for (i = 1; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        $('.preview-slide:first-child').show();
    }
}


$(document).ready(function () {
    authValid();
    retrieveSessionById();
})

window.onload = sleep(1000).then(function() {
    showSlides(slideIndex, n);
    var checkArea = $('#website-container').html()
    checkArea = $('#website-container').html();
    setupTimers();
    console.log('welcome back')
})

