var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

var selectedUnits = [];
const MIN_DIST_TO_COUNT_DRAG = 10;
const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;

// Detect cursor
function calculateMousePos(evt) {

	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x:mouseX,
		y:mouseY
	};

} // end of calculateMousePos function

function mouseMovedEnoughToTreatAsDrag() {
	var deltaX = lassoX1 - lassoX2;
	var deltaY = lassoY1 - lassoY2;
	var dragDist = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
	return (dragDist > MIN_DIST_TO_COUNT_DRAG);
} // end of mouseMovedEnoughToTreatAsDrag function

function getUnitUnderMouse(currentMousePos) {
	return findClosestUnitInRange(currentMousePos.x, currentMousePos.y, MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE, allUnits);
} // end getUnitUnderMouse function

function mousemoveHandler(evt) {
	var mousePos = calculateMousePos(evt);
	if(isMouseDragging) {
		lassoX2 = mousePos.x;
		lassoY2 = mousePos.y;
	}
} // end of mousemoveHandler function

function mousedownHandler(evt) {
	var mousePos = calculateMousePos(evt);
	lassoX1 = mousePos.x;
	lassoY1 = mousePos.y;
	lassoX2 = lassoX1;
	lassoY2 = lassoY1;
	isMouseDragging = true;
}

function mouseupHandler(evt) {
	isMouseDragging = false;

	if(mouseMovedEnoughToTreatAsDrag()) {
		selectedUnits = [];

		for(var i = 0; i < playerUnits.length; i++) {
			if(playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
				selectedUnits.push(playerUnits[i]);
			}
		}
		document.getElementById("debugText").innerHTML = "Selected " + selectedUnits.length + " units";

	} else {
		var mousePos = calculateMousePos(evt);
		var clickedUnit = getUnitUnderMouse(mousePos);

		if(clickedUnit != null && clickedUnit.playerControlled == false) {
			for(var i = 0; i < selectedUnits.length; i++) {
				selectedUnits[i].setTarget(clickedUnit);
			}
			document.getElementById("debugText").innerHTML = "Player commands " + selectedUnits.length + " units to attack!";
		} else {
			var unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length + 2));
			for(var i = 0; i < selectedUnits.length; i++) {
				selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
			}
			document.getElementById("debugText").innerHTML = "Moving to (" + mousePos.x + "," + mousePos.y + ")";
		}
	}
}
