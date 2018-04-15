$(document).ready(function() {
	var sourceHtml = $(localStorage.site);
	// $('.preview-container').append(localStorage.site);
	modifyContent(sourceHtml);
})

function modifyContent(sourceHtml) {
	var infoContent = $(sourceHtml).contains('div.infobox-container').html();
	console.log(infoContent)
}