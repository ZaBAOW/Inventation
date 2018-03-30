function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
	var newInfoBox = '<textarea class="content" rows="10" cols="50"></textarea><br>'
	$('#website-container').append(newInfoBox);
}