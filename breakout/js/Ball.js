const BALL_RADIUS = 6;
const INITIAL_BALL_SPEED_Y = 5;
const MAX_BALL_SPEED_Y = 2 * BALL_RADIUS;
const POINTS_PER_BALL_QUADRANT = 4;

const PI = Math.PI;
const OFFSET = PI/(4*POINTS_PER_BALL_QUADRANT);
const SEPARATION = OFFSET*2;

var missSound = new soundOverlapsClass("audio/ball_miss");
var paddleSound = new soundOverlapsClass("audio/paddle_hit");

function ballClass() {
	this.ballX = canvas.width/2;
	this.ballY = canvas.height/2;
	this.heldX = -PADDLE_WIDTH/2;

	this.ballSpeedX = 0;
	this.ballSpeedY = Math.min(MAX_BALL_SPEED_Y,INITIAL_BALL_SPEED_Y + deepestRow * 0.5);

	this.ballHeld = true;
	this.ballBouncesOffBricks = true;
	this.ballStickyTurns = 0;

	this.collisionDetected = false;
	this.isMissed = false;

	//bottom, left, top, right
	this.ballQuadrantCollisions = new Array(POINTS_PER_BALL_QUADRANT * 4);

	for(var i = 0; i < this.ballQuadrantCollisions.length; i++) {
		this.ballQuadrantCollisions[i] = null;
	}

	this.ballMove = function() {
		if(this.ballSpeedY > MAX_BALL_SPEED_Y) {
			this.ballSpeedY = MAX_BALL_SPEED_Y;
		}
		if(this.ballHeld == false) {
			this.ballX += this.ballSpeedX;
			this.ballY += this.ballSpeedY;

			this.ballBrickHandling();
		}
	}

	this.ballBrickHandling = function() {
		this.arcX;
		this.arcY;
		this.collisionDetected = false;

		this.botHit = 0;
		this.leftHit = 0;
		this.topHit = 0;
		this.rightHit = 0;
		var brickTypeHit = 0;

		if(this.ballSpeedY < 0 && this.ballY < 0) {
			this.ballSpeedY *= -1;
			this.ballBouncesOffBricks = true;
		}
		if(this.ballSpeedY > 0 && this.ballY > canvas.height) {
			this.isMissed = true;
			missedBallsToClear = true;
			missSound.play();
			ballsInPlay--;
		}
		if(this.ballSpeedX < 0 && this.ballX < 0) {
			this.ballSpeedX *= -1;
		}
		if(this.ballSpeedX > 0 && this.ballX > canvas.width) {
			this.ballSpeedX *= -1;
		}

		for(var i = 0; i < this.ballQuadrantCollisions.length; i++) {
			this.arcX = Math.round(this.ballX + Math.cos(OFFSET + SEPARATION * (i + 2)) * BALL_RADIUS);
			this.arcY = Math.round(this.ballY + Math.sin(OFFSET + SEPARATION * (i + 2)) * BALL_RADIUS);
			brickTypeHit = Math.max(isBrickAtPixel(this.arcX, this.arcY),brickTypeHit);
			if(isBrickAtPixel(this.arcX, this.arcY)) {
				this.ballQuadrantCollisions[i] = pixelToArrayIndex(this.arcX, this.arcY);
				this.collisionDetected = true;
				if(i >= 0 && i <= 3) {
					this.botHit++;
				} else if(i >= 4 && i <= 7) {
					this.leftHit++;
				} else if(i >= 8 && i <= 11) {
					this.topHit++;
				} else if(i >= 12 && i <= 15) {
					this.rightHit++;
				}
			}
		}

		// Special case for tunneling
		if(this.botHit == POINTS_PER_BALL_QUADRANT && this.topHit == POINTS_PER_BALL_QUADRANT && this.leftHit == POINTS_PER_BALL_QUADRANT && this.rightHit == POINTS_PER_BALL_QUADRANT) {
			this.botHit = 0;
			this.leftHit = 0;
			this.topHit = 0;
			this.rightHit = 0;

			for(var i = 0; i < this.ballQuadrantCollisions.length; i++) {
			this.arcX = Math.round(this.ballX - this.ballSpeedX/2 + Math.cos(OFFSET + SEPARATION * (i + 2)) * BALL_RADIUS);
			this.arcY = Math.round(this.ballY - this.ballSpeedY/2 + Math.sin(OFFSET + SEPARATION * (i + 2)) * BALL_RADIUS);
				brickTypeHit = Math.max(isBrickAtPixel(this.arcX, this.arcY),brickTypeHit);
				if(isBrickAtPixel(this.arcX, this.arcY)) {
					this.ballQuadrantCollisions[i] = pixelToArrayIndex(this.arcX, this.arcY);
					this.collisionDetected = true;
					if(i >= 0 && i <= 3) {
						this.botHit++;
					} else if(i >= 4 && i <= 7) {
						this.leftHit++;
					} else if(i >= 8 && i <= 11) {
						this.topHit++;
					} else if(i >= 12 && i <= 15) {
						this.rightHit++;
					}
				}
			}
		}

		if(this.ballBouncesOffBricks || brickTypeHit == INVULN_BRICK) {
			if(this.botHit != this.topHit) {
				this.ballSpeedY *= -1;
			}
			if(this.leftHit != this.rightHit) {
				this.ballSpeedX *= -1;
			}
			this.destroyBrick = false;
		} else {
			this.destroyBrick = true;
		}

		if(this.collisionDetected) {
			var uniqueCollisions = Array.from(new Set(this.ballQuadrantCollisions));
			for(var i = 0; i < uniqueCollisions.length; i++) {
				degradeBrick(uniqueCollisions[i], this.destroyBrick);
			}
			for(var i = 0; i < this.ballQuadrantCollisions.length; i++) {
				this.ballQuadrantCollisions[i] = null;
			}
			this.collisionDetected = false;
		}

		this.ballSpeedY = (this.ballSpeedY/Math.abs(this.ballSpeedY)) * (Math.min(MAX_BALL_SPEED_Y, INITIAL_BALL_SPEED_Y + deepestRow * 0.25));

		this.ballPaddleCollision();
	}

	this.ballPaddleCollision = function() {
		var xIntercept;
		var paddleLeftEdgeX = paddleX;
		var paddleRightEdgeX = paddleX + PADDLE_WIDTH;
		var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
		var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;

		if(this.ballY < paddleTopEdgeY && this.ballY + this.ballSpeedY >= paddleTopEdgeY) {
			xIntercept = getBallPaddleInterceptPoint(this.ballX, this.ballY, this.ballSpeedX, this.ballSpeedY).x;
			if(paddleLeftEdgeX <= xIntercept && paddleRightEdgeX >= xIntercept) {

				if(this.ballStickyTurns > 0) {
					this.ballHeld = true;
					this.ballStickyTurns--;
					this.heldX = paddleX - this.ballX;
				}
				this.ballSpeedY *= -1;
				paddleSound.play();

				var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
				var ballDistFromPaddleCenterX = this.ballX - centerOfPaddleX;

				this.ballSpeedX = ballDistFromPaddleCenterX * 0.2;
			}
		}
	}

	this.drawBall = function() {
		drawBitmapCenteredAtLocation(ballPic, this.ballX, this.ballY);
		
		var drawArcX;
		var drawArcY;
		/*
		for(var i = 0; i < this.ballQuadrantCollisions.length; i++) {
			drawArcX = Math.round(this.ballX + Math.cos(OFFSET + SEPARATION * (i + 2)) * BALL_RADIUS);
			drawArcY = Math.round(this.ballY + Math.sin(OFFSET + SEPARATION * (i + 2)) * BALL_RADIUS);
			if(i >= 0 && i <= 3) {
				colourRect(drawArcX, drawArcY, 1, 1, 'red');
			} else if(i >= 4 && i <= 7) {
				colourRect(drawArcX, drawArcY, 1, 1, 'yellow');
			} else if(i >= 8 && i <= 11) {
				colourRect(drawArcX, drawArcY, 1, 1, 'green');
			} else if(i >= 12 && i <= 15) {
				colourRect(drawArcX, drawArcY, 1, 1, 'blue');
			}
		}
		*/
	}

}
