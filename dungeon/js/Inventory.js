var inventoryOpen = false;

var swordButtonDimensions = {topLeftX: 210, topLeftY: 210, width: 50, height: 50};
var pickAxeButtonDimensions = {topLeftX: 280, topLeftY: 210, width: 50, height: 50};
var javelinButtonDimensions = {topLeftX: 210, topLeftY: 280, width: 50, height: 50};
var flameButtonDimensions = {topLeftX: 280, topLeftY: 280, width: 50, height: 50};
var powerStoneButtonDimensions = {topLeftX: 210, topLeftY: 350, width: 50, height: 50};
var bossKeyButtonDimensions = {topLeftX: 280, topLeftY: 350, width: 50, height: 50};

var mouseOnSword = false;
var mouseOnPickAxe = false;
var mouseOnJavelin = false;
var mouseOnFlame = false;

function selectInventoryItem() {
	if(mouseOnSword) {
		playerWarrior.usingSword = true;
		playerWarrior.usingPickAxe = false;
	} else if(mouseOnPickAxe && playerWarrior.pickAxeFound) {
		playerWarrior.usingSword = false;
		playerWarrior.usingPickAxe = true;
	} else if(mouseOnJavelin) {
		playerWarrior.usingJavelin = true;
		playerWarrior.usingFlame = false;
	} else if(mouseOnFlame && playerWarrior.flameLearned) {
		playerWarrior.usingJavelin = false;
		playerWarrior.usingFlame = true;
	}
}

function mouseInBox(buttonDimensions) {
	if(mouseX > buttonDimensions.topLeftX && mouseX < buttonDimensions.topLeftX + buttonDimensions.width && mouseY > buttonDimensions.topLeftY && mouseY < buttonDimensions.topLeftY + buttonDimensions.height) {
		return true;
	} else {
		return false;
	}
}

function detectMouseover() {
	if(mouseInBox(swordButtonDimensions)) {
		mouseOnSword = true;
		mouseOnPickAxe = false;
		mouseOnJavelin = false;
		mouseOnFlame = false;
	} else if(mouseInBox(pickAxeButtonDimensions)) {
		mouseOnSword = false;
		mouseOnPickAxe = true;
		mouseOnJavelin = false;
		mouseOnFlame = false;
	} else if(mouseInBox(javelinButtonDimensions)) {
		mouseOnSword = false;
		mouseOnPickAxe = false;
		mouseOnJavelin = true;
		mouseOnFlame = false;
	} else if(mouseInBox(flameButtonDimensions)) {
		mouseOnSword = false;
		mouseOnPickAxe = false;
		mouseOnJavelin = false;
		mouseOnFlame = true;
	} else {
		mouseOnSword = false;
		mouseOnPickAxe = false;
		mouseOnJavelin = false;
		mouseOnFlame = false;
	}
}

function highlightInventoryItem() {
	detectMouseover();
	if(mouseOnSword) {
		drawHighlight(swordButtonDimensions, "hover");
	} else if(mouseOnPickAxe && playerWarrior.pickAxeFound) {
		drawHighlight(pickAxeButtonDimensions, "hover");
	} else if(mouseOnJavelin) {
		drawHighlight(javelinButtonDimensions, "hover");
	} else if(mouseOnFlame && playerWarrior.flameLearned) {
		drawHighlight(flameButtonDimensions, "hover");
	}
}

function drawButton(whichImage, buttonDimensions) {
	hollowRect(buttonDimensions.topLeftX, buttonDimensions.topLeftY, buttonDimensions.width, buttonDimensions.height, 'white', 3);
	colourRect(buttonDimensions.topLeftX, buttonDimensions.topLeftY, buttonDimensions.width, buttonDimensions.height, 'grey');
	drawBitmapPositionedByTopLeftCorner(whichImage, buttonDimensions.topLeftX, buttonDimensions.topLeftY);
}

function drawHighlight(buttonDimensions, highlightType) {
	var highlightColour;
	if(highlightType == "hover") {
		highlightColour = 'yellow';
	} else if(highlightType == "selected") {
		highlightColour = 'green';
	}
	hollowRect(buttonDimensions.topLeftX, buttonDimensions.topLeftY, buttonDimensions.width, buttonDimensions.height, highlightColour, 7);
}

function drawInventory() {
	canvasContext.globalAlpha = 0.6;
	colourRect(0, 0, canvas.width, canvas.height, 'black');
	canvasContext.globalAlpha = 1;
	colourRect(175, 175, canvas.width - 350, canvas.height - 350, 'white');
	colourRect(180, 180, canvas.width - 360, canvas.height - 360, 'black');

	//melee weapons
	drawButton(swordPic, swordButtonDimensions);
	if(playerWarrior.pickAxeFound) {
		drawButton(pickAxePic, pickAxeButtonDimensions);
	}

	//ranged weapons
	drawButton(javelinPic, javelinButtonDimensions);
	if(playerWarrior.flameLearned) {
		drawButton(flamePic, flameButtonDimensions);
	}

	//artifacts
	if(playerWarrior.powerStoneFound) {
		drawButton(powerStonePic, powerStoneButtonDimensions);
	}
	if(playerWarrior.hasBossKey) {
		drawButton(bossKeyPic, bossKeyButtonDimensions);
	}
	highlightInventoryItem();
	if(playerWarrior.usingSword) {
		drawHighlight(swordButtonDimensions, "selected");
	} else if(playerWarrior.usingPickAxe) {
		drawHighlight(pickAxeButtonDimensions, "selected");
	}
	if(playerWarrior.usingJavelin) {
		drawHighlight(javelinButtonDimensions, "selected");
	} else if(playerWarrior.usingFlame) {
		drawHighlight(flameButtonDimensions, "selected");
	}
}