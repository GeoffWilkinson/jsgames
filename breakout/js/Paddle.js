const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const PADDLE_DIST_FROM_EDGE = 60;

var paddleX = 350;

function getBallPaddleInterceptPoint(ballX, ballY, ballSpeedX, ballSpeedY) {
	var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;

	var ballGradient = ballSpeedX/ballSpeedY;

	var paddleDistanceToInterceptY = paddleTopEdgeY - ballY;

	var paddleInterceptPointX = ballX - (ballGradient * paddleDistanceToInterceptY);

	return getBallInterceptPoint(paddleInterceptPointX);
}

function getBallInterceptPoint(interceptPointX) {
	var bouncesLeft = 0;

	if(interceptPointX < 0) {
		interceptPointX *= -1;
	}
	if(interceptPointX > canvas.width) {
		bouncesLeft = Math.floor(interceptPointX/canvas.width);
		interceptPointX = Math.abs((Math.ceil(bouncesLeft/2) * 2 * canvas.width) - interceptPointX);
	}

	return ({x: interceptPointX, bouncesLeft: bouncesLeft});
}

function drawPaddle() {
	drawBitmapPositionedByTopLeftCorner(paddlePic, paddleX, canvas.height - PADDLE_DIST_FROM_EDGE);
}
