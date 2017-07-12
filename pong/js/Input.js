const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_W = 87;
const KEY_S = 83;

const KEY_TOPNUM_1 = 49;
const KEY_TOPNUM_2 = 50;
const KEY_KEYPAD_1 = 97;
const KEY_KEYPAD_2 = 98;

var isTwoPlayer = false;
var isMouseControlled = true;

var player1KeyHeldUp = false;
var player1KeyHeldDown = false;
var player2KeyHeldUp = false;
var player2KeyHeldDown = false;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x:mouseX,
		y:mouseY
	};
}

function mousemoveHandler(evt) {
	if(isTwoPlayer == false && isMouseControlled) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - PADDLE_HEIGHT/2;

		if(paddle1Y + PADDLE_HEIGHT + NO_PADDLE_MARGIN > canvas.height) {
			paddle1Y = canvas.height - PADDLE_HEIGHT - NO_PADDLE_MARGIN;
		} else if(paddle1Y < NO_PADDLE_MARGIN) {
			paddle1Y = NO_PADDLE_MARGIN;
		}
	}
}

function setUpInputEventHandlers() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	canvas.addEventListener('mousemove', mousemoveHandler);
}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == KEY_W) {
		player1KeyHeldUp = setTo;
	}
	if(keyEvent.keyCode == KEY_S) {
		player1KeyHeldDown = setTo;
	}
	if(keyEvent.keyCode == KEY_UP_ARROW) {
		player2KeyHeldUp = setTo;
	}
	if(keyEvent.keyCode == KEY_DOWN_ARROW) {
		player2KeyHeldDown= setTo;
	}
}

function keyPressed(evt) {
	keySet(evt, true);

	if(showingControlSelection) {
		if(evt.keyCode == KEY_TOPNUM_1 || evt.keyCode == KEY_KEYPAD_1) {
			isMouseControlled = true;
			showingControlSelection = false;
			showingMenuScreen = false;
		}
		if(evt.keyCode == KEY_TOPNUM_2 || evt.keyCode == KEY_KEYPAD_2) {
			isMouseControlled = false;
			showingControlSelection = false;
			showingMenuScreen = false;
		}
	}
	if(showingMenuScreen) {
		if(evt.keyCode == KEY_TOPNUM_1 || evt.keyCode == KEY_KEYPAD_1) {
			player1Score = 0;
			player2Score = 0;
			isTwoPlayer = false;
			showingControlSelection = true;
		}
		if(evt.keyCode == KEY_TOPNUM_2 || evt.keyCode == KEY_KEYPAD_2) {
			player1Score = 0;
			player2Score = 0;
			isTwoPlayer = true;
			showingMenuScreen = false;
		}
	}
	evt.preventDefault();
}

function keyReleased(evt) {
	keySet(evt, false);
}
