const BEAM_RANGE = 360;
const BEAM_WIDTH = 12;
const BEAM_LIFE = 60;
const BEAM_COLOUR = 'cyan';

var playerBeams = [];

function beamClass() {
	this.init = function(colour) {
		this.colour = colour;
		this.width = 0;
		this.rangeRealised = 0;
		this.isDead = false;
		this.markedEntity = undefined;
		this.rangeToMarkedEntity = undefined;
	}

	this.move = function() {
		if(origin.isDead) {
			this.isDead = true;
		}

		this.x = this.origin.x;
		this.y = this.origin.y;
		this.ang = this.origin.ang;

		if(this.beamLife > 0) {
			this.beamLife--;
		} else {
			this.isDead = true;
		}

		this.endX = this.x + Math.cos(this.ang) * this.maxRange;
		this.endY = this.y + Math.sin(this.ang) * this.maxRange;
	}

	this.shootFrom = function(shipFiring, beamWidth, beamRange, beamLife, beamDamage) {
		this.origin = shipFiring;
		this.x = this.origin.x;
		this.y = this.origin.y;
		this.ang = this.origin.ang;

		this.maxRange = beamRange;
		this.beamLife = beamLife;
		this.beamDamage = beamDamage;

		this.beamWidth = beamWidth;

		this.endX = this.x + Math.cos(this.ang) * this.maxRange;
		this.endY = this.y + Math.sin(this.ang) * this.maxRange;
	}

	this.detectCollisionWithEntity = function(otherEntity, givesScore) {
		if(otherEntity == this.markedEntity) {
			if(givesScore) {
				awardScore(otherEntity);
			}
			otherEntity.isDead = true;
			this.markedEntity = undefined;
			this.rangeToMarkedEntity = undefined;
		}
	}

	this.markEntityForDeath = function(otherEntity) {
		var beamFacingVector = {x: Math.cos(this.ang), y: Math.sin(this.ang)};
		var vectorToTarget = {x: otherEntity.x - this.x, y: otherEntity.y - this.y};
		var angleToTarget = Math.atan2(beamFacingVector.x * vectorToTarget.y - beamFacingVector.y * vectorToTarget.x, beamFacingVector.x * vectorToTarget.x + beamFacingVector.y * vectorToTarget.y);
		var distanceToTarget = distanceBetween(this, otherEntity);

		var beamSeparationPerpendicularToTarget = Math.abs(Math.sin(angleToTarget) * distanceToTarget);
		var beamLengthPerpendicularToTarget = Math.abs(Math.cos(angleToTarget) * distanceToTarget);

		var angleFromTargetToTargetEdge = 90 - angleToTarget;
		var beamLengthInsideTarget = Math.abs(Math.cos(angleFromTargetToTargetEdge) * otherEntity.collisionRadius);

		if(Math.abs(angleToTarget) <= Math.PI/2 && beamSeparationPerpendicularToTarget <= otherEntity.collisionRadius + this.beamWidth/2 && beamLengthPerpendicularToTarget - beamLengthInsideTarget <= this.maxRange) {
			if(this.rangeToMarkedEntity == undefined || distanceToTarget < this.rangeToMarkedEntity) {
				this.markedEntity = otherEntity;
				this.rangeToMarkedEntity = distanceToTarget;

				this.endX = this.x + Math.cos(this.ang) * this.rangeToMarkedEntity;
				this.endY = this.y + Math.sin(this.ang) * this.rangeToMarkedEntity;
			}
		}
	}

	this.draw = function() {
		colourLine(this.x, this.y, this.endX, this.endY, this.colour, this.width);
	}
} // end of class
