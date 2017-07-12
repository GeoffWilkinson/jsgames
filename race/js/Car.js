const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.25;
const REVERSE_POWER = 0.1;
const BASE_TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.1;
const AI_SPEED_PENALTY = 0.995;

const NITRO_POWER = 0.4;
const NITRO_TURN_RATE = 0.025;
const NITRO_TRAIL_LENGTH = 5;

const CAR_LENGTH = 30;
const CAR_WIDTH = 16;

function carClass() {
	this.name = "Untitled Car";
	this.playerIndex;

	this.x;
	this.y;
	this.z;
	this.ang = -Math.PI/2;
	this.speed = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.speedZ = 0;

	this.inertia = 0.5;
	this.inertialSpeed = [];

	this.carEdgePoints = [];

	this.speedDecayMultiplier = GROUNDSPEED_DECAY_MULT;
	this.turnRate = BASE_TURN_RATE;

	this.keyHeldGas = false;
	this.keyHeldReverse = false;
	this.keyHeldLeft = false;
	this.keyHeldRight = false;
	this.keyHeldNitro = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	this.controlKeyNitro;

	this.isAIControlled = false;
	this.changeKeyTimer = framesPerSecond;

	this.nitroOn = false;
	this.nitroUses = 1;
	this.nitroTimer = framesPerSecond * 2;
	this.nitroTrail = [];

	this.checkpointCoords = {x: this.x, y: this.y, ang: this.ang};
	this.inTheWall = 0;

	this.checkpointsPassed = 0;
	this.lapsCompleted = 0;

	this.nextWaypoint = 50;

	//this.engineSound = new soundOverlapsClass("audio/car_engine");
	//this.isMoving = false;

	this.setUpInput = function(upKey, rightKey, downKey, leftKey, shiftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyNitro = shiftKey
	}

	this.reset = function(whichPlayer, carName) {
		this.name = carName;
		this.playerIndex = whichPlayer;

		this.x = this.checkpointCoords.x;
		this.y = this.checkpointCoords.y;
		this.z = 0;
		this.ang = this.checkpointCoords.ang;

		this.carEdgePoints = [];
		this.calculateCarEdges();

		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.speedZ = 0;

		this.inertia = 2;
		this.inertialSpeed = [];
		for(var i = 0; i < framesPerSecond * this.inertia; i++) {
			this.inertialSpeed.push({sX: this.speedX, sY: this.speedY});
		}

		this.changeKeyTimer = framesPerSecond;

		this.nitroOn = false;
		this.nitroUses = 1;
		this.nitroTimer = framesPerSecond * 2;
		this.inTheWall = 0;
		this.checkpointsPassed = 0;
		this.lapsCompleted = 0;

		this.nextWaypoint = 50;
		//this.engineSound.enableLoop();
		//this.isMoving = false;

		this.keyHeldLeft = false;
		this.keyHeldRight = false;
		this.keyHeldGas = false;
		this.keyHeldReverse = false;
		this.keyHeldNitro = false;

		this.nitroTrail = [];
		for(i = 0; i < NITRO_TRAIL_LENGTH; i++) {
			this.nitroTrail.push({x: this.carEdgePoints[3].x, y: this.carEdgePoints[3].y, z: this.z});
			this.nitroTrail.push({x: this.carEdgePoints[5].x, y: this.carEdgePoints[5].y, z: this.z});
		}

		for(var eachRow = 0; eachRow < trackRows; eachRow++) {
			for(var eachCol = 0; eachCol < trackCols; eachCol++) {
				var arrayIndex = trackCols * eachRow + eachCol;

				if(trackGrid[arrayIndex] == TRACK_PLAYER_START) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					var blockAngleIndex = orientationBlockAngle(arrayIndex);
					this.ang = blockAngleIndex.angle;
					trackGrid[blockAngleIndex.index] = TRACK_ROAD;
					this.x = (eachCol + 0.5) * TRACK_WIDTH;
					this.y = (eachRow + 0.5) * TRACK_HEIGHT;
					this.checkpointCoords = {x: this.x, y: this.y, ang: this.ang};
					return;
				}
			}
		}
	}

	this.nitroHandling = function() {
		if(this.keyHeldNitro && this.nitroUses > 0 && !this.nitroOn) {
			this.nitroUses--;
			this.nitroOn = true;
		}
		if(this.nitroOn) {
			this.nitroTimer--;
			if(this.nitroTimer == 0) {
				this.nitroOn = false;
				this.nitroTimer = framesPerSecond * 2;
			}
		}

		if(this.nitroOn) {
			return {drivePower: NITRO_POWER, turnRate: Math.min(this.turnRate, NITRO_TURN_RATE)};
		} else {
			return {drivePower: DRIVE_POWER, turnRate: this.turnRate};
		}
	}

	this.move = function() {
		if(raining) {
			this.inertia = 2;
		} else {
			this.inertia = 0.5;
		}
		if(this.isAIControlled) {
			this.AIWaypointPathfinding();
			this.speed *= AI_SPEED_PENALTY;
		}
		if(this.z > 0) {
			this.speedZ -= GRAVITY;
		} else {
			this.speed *= this.speedDecayMultiplier;
			this.speedX *= this.speedDecayMultiplier;
			this.speedY *= this.speedDecayMultiplier;

			var turnMod = 1;
			if(this.keyHeldGas) {
				this.speed += this.nitroHandling().drivePower;
				turnMod = 1;
			}
			if(this.keyHeldReverse) {
				this.speed -= REVERSE_POWER;
				turnMod = -1;
			}
			if(Math.abs(this.speed) >= MIN_SPEED_TO_TURN) {
				if(this.keyHeldLeft) {
					this.ang -= this.nitroHandling().turnRate * turnMod;
				}
				if(this.keyHeldRight) {
					this.ang += this.nitroHandling().turnRate * turnMod;
				}
			}
		}

		var inertiaIndex = framesPerSecond * this.inertia - 1;
		var inertialSpeedX = this.inertialSpeed[inertiaIndex].sX;
		var inertialSpeedY = this.inertialSpeed[inertiaIndex].sY;

		this.speedX = Math.cos(this.ang) * this.speed;
		this.speedY = Math.sin(this.ang) * this.speed;

		this.x += this.speedX * 0.8 + inertialSpeedX * 0.2;
		this.y += this.speedY * 0.8 + inertialSpeedY * 0.2;

		this.z += this.speedZ;
		if(this.z < 0) {
			this.z = 0;
			this.speedZ = 0;
		}

		this.calculateCarEdges();
		carTrackHandling(this);

		this.inertialSpeed.unshift({sX: this.speedX, sY: this.speedY});
		this.inertialSpeed.pop();

		this.nitroTrail.pop();
		this.nitroTrail.pop();
		this.nitroTrail.unshift({x: this.carEdgePoints[3].x, y: this.carEdgePoints[3].y, z: this.z});
		this.nitroTrail.unshift({x: this.carEdgePoints[5].x, y: this.carEdgePoints[5].y, z: this.z});
		//if(this.speed > 1) {
		//	this.isMoving = true;
		//} else {
		//	this.isMoving = false;
		//}
		//this.engineSound.conditionalPlay(this.isMoving);
	}

	this.calculateCarEdges = function() {
		// Points start at front-centre and then every 45 degrees thereafter in a clockwise direction.
		var cl2 = CAR_LENGTH/2;
		var cw2 = CAR_WIDTH/2;
		var newX;
		var newY;
		this.carEdgePoints = [];
		var carEdgeDistFromCenter = [{x: cl2, y: 0},
									 {x: cl2, y: cw2},
									 {x: 0, y: cw2},
									 {x: -cl2, y: cw2},
									 {x: -cl2, y: 0},
									 {x: -cl2, y: -cw2},
									 {x: 0, y: -cw2},
									 {x: cl2, y: -cw2}];

		for(var i = 0; i < carEdgeDistFromCenter.length; i++) {
			newX = this.x + Math.cos(this.ang) * carEdgeDistFromCenter[i].x;
			newX += Math.sin(this.ang) * carEdgeDistFromCenter[i].y;
			newY = this.y + Math.sin(this.ang) * carEdgeDistFromCenter[i].x;
			newY -= Math.cos(this.ang) * carEdgeDistFromCenter[i].y;
			this.carEdgePoints.push({x: newX, y: newY});
		}
	}

	this.carToWallCollisions = function() {
		for(var i = 0; i < this.carEdgePoints.length; i++) {
			var pointTrackCol = Math.floor(this.carEdgePoints[i].x / TRACK_WIDTH);
			var pointTrackRow = Math.floor(this.carEdgePoints[i].y / TRACK_HEIGHT);
			var indexUnderPoint = rowColToArrayIndex(pointTrackCol, pointTrackRow);
			if(trackGrid[indexUnderPoint] == TRACK_WALL ||
				trackGrid[indexUnderPoint] == TRACK_TREE || trackGrid[indexUnderPoint] == TRACK_FLAG) {
				this.x += (this.x - this.carEdgePoints[i].x)/(Math.abs(this.carEdgePoints[i].x)) * (this.speed + 5)
				this.y += (this.y - this.carEdgePoints[i].y)/(Math.abs(this.carEdgePoints[i].y)) * (this.speed + 5);
				if(i % 4 == 0) {
					this.speed *= -0.8;
					this.inertialSpeed = [];
					for(var i = 0; i < framesPerSecond * this.inertia; i++) {
						this.inertialSpeed.push({sX: 0, sY: 0});
					}
				} else if (i % 2 != 0) {
					if(Math.abs(this.ang) % (Math.PI/2) >= Math.PI/4) {
						this.ang += Math.sign(this.ang) * Math.PI/32;
					} else {
						this.ang -= Math.sign(this.ang) * Math.PI/32;
					}
				}
			}
		}
	}

	this.AIStop = function() {
		this.keyHeldLeft = false;
		this.keyHeldRight = false;
		this.keyHeldGas = false;
		this.keyHeldReverse = false;
		this.keyHeldNitro = false;
	}

	this.AIWaypointPathfinding = function() {
		var carAtPoint = {x: this.x, y: this.y};
		var carFacingPoint  = {x: this.x + Math.cos(this.ang) * 10, y: this.y + Math.sin(this.ang) * 10};
		var waypointIndex = seekWaypointArrayIndex(this.nextWaypoint);
		var waypoint = arrayIndexToCentrePixel(waypointIndex);

		var carFacingVector = formVector(carAtPoint, carFacingPoint);
		var toWaypointVector = formVector(carAtPoint, waypoint);

		var angleToWaypoint = angleBetween(carFacingVector, toWaypointVector);
		var dot = dotProduct(carFacingVector, toWaypointVector);

		if(angleToWaypoint >= -Math.PI/32 && angleToWaypoint <= Math.PI/32) {
			this.keyHeldGas = true;
			this.keyHeldReverse = false;
			this.keyHeldLeft = false;
			this.keyHeldRight = false;
		} else if(angleToWaypoint > Math.PI/32 && angleToWaypoint <= Math.PI * 2 / 3) {
			this.keyHeldLeft = false;
			this.keyHeldRight = true;
			this.keyHeldGas = true;
			this.keyHeldReverse = false;
		} else if(angleToWaypoint < -Math.PI/32 && angleToWaypoint >= -Math.PI * 2 / 3) {
			this.keyHeldLeft = true;
			this.keyHeldRight = false;
			this.keyHeldGas = true;
			this.keyHeldReverse = false;
		} else if(angleToWaypoint > Math.PI * 2 /3 && angleToWaypoint <= Math.PI * 31 / 32) {
			this.keyHeldLeft = false;
			this.keyHeldRight = true;
			this.keyHeldGas = false;
			this.keyHeldReverse = true;
		} else if(angleToWaypoint < -Math.PI * 2 /3 && angleToWaypoint >= -Math.PI * 31 / 32) {
			this.keyHeldLeft = false;
			this.keyHeldRight = true;
			this.keyHeldGas = false;
			this.keyHeldReverse = true;
		} else {
			this.keyHeldGas = false;
			this.keyHeldReverse = true;
			this.keyHeldLeft = false;
			this.keyHeldRight = false;
		}
	}

	this.randomMovement = function() {
		var randomUpDown = Math.random();
		var randomLeftRight = Math.random();

		if(this.changeKeyTimer == framesPerSecond) {
			if(randomUpDown > 0.7) {
				this.keyHeldGas = true;
				this.keyHeldReverse = false;
			} else if(randomUpDown < 0.3) {
				this.keyHeldGas = false;
				this.keyHeldReverse = true;
			} else {
				this.keyHeldGas = false;
				this.keyHeldReverse = false;
			}
			if(randomLeftRight > 0.7) {
				this.keyHeldLeft = true;
				this.keyHeldRight = false;
			} else if(randomLeftRight < 0.3) {
				this.keyHeldLeft = false;
				this.keyHeldRight = true;
			} else {
				this.keyHeldLeft = false;
				this.keyHeldRight = false;
			}
		}

		this.changeKeyTimer--;
		if(this.changeKeyTimer < 0) {
			this.changeKeyTimer = framesPerSecond;
		}
	}

	this.angleToPoint = function(objectX, objectY) {
		var deltaX = this.x - objectX;
		var deltaY = this.y - objectY;

		return (Math.atan2(deltaY, deltaX));
	}

	this.relativeAngleToPoint = function(objectX, objectY) {
		var deltaX = this.x - objectX;
		var deltaY = this.y - objectY;

		return (this.ang - this.angleToPoint(objectX, objectY));
	}

	this.bounceFromPoint = function(angle, closingSpeed) {
		this.x += Math.cos(angle) * closingSpeed;
		this.y += Math.sin(angle) * closingSpeed;
	}

	this.draw = function(camX, camY) {
		if(this.nitroOn) {
			this.drawTrail(camX, camY);
		}
		drawBitmapCenteredWithRotation(carThemes[trackTheme][SHADOW], this.x, this.y, this.ang);
		drawBitmapCenteredWithRotation(carThemes[trackTheme][this.playerIndex], this.x, this.y - this.z, this.ang);

		//for(var i = 0; i < this.carEdgePoints.length; i++) {
		//	colourRect(this.carEdgePoints[i].x, this.carEdgePoints[i].y, 1, 1, 'red');
		//}
	}

	this.drawTrail = function(camX, camY) {
		for(var i = 0; i < this.nitroTrail.length; i++) {
			colourCircle(colourCircle(this.nitroTrail[i].x, this.nitroTrail[i].y - this.nitroTrail[i].z, 1, 'cyan'));
		}
	}
}

function carToCarCollisions() {
	var separationX = Math.abs(blueCar.x - greenCar.x);
	var separationY = Math.abs(blueCar.y - greenCar.y);
	var separationZ = Math.abs(blueCar.z - greenCar.z);
	var separationXY = Math.sqrt((separationX * separationX) + (separationY * separationY));
	var separationXYZ = Math.sqrt((separationXY * separationXY) + (separationZ * separationZ));

	var avgSizeAroundCenter = (CAR_LENGTH + CAR_WIDTH)/2;
	var closingSpeed = Math.abs(greenCar.speed + blueCar.speed);

	if(separationXYZ < avgSizeAroundCenter) {
		blueCar.bounceFromPoint(blueCar.angleToPoint(greenCar.x, greenCar.y), closingSpeed);
		greenCar.bounceFromPoint(greenCar.angleToPoint(blueCar.x, blueCar.y), closingSpeed);
	}
}

function formVector(point0, point1) {
	return {x: point1.x - point0.x, y: point1.y - point0.y};
}

function dotProduct(vector0, vector1) {
	return ((vector0.x * vector1.x) + (vector0.y * vector1.y));
}

function angleBetween(vector0, vector1) {
	return(Math.atan2(vector0.x * vector1.y - vector0.y * vector1.x, vector0.x * vector1.x + vector0.y * vector1.y));
}
