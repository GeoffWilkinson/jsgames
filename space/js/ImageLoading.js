var playerPic = document.createElement("img");
var UFOPic = document.createElement("img");
var shotPic = document.createElement("img");
var UFOShotPic = document.createElement("img");
var asteroidPic = document.createElement("img");
var rockFragmentPic = document.createElement("img");
var shipExhaustPic = document.createElement("img");
var missilePic = document.createElement("img");
var missileExhaustPic = document.createElement("img");

var PURepairPic = document.createElement("img");
var PUShieldPic = document.createElement("img");
var PUSpeedPic = document.createElement("img");
var PUDamagePic = document.createElement("img");

var inertiaLogoPic = document.createElement("img");
var playButtonPic = document.createElement("img");
var controlsButtonPic = document.createElement("img");
var settingsButtonPic = document.createElement("img");
var creditsButtonPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if(picsToLoad == 0) { // last image loaded?
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImages() {
	var imageList = [
	{varName: playerPic, theFile: "ship.png"},
	{varName: UFOPic, theFile: "ufo.png"},
	{varName: shotPic, theFile: "shot.png"},
	{varName: UFOShotPic, theFile: "ufo_shot.png"},
	{varName: asteroidPic, theFile: "asteroid.png"},
	{varName: rockFragmentPic, theFile: "rock_fragment.png"},
	{varName: shipExhaustPic, theFile: "ship_exhaust.png"},
	{varName: missilePic, theFile: "missile.png"},
	{varName: missileExhaustPic, theFile: "missile_exhaust.png"},
	{varName: PURepairPic, theFile: "pu_repair.png"},
	{varName: PUShieldPic, theFile: "pu_shield.png"},
	{varName: PUSpeedPic, theFile: "pu_speed.png"},
	{varName: PUDamagePic, theFile: "pu_damage.png"},
	{varName: inertiaLogoPic, theFile: "inertia_logo.png"},
	{varName: playButtonPic, theFile: "play_button.png"},
	{varName: controlsButtonPic, theFile: "controls_button.png"},
	{varName: settingsButtonPic, theFile: "settings_button.png"},
	{varName: creditsButtonPic, theFile: "credits_button.png"}
	];

	picsToLoad = imageList.length;

	for(var i = 0; i < imageList.length; i++) {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
	} // end of for imageList
} // end of function loadImages
