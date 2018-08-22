$(document).on('click','.remove-infoBox', function() {
	$(this).parent('.info-container').remove();
	$('#website-container').find('br').remove();
});