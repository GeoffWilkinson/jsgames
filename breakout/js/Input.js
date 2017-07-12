var mouseX;
var mouseY;

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddleX = mouseX - PADDLE_WIDTH/2;
	for(var i = 0; i < ballList.length; i++) {
		if(ballList[i].ballHeld) {
			ballList[i].ballX = paddleX - ballList[i].heldX;
		}
	}

	for(var i = 0; i < missileList.length; i++) {
		if(missileList[i].isLaunched == false) {
			missileList[i].x = paddleX + missileList[i].heldX;
		}
	}
}

function mouseupHandler(evt) {
	if(showingTitleScreen) {
		showingTitleScreen = false;
		victoryText = false;
		startSound.play();
	} else {
		for(var i = 0; i < ballList.length; i++) {
			ballList[i].ballHeld = false;
		}
		for(var i = 0; i < missileList.length; i++) {
			if(missileList[i].isLaunched == false && missileList[i].isExploding == false) {
				missileList[i].isLaunched = true;
				launchSound.play();
				break;
			}
		}
	}
}

function setUpEventListeners() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mouseup', mouseupHandler);
}
