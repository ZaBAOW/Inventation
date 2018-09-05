$('form').on('submit', function(event) {

		event.preventDefault();

		var selectDate = $('#eventDay').val();
		var slicedDate = selectDate.slice(0, 10);
		console.log(slicedDate);
		localStorage.setItem('selectedDate', slicedDate);
		// var countDownDate = new Date(slicedDate).getTime();

		var eventDate = moment().countdown(slicedDate, countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toString();
		var moddedDate = eventDate.replace(/\D+/g, ":");
		var slicedTime = moddedDate.slice(0, moddedDate.length - 1);
		$('.count-container').append('<div class = "time-left">' + slicedTime + '</div>');
	
})


$(document).on('click','.remove-countdown', function() {
	$(this).parent('.count-container').remove();
	$('#website-container').find('br').remove();
});