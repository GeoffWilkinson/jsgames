var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

const PADDLE_DRAW_Y_OFFSET = 10;
const PADDLE_HEIGHT = 100 + 2 * PADDLE_DRAW_Y_OFFSET;
const PADDLE_WIDTH = 10;
const NO_PADDLE_MARGIN = 5;

const PADDLE_OFFSET_FROM_EDGE = 90;

const PADDLE_MOVE_SPEED = 10;

var gotoY = 0;
var interceptFound = false;

function computerMovement() {
	var paddle2Center = paddle2Y + (PADDLE_HEIGHT/2);
	const MOVE_MARGIN = 20;
	var topMoveRange = paddle2Center - MOVE_MARGIN;
	var bottomMoveRange = paddle2Center + MOVE_MARGIN;
	// note that higher numbers = easier...
	var inaccuracyModifier = 1;
	// since this block runs once per frame, framesPerSecond is the
	// same as saying 1 second.
	var reactionTime = framesPerSecond/3;

	if(onePlayerKeyControls == true) {
		inaccuracyModifier = 20;
		reactionTime = framesPerSecond/2;
	} else {
		inaccuracyModifier = 5;
	}

	var bouncePredictionInaccuracy = inaccuracyModifier * PADDLE_HEIGHT;

	if (ballSpeedX < 0) {
		gotoY = canvas.height/2;
		interceptFound = false;
	} else if(ballSpeedX > 0 && ballX > (ballSpeedX * reactionTime) + ballBounceX && interceptFound == false) {
		var interceptParameters = getBallPaddleInterceptPoint(2);
		gotoY = interceptParameters.y;
		gotoY += (Math.random() - 0.5) * interceptParameters.bouncesLeft * bouncePredictionInaccuracy;
		interceptFound = true;
	}

	if(gotoY < topMoveRange) {
		paddle2Y -= PADDLE_MOVE_SPEED;
	}
	if(gotoY > bottomMoveRange) {
		paddle2Y += PADDLE_MOVE_SPEED;
	}

	if(paddle1Y + PADDLE_HEIGHT + NO_PADDLE_MARGIN > canvas.height) {
		paddle1Y = canvas.height - PADDLE_HEIGHT - NO_PADDLE_MARGIN;
	} else if(paddle1Y < NO_PADDLE_MARGIN) {
		paddle1Y = NO_PADDLE_MARGIN;
	}

	if(paddle2Y + PADDLE_HEIGHT + NO_PADDLE_MARGIN > canvas.height) {
		paddle2Y = canvas.height - PADDLE_HEIGHT - NO_PADDLE_MARGIN;
	} else if(paddle2Y < NO_PADDLE_MARGIN) {
		paddle2Y = NO_PADDLE_MARGIN;
	}

}

function twoPlayerKeyControls() {

	onePlayerKeyControls();

	if(player2KeyHeldUp) {
		paddle2Y -= PADDLE_MOVE_SPEED;
		if(paddle2Y < 0) {
			paddle2Y = 0;
		}
	}
	if(player2KeyHeldDown) {
		paddle2Y += PADDLE_MOVE_SPEED;
		if(paddle2Y > canvas.height - paddleLeftPic.height) {
			paddle2Y = canvas.height - paddleLeftPic.height;
		}
	}

	if(paddle2Y + PADDLE_HEIGHT + NO_PADDLE_MARGIN > canvas.height) {
		paddle2Y = canvas.height - PADDLE_HEIGHT - NO_PADDLE_MARGIN;
	} else if(paddle2Y < NO_PADDLE_MARGIN) {
		paddle2Y = NO_PADDLE_MARGIN;
	}
}

function onePlayerKeyControls() {
	if(player1KeyHeldUp) {
		paddle1Y -= PADDLE_MOVE_SPEED;
		if(paddle1Y < 0) {
			paddle1Y = 0;
		}
	}
	if(player1KeyHeldDown) {
		paddle1Y += PADDLE_MOVE_SPEED;
		if(paddle1Y > canvas.height - paddleLeftPic.height) {
			paddle1Y = canvas.height - paddleLeftPic.height;
		}
	}

	if(paddle1Y + PADDLE_HEIGHT + NO_PADDLE_MARGIN > canvas.height) {
		paddle1Y = canvas.height - PADDLE_HEIGHT - NO_PADDLE_MARGIN;
	} else if(paddle1Y < NO_PADDLE_MARGIN) {
		paddle1Y = NO_PADDLE_MARGIN;
	}
}

function drawPaddles() {
	// Player 1 paddle
	drawBitmapPositionedByTopLeftCorner(paddleLeftPic, PADDLE_OFFSET_FROM_EDGE, paddle1Y + PADDLE_DRAW_Y_OFFSET);
	// Player 2 paddle
	drawBitmapPositionedByTopLeftCorner(paddleRightPic, canvas.width - PADDLE_OFFSET_FROM_EDGE - paddleRightPic.width, paddle2Y + PADDLE_DRAW_Y_OFFSET);

}