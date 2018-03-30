function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById('mySidenav').style.width = "0";
}

function createInfo() {
	var infoBox = document.getElementById('content');
	document.getElementById('website-container').append(infoBox);
}