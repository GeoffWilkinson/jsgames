var canvas;
var canvasContext;

const WINNING_SCORE = 10;
const SCORE_PIXEL_SCALE = 5;

var showingMenuScreen = true;
var showingControlSelection = false;

var framesPerSecond = 60;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();
}

function loadingDoneSoStartGame() {
	setInterval(function doEverything() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	setUpInputEventHandlers();
	ballReset();
	canvasContext.textAlign = 'center';
}

function moveEverything() {
	if(showingMenuScreen) {
		paddle1Y = 250;
		paddle2Y = 250;
	} else {
		if(isTwoPlayer) {
			twoPlayerKeyControls();
		} else {
			if(isMouseControlled == false) {
				onePlayerKeyControls();
			}
			computerMovement();
		}
		ballMove();
	}
}

function drawEverything() {
	drawBitmapPositionedByTopLeftCorner(backgroundPic, 0, 0);
	drawNumToGrid(50, 20, player1Score, SCORE_PIXEL_SCALE, 'white');
	drawNumToGrid(canvas.width - 50 - (SCORE_PIXEL_SCALE * (GRID_COLS + 1 + GRID_COLS)), 20, player2Score, SCORE_PIXEL_SCALE, 'white');

	if(showingMenuScreen) {
		colourText("Press 1 for Single Player, 2 for Two Player", canvas.width/4, canvas.height/4, 'white');
		if(showingControlSelection) {
			colourText("Press 1 for mouse control, 2 for keyboard control", canvas.width/3, canvas.height/3, 'white');
		}
		if(player1Score >= WINNING_SCORE) {
			colourText("PLAYER 1 WINS", canvas.width/4, canvas.height/2, 'white');
		} else if(player2Score >= WINNING_SCORE) {
			colourText("PLAYER 2 WINS", canvas.width*3/4, canvas.height/2, 'white');
		}
	} else {
		drawPaddles();
		drawBall();
	}
}

