var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

const P1 = 0;
const P2 = 1;
const SHADOW = 2;

var framesPerSecond = 30;
var startTime;
var countDown;

const GRAVITY = 0.2;

var allPicturesLoaded = false;
// Until I can get webAudio working
var allSoundsLoaded = true;

var showingTitleScreen = true;

var cameraPanX = 0;
var cameraPanY = 0;
var cameraZoom = 1;
var cameraFocusPoint = {x: 0, y: 0};

var multiplayer = false;

var button1X;
var button1Width;
var button1Y;
var button1Height;
var mouseOnButton1;

var button2X;
var button2Width;
var button2Y;
var button2Height;
var mouseOnButton2;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.font = '20px Arial';

	colourRect(0, 0, canvas.width, canvas.height, 'black');
	colourText("LOADING", canvas.width/2, canvas.height/2, 'white');

	loadImages();
	//loadSounds();
	tryToStart();
}

function tryToStart() {
	if(allPicturesLoaded && allSoundsLoaded) {
		loadingComplete();
	}
}

function loadingComplete() {
	setInterval(updateAll, 1000/framesPerSecond);
	setUpInput();
	setUpTitleMenu();

	nextTrack = 1;
}

function setUpTitleMenu() {
	button1X = canvas.width/2 - 60;
	button1Width = 120;
	button1Y = canvas.height/2 + 50;
	button1Height = 40;
	mouseOnButton1 = false;

	button2X = canvas.width/2 - 60;
	button2Width = 120;
	button2Y = canvas.height/2 + 90;
	button2Height = 40;
	mouseOnButton2 = false;
}

function goToNextTrack() {
	thisLevel = pickLevel();
	loadLevel(thisLevel);
}

function pickLevel() {
	var pickThis;
	
	if(editorMode) {
		pickThis = levels[0];
	} else {
		pickThis = levels[nextTrack];
		nextTrack++;
		if(nextTrack >= levels.length) {
			nextTrack = 1;
		}
	}
	return pickThis;
}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice();
	checkpointsPassed = 0;
	numCheckpoints = 0;
	howManyCheckpoints(trackGrid);
	if(multiplayer) {
		greenCar.isAIControlled = false;
	} else {
		greenCar.isAIControlled = true;
	}

	// Randomise day/night
	if(Math.random() - 0.5 > 0) {
		trackTheme = 0;
	} else {
		trackTheme = 1;
	}
	// Randomise rain
	if(Math.random() - 0.7 > 0) {
		raining = true;
	} else {
		raining = false;
	}

	if(!editorMode && !showingTitleScreen) {
		blueCar.reset(P1, "Blue Storm");
		greenCar.reset(P2, "Green Machine");
		countDown = framesPerSecond * 8;
	}
}

function updateAll() {
	// If raining, spawns rain and moves it.  Despawns all rain when not raining.
	simulateRain();

	var newDate = new Date();
	if(countDown == 0) {
		startTime = newDate.getTime();
		countDown--;
	} else {
		countDown--;
	}

	if(!editorMode || !showingTitleScreen) {
		if(countDown <= 0) {
			moveAll();
		}

		cameraFocusPoint = {x: (blueCar.x + greenCar.x)/2, y: (blueCar.y + greenCar.y)/2};

		var carDistToCentreX = (blueCar.x - cameraFocusPoint.x);
		var carDistToCentreY = (blueCar.y - cameraFocusPoint.y);
		var carDistToCentre = Math.sqrt(carDistToCentreX * carDistToCentreX + carDistToCentreY * carDistToCentreY);
		var screenDiagonal = Math.sqrt((canvas.width * canvas.width) + (canvas.height * canvas.height));

		cameraZoom = (screenDiagonal/5)/carDistToCentre;

		if(cameraZoom < canvas.height / (trackRows * TRACK_HEIGHT)) {
			cameraZoom = canvas.height / (trackRows * TRACK_HEIGHT);
		} else if(cameraZoom < canvas.width / (trackCols * TRACK_WIDTH)) {
			cameraZoom = canvas.width / (trackCols * TRACK_WIDTH);
		} else if(cameraZoom > 1) {
			cameraZoom = 1;
		}

		cameraPanX = Math.max(Math.min(0, (canvas.width/2 - cameraZoom * cameraFocusPoint.x)), (-TRACK_WIDTH * cameraZoom * trackCols) + canvas.width);
		cameraPanY = Math.max(Math.min(0, (canvas.height/2 - cameraZoom * cameraFocusPoint.y)), (-TRACK_HEIGHT * cameraZoom * trackRows) + canvas.height);
	}

	drawAll();
}

function clock() {
	var newDate = new Date();
	var ms;
	if(startTime != undefined) {
		ms = newDate.getTime() - startTime;
	} else {
		ms = 0;
	}

	//var hours = "" + Math.floor(ms / 3600000);
	var minutes = "" + Math.floor((ms % 3600000) / 60000);
	var seconds = "" + Math.floor(((ms % 3600000) % 60000) / 1000);
	var milliseconds = "" + Math.floor(((ms % 3600000) % 60000) % 1000);

	//var padHours = ('00' + hours).substring(hours.length);
	var padMins = ('00' + minutes).substring(minutes.length);
	var padSecs = ('00' + seconds).substring(seconds.length);
	var padMS = ('000' + milliseconds).substring(milliseconds.length);
	var clockString = padMins + ":" + padSecs + "." + padMS;

	return clockString;
}

function moveAll() {
	blueCar.move();
	greenCar.move();
	carToCarCollisions();
}

function drawAll() {
	if(showingTitleScreen) {
		drawBitmapPositionedByTopLeftCorner(titlePic, 0, 0);
		drawBitmapPositionedByTopLeftCorner(button1Pic, button1X, button1Y);
		drawBitmapPositionedByTopLeftCorner(button2Pic, button2X, button2Y);
		if(mouseOnButton1) {
			drawBitmapPositionedByTopLeftCorner(cursorPic, button1X + button1Width + 20, button1Y);
		} else if(mouseOnButton2) {
			drawBitmapPositionedByTopLeftCorner(cursorPic, button2X + button2Width + 20, button2Y);
		}
	} else {
		colourRect(0, 0, canvas.width, canvas.height, 'black');

		canvasContext.save();
		canvasContext.translate(cameraPanX, cameraPanY);
		canvasContext.scale(cameraZoom, cameraZoom);

		drawTracks();
		if(editorMode) {
			drawWaypoints();
		} else {
			blueCar.draw();
			greenCar.draw();
			if(raining) {
				drawRain();
			}
		}
		canvasContext.restore();

		if(editorMode) {
			drawHeldTrack();
		} else {
			colourText(clock(), 25, 25, 'white');
			if(countDown >= 0) {
				canvasContext.font = '50px Arial';
				colourText(Math.floor(countDown / (2 * framesPerSecond)), canvas.width/2, canvas.height/2 - 100, 'yellow');
				canvasContext.font = '20px Arial';
			}
		}
	}
}
