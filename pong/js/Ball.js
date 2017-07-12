const MIN_INIT_VERT_BALL_SPEED = 0;
const MAX_INIT_VERT_BALL_SPEED = 2;
const MIN_BALL_HORIZONTAL_SPEED = 5;
const MAX_BALL_HORIZONTAL_SPEED = 20;

var ballX = 1;
var ballY = 1;
var ballBounceX = 0;
var ballSpeedX = MIN_BALL_HORIZONTAL_SPEED;
var ballSpeedY = MIN_INIT_VERT_BALL_SPEED;

var ballTrail = [];
const BALL_TRAIL_LENGTH = 5;

var ballPaddleHitSound = new soundOverlapsClass("audio/hit");
var ballWallSound = new soundOverlapsClass("audio/wall");
var ballMissSound = new soundOverlapsClass("audio/miss");

var hitCounter = 0;

function ballReset() {
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
		showingMenuScreen = true;
	}

	ballX = canvas.width/2;
	ballY = canvas.height/2;

	ballTrail = [];
	for(i = 0; i < BALL_TRAIL_LENGTH; i++) {
		ballTrail.push({x: ballX, y: ballY});
	}

	hitCounter = 0;
	ballBounceX = 0;

	ballSpeedX = MIN_BALL_HORIZONTAL_SPEED * (-ballSpeedX / Math.abs(ballSpeedX));

	ballSpeedY = MIN_INIT_VERT_BALL_SPEED + Math.random() * (MAX_INIT_VERT_BALL_SPEED - MIN_INIT_VERT_BALL_SPEED);
	if(Math.random() > 0.5) {
		ballSpeedY *= -1;
	}
}

function ballMove() {
	ballX += ballSpeedX;
	ballY -= ballSpeedY;

	// Horizontal movement
	if(ballX < 0 & ballSpeedX < 0) {
		player2Score++; // Must be BEFORE ballReset()
		ballMissSound.play();
		ballReset();
	}
	if(ballX > canvas.width & ballSpeedX > 0) {
		player1Score++; // Must be BEFORE ballReset()
		ballMissSound.play();
		ballReset();
	}
	// Vertical movement
	if(ballY > canvas.height && ballSpeedY < 0) {
		ballSpeedY = -ballSpeedY;
		ballWallSound.play();
		interceptFound = false;
		ballBounceX = ballX;
	}
	if(ballY < 0 && ballSpeedY > 0) {
		ballSpeedY = -ballSpeedY;
		ballWallSound.play();
		interceptFound = false;
		ballBounceX = ballX;
	}

	ballTrail.pop();
	ballTrail.unshift({x: ballX, y: ballY});

	ballPaddleCollision();

}

function ballPaddleCollision() {
	var yIntercept;
	var paddle1TopEdgeY = paddle1Y;
	var paddle1BottomEdgeY = paddle1Y + PADDLE_HEIGHT;
	var paddle1RightEdgeX = PADDLE_OFFSET_FROM_EDGE + PADDLE_WIDTH;
	var paddle1LeftEdgeX = PADDLE_OFFSET_FROM_EDGE;

	var paddle2TopEdgeY = paddle2Y;
	var paddle2BottomEdgeY = paddle2Y + PADDLE_HEIGHT;
	var paddle2RightEdgeX = canvas.width - PADDLE_OFFSET_FROM_EDGE;
	var paddle2LeftEdgeX = paddle2RightEdgeX - PADDLE_WIDTH;

	if(ballX > paddle1RightEdgeX && ballX + ballSpeedX <= paddle1RightEdgeX) {
		yIntercept = getBallPaddleInterceptPoint(1).y;
		if(paddle1TopEdgeY <= yIntercept && paddle1BottomEdgeY >= yIntercept) {
			hitCounter++;
			ballPaddleHitSound.play();

			ballSpeedX *= -1;
			if((hitCounter/3) == Math.floor(hitCounter/3)) {
				ballSpeedX += 3 * (ballSpeedX / Math.abs(ballSpeedX));
			}
			ballSpeedX = Math.min(Math.abs(ballSpeedX), MAX_BALL_HORIZONTAL_SPEED) * (ballSpeedX / Math.abs(ballSpeedX));

			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2)
			ballSpeedY = -deltaY * 0.3;
			ballBounceX = ballX;
		}
	}
	if(ballX < paddle2LeftEdgeX && ballX + ballSpeedX >= paddle2LeftEdgeX) {
		yIntercept = getBallPaddleInterceptPoint(2).y;
		if(paddle2TopEdgeY <= yIntercept && paddle2BottomEdgeY >= yIntercept) {
			hitCounter++;
			ballPaddleHitSound.play();

			ballSpeedX *= -1;
			if((hitCounter/3) == Math.floor(hitCounter/3)) {
				ballSpeedX += 3 * (ballSpeedX / Math.abs(ballSpeedX));
			}
			ballSpeedX = Math.min(Math.abs(ballSpeedX), MAX_BALL_HORIZONTAL_SPEED) * (ballSpeedX / Math.abs(ballSpeedX));

			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2)
			ballSpeedY = -deltaY * 0.3;
			ballBounceX = ballX;
		}
	}
}

function getBallPaddleInterceptPoint(whichPaddle) {
	const PADDLE1_RIGHT_X = PADDLE_OFFSET_FROM_EDGE + PADDLE_WIDTH;
	const PADDLE2_LEFT_X = canvas.width - PADDLE_OFFSET_FROM_EDGE - PADDLE_WIDTH;

	var ballGradient = ballSpeedY/ballSpeedX;

	var paddle1DistanceToInterceptX = ballX - PADDLE1_RIGHT_X;
	var paddle2DistanceToInterceptX = PADDLE2_LEFT_X - ballX;

	var paddle1InterceptPointY = ballY - (ballGradient * paddle1DistanceToInterceptX);
	var paddle2InterceptPointY = ballY - (ballGradient * paddle2DistanceToInterceptX);

	if(whichPaddle == 1) {
		return getBallInterceptPoint(paddle1InterceptPointY);
	} else if(whichPaddle == 2) {
		return getBallInterceptPoint(paddle2InterceptPointY);
	}
}

function getBallInterceptPoint(interceptPointY) {
	var bouncesLeft = 0;

	if(interceptPointY < 0) {
		interceptPointY *= -1;
	}
	if(interceptPointY > canvas.height) {
		bouncesLeft = Math.floor(interceptPointY/canvas.height);
		interceptPointY = Math.abs((Math.ceil(bouncesLeft/2) * 2 * canvas.height) - interceptPointY);
	}

	return ({y: interceptPointY, bouncesLeft: bouncesLeft});
}

function drawBall() {
	drawTrail();
	drawBitmapCenteredAtLocation(ballPic, ballX, ballY);
}

function drawTrail() {
	for(var i = 0; i < ballTrail.length; i++) {
		colourCircle(colourCircle(ballTrail[i].x, ballTrail[i].y, 8 - i, 'yellow'));
	}
}