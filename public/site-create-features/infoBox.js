$(document).on('click','.remove-infoBox', function() {
	$(this).parent('.feature-container').remove();
	$('#website-container').find('br').remove();
});