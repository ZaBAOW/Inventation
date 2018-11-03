'use strict'

var timeoutInMiliseconds = 3600000;
var timeoutId;

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
    var newInfoBox = "";
    newInfoBox += `<div class="info-container storable">`;
    newInfoBox += `<input type="button" class="remove-infoBox" value="&#10006">`;
    newInfoBox += `<textarea aria-label="info-box-content" class="info-box-content" name="content" rows="10" cols="50" placeholder="Enter some information about your event">`;
    newInfoBox += `</textarea>`;
    newInfoBox += `</div>`;
    $('#website-container').append(newInfoBox);
}

function createCountdown() {
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
    var newSlideShow = ""
    newSlideShow += `<div class="slide-container storable"><div class="slideshow-container">`;
    newSlideShow += `<input type="button" class="remove-slideshow" value="&#10006">`;
    newSlideShow += `<a class="prev" onclick="plusSlides(-1)">&#10094;`;
    newSlideShow += `</a>`;
    newSlideShow += `<a class="next" onclick="plusSlides(1)">&#10095;`;
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
    var r = confirm('Are you sure you want to return to the home page?');
    if (r === true) {
        saveSession();
        window.location.replace("/index.html");
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
    console.log(content);
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
    const sessionId = localStorage.sessionId
    if (sessionId === undefined || sessionId === "undefined") {
        var r = confirm("We could not find your session.\n" + "Would you like to create a session?");
        if (r === true) {
            createSession();
            return;
        } else {
            return;
        }
    }
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
                for (i = 0; i < slideShowContent.length - 1; i++) {
                    console.log(slideShowContent[i].image);
                    var image = slideShowContent[i].image;
                    var newImageTemplate = "<div class='mySlides fade'><img src='" + image + "' style='max-width:100%'>";
                    var imageNumber = $('.dot-container span').length
                    var newDotTemplate = '<span class="dot" onclick="currentSlide(' + imageNumber + ')"></span>'
                    $('.dot-container').append(newDotTemplate);
                    $('.slideshow-container').prepend(newImageTemplate);
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

$(document).ready(function () {
    authValid();
    retrieveSessionById()
    var checkArea = $('#website-container').html()
    checkArea = $('#website-container').html();
    setupTimers();
    console.log('welcome back')
})


function saveSession(upload_url) {
    const infoBoxContent = $(".info-box-content").val();
    const slideShowContent = upload_url;
    console.log(slideShowContent);
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

window.onbeforeunload = function() {
    localStorage.removeItem('userID');
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
    window.location.replace("/login.html");
    return null;
}

