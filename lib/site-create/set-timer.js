var countDownDate;
var setCountdown = function() {
	var now = newDate().getTime();

	var distance = countDownDate - now;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

	if(distance === 0 || distance < 0){
		clearInterval(x);
		document.getElementById("countdown").innerHTML = "EXPIRED";
	};

}

$(document).on('click','.remove-countdown', function() {
	$(this).parent('.countdown-container').remove();
});