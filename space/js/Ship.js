// tuning constants
const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

shipClass.prototype = new movingWrapPositionClass(); 

function shipClass() {

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  // key controls used for this 
  this.setupControls = function(forwardKey, backKey, leftKey, rightKey, spaceBar) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
    this.shotKey = spaceBar;
  }

  this.init = function(whichGraphic) {
    this.myShot = new shotClass();
    this.myBitmap = whichGraphic;
    this.reset();
  }
  
  this.superclassReset = this.reset;

  this.reset = function() {

    this.superclassReset();

    this.ang = -0.5 * Math.PI;

    this.myShot.reset();

  } // end of reset
  
  this.superclassMove = this.move;

  this.move = function() {
    // only allow turning while it's moving
    if(this.keyHeld_TurnLeft) {
      this.ang -= TURN_RATE*Math.PI;
    }

    if(this.keyHeld_TurnRight) {
      this.ang += TURN_RATE*Math.PI;
    }
    
    if(this.keyHeld_Gas) {

      this.xv += Math.cos(this.ang) * THRUST_POWER;
      this.yv += Math.sin(this.ang) * THRUST_POWER;

    }
    
    this.superclassMove();

    this.xv *= SPACESPEED_DECAY_MULT;
    this.yv *= SPACESPEED_DECAY_MULT;

    this.myShot.move();

  }

  this.cannonFire = function() {

    if(this.myShot.isShotReadyToFire()) {
      this.myShot.shootFrom(this);
    }

  }

  this.checkMyShipAndShotCollisionAgainst = function(thisEnemy) {

    if(thisEnemy.isOverlappingPoint(this.x,this.y)) {

      this.reset();
      document.getElementById("debugText").innerHTML = "Player Crashed!";

    }
    if(this.myShot.hitTest(thisEnemy)) {

      thisEnemy.reset();
      this.myShot.reset();
      document.getElementById("debugText").innerHTML = "Enemy Blasted!";

    }

  }

  this.draw = function() {

    this.myShot.draw();
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);

  }

} // end of class