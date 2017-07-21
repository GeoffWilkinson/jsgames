var equipMenuBoxX = 100;
var equipMenuBoxY = 100;
var equipMenuBoxWidth = 600;
var equipMenuBoxHeight = 400;

var equipInvBoxX = 100;
var equipInvBoxY = 164;
var equipInvBoxWidth = 288;
var equipInvBoxHeight = 336;

var equipInvTabsBoxX = 100;
var equipInvTabsBoxY = 100;
var equipInvTabsBoxWidth = 288;
var equipInvTabsBoxHeight = 64;

var equipShipTabsBoxX = 388;
var equipShipTabsBoxY = 100;
var equipShipTabsBoxWidth = 312;
var equipShipTabsBoxHeight = 64;

var equipShipEquipBoxX = 388;
var equipShipEquipBoxY = 164;
var equipShipEquipBoxWidth = 312;
var equipShipEquipBoxHeight = 336;

var buttonEquipX = [604, 112, 232, 400, 460];
var buttonEquipY = [500, 140, 140, 140, 140];
var buttonEquipWidth = [72, 120, 72, 60, 72];
var buttonEquipHeight = [24, 24, 24, 24, 24];

var buttonHighlightEquipX = 0;
var buttonHighlightEquipY = 0;
var buttonHighlightEquipWidth = 0;
var buttonHighlightEquipHeight = 0;
// cursorVisible is reused for this menu.

function checkButtonHoverEquip() {
	cursorVisible = false;
	for(i = 0; i < buttonEquipX.length; i++) {
		if(mouseX > buttonEquipX[i] && mouseX < buttonEquipX[i] + buttonEquipWidth[i] && mouseY > buttonEquipY[i] && mouseY < buttonEquipY[i] + buttonEquipHeight[i]) {
			cursorVisible = true;
			buttonHighlightEquipX = buttonEquipX[i];
			buttonHighlightEquipY = buttonEquipY[i];
			buttonHighlightEquipWidth = buttonEquipWidth[i];
			buttonHighlightEquipHeight = buttonEquipHeight[i];
		}
	}
}

function handleButtonClickEquip() {
	for(i = 0; i < buttonEquipX.length; i++) {
		if(mouseX > buttonEquipX[i] && mouseX < buttonEquipX[i] + buttonEquipWidth[i]) {
			if(mouseY > buttonEquipY[i] && mouseY < buttonEquipY[i] + buttonEquipHeight[i]) {
				if(i == 0) {
					switchMode(3, 10);
				}
			}
		}
	}
}

function drawEquipScreen() {
	// to produce a faded effect
	drawInGame();
	canvasContext.save();
	canvasContext.globalAlpha = 0.5;
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	// boxes
	// full menu
	canvasContext.globalAlpha = 1;
	colourRect(equipMenuBoxX, equipMenuBoxY, equipMenuBoxWidth, equipMenuBoxHeight, 'black');
	canvasContext.globalAlpha = 0.15;
	colourRect(equipMenuBoxX, equipMenuBoxY, equipMenuBoxWidth, equipMenuBoxHeight, 'white');
	canvasContext.restore();
	hollowRect(equipMenuBoxX, equipMenuBoxY, equipMenuBoxWidth, equipMenuBoxHeight, 'black', 1);
	hollowRect(equipMenuBoxX, equipMenuBoxY, equipMenuBoxWidth, equipMenuBoxHeight, 'grey', 1);

	// back button
	canvasContext.save();
	colourRect(buttonEquipX[0], buttonEquipY[0], buttonEquipWidth[0], buttonEquipHeight[0], 'black');
	canvasContext.globalAlpha = 0.15;
	colourRect(buttonEquipX[0], buttonEquipY[0], buttonEquipWidth[0], buttonEquipHeight[0], 'white');
	canvasContext.restore();
	hollowRect(buttonEquipX[0], buttonEquipY[0], buttonEquipWidth[0], buttonEquipHeight[0], 'black', 1);
	hollowRect(buttonEquipX[0], buttonEquipY[0], buttonEquipWidth[0], buttonEquipHeight[0], 'grey', 1);

	// tab buttons
	canvasContext.save();
	colourRect(buttonEquipX[1], buttonEquipY[1], buttonEquipWidth[1], buttonEquipHeight[1], 'black');
	colourRect(buttonEquipX[2], buttonEquipY[2], buttonEquipWidth[2], buttonEquipHeight[2], 'black');
	colourRect(buttonEquipX[3], buttonEquipY[3], buttonEquipWidth[3], buttonEquipHeight[3], 'black');
	colourRect(buttonEquipX[4], buttonEquipY[4], buttonEquipWidth[4], buttonEquipHeight[4], 'black');
	canvasContext.globalAlpha = 0.15;
	colourRect(buttonEquipX[1], buttonEquipY[1], buttonEquipWidth[1], buttonEquipHeight[1], 'white');
	colourRect(buttonEquipX[2], buttonEquipY[2], buttonEquipWidth[2], buttonEquipHeight[2], 'white');
	colourRect(buttonEquipX[3], buttonEquipY[3], buttonEquipWidth[3], buttonEquipHeight[3], 'white');
	colourRect(buttonEquipX[4], buttonEquipY[4], buttonEquipWidth[4], buttonEquipHeight[4], 'white');
	canvasContext.restore();
	hollowRect(buttonEquipX[1], buttonEquipY[1], buttonEquipWidth[1], buttonEquipHeight[1], 'black', 1);
	hollowRect(buttonEquipX[1], buttonEquipY[1], buttonEquipWidth[1], buttonEquipHeight[1], 'grey', 1);
	hollowRect(buttonEquipX[2], buttonEquipY[2], buttonEquipWidth[2], buttonEquipHeight[2], 'black', 1);
	hollowRect(buttonEquipX[2], buttonEquipY[2], buttonEquipWidth[2], buttonEquipHeight[2], 'grey', 1);
	hollowRect(buttonEquipX[3], buttonEquipY[3], buttonEquipWidth[3], buttonEquipHeight[3], 'black', 1);
	hollowRect(buttonEquipX[3], buttonEquipY[3], buttonEquipWidth[3], buttonEquipHeight[3], 'grey', 1);
	hollowRect(buttonEquipX[4], buttonEquipY[4], buttonEquipWidth[4], buttonEquipHeight[4], 'black', 1);
	hollowRect(buttonEquipX[4], buttonEquipY[4], buttonEquipWidth[4], buttonEquipHeight[4], 'grey', 1);

	// inventory
	hollowRect(equipInvBoxX, equipInvBoxY, equipInvBoxWidth, equipInvBoxHeight, 'black', 1);
	hollowRect(equipInvBoxX, equipInvBoxY, equipInvBoxWidth, equipInvBoxHeight, 'grey', 1);
	for(var i = 0; i < 6; i++) {
		for(var j = 0; j < 7; j++) {
			hollowRect(equipInvBoxX + i * 48, equipInvBoxY + j * 48, 48, 48, 'black', 1);
			hollowRect(equipInvBoxX + i * 48, equipInvBoxY + j * 48, 48, 48, 'grey', 1);
		}
	}

	// left side tabs
	hollowRect(equipInvTabsBoxX, equipInvTabsBoxY, equipInvTabsBoxWidth, equipInvTabsBoxHeight, 'black', 1);
	hollowRect(equipInvTabsBoxX, equipInvTabsBoxY, equipInvTabsBoxWidth, equipInvTabsBoxHeight, 'grey', 1);

	// right side tabs
	hollowRect(equipInvTabsBoxX, equipInvTabsBoxY, equipInvTabsBoxWidth, equipInvTabsBoxHeight, 'black', 1);
	hollowRect(equipInvTabsBoxX, equipInvTabsBoxY, equipInvTabsBoxWidth, equipInvTabsBoxHeight, 'grey', 1);

	// ship equipment
	hollowRect(equipShipEquipBoxX, equipShipEquipBoxY, equipShipEquipBoxWidth, equipShipEquipBoxHeight, 'black', 1);
	hollowRect(equipShipEquipBoxX, equipShipEquipBoxY, equipShipEquipBoxWidth, equipShipEquipBoxHeight, 'grey', 1);

	// left side (modules)
	for(var i = 0; i < 3; i++) {
		hollowRect(equipShipEquipBoxX + 12, equipShipEquipBoxY + 24 + i * 72, 48, 48, 'black', 1);
		hollowRect(equipShipEquipBoxX + 12, equipShipEquipBoxY + 24 + i * 72, 48, 48, 'grey', 1);
	}
	// right side (mods)
	for(var i = 0; i < 3; i++) {
		hollowRect(equipShipEquipBoxX + equipShipEquipBoxWidth - 60, equipShipEquipBoxY + 24 + i * 72, 48, 48, 'black', 1);
		hollowRect(equipShipEquipBoxX + equipShipEquipBoxWidth - 60, equipShipEquipBoxY + 24 + i * 72, 48, 48, 'grey', 1);
	}
	// bottom (weapons)
	for(var i = 0; i < 4; i++) {
		hollowRect(equipShipEquipBoxX + 12 + i * 56, equipShipEquipBoxY + equipShipEquipBoxHeight - 66, 48, 48, 'black', 1);
		hollowRect(equipShipEquipBoxX + 12 + i * 56, equipShipEquipBoxY + equipShipEquipBoxHeight - 66, 48, 48, 'grey', 1);
	}
	// bottom (superweapon mod)
	hollowRect(equipShipEquipBoxX + equipShipEquipBoxWidth - 72, equipShipEquipBoxY + equipShipEquipBoxHeight - 72, 60, 60, 'black', 1);
	hollowRect(equipShipEquipBoxX + equipShipEquipBoxWidth - 72, equipShipEquipBoxY + equipShipEquipBoxHeight - 72, 60, 60, 'grey', 1);

	// ship image
	var shipScaleX = 4;
	var shipScaleY = 4;
	canvasContext.save();
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.scale(shipScaleX,shipScaleY);
	drawBitmapCenteredAtLocationWithRotation(playerPic, (equipShipEquipBoxX + equipShipEquipBoxWidth/2) / shipScaleX, (equipShipEquipBoxY + equipShipEquipBoxHeight * 2/5) / shipScaleY, -Math.PI/2);
	canvasContext.restore();

	// button text
	drawBitmapCenteredAtLocation(backSmallButtonPic, buttonEquipX[0] + buttonEquipWidth[0]/2, buttonEquipY[0] + buttonEquipHeight[0]/2);
	drawBitmapCenteredAtLocation(equipmentSmallButtonPic, buttonEquipX[1] + buttonEquipWidth[1]/2, buttonEquipY[1] + buttonEquipHeight[1]/2);
	drawBitmapCenteredAtLocation(miscSmallButtonPic, buttonEquipX[2] + buttonEquipWidth[2]/2, buttonEquipY[2] + buttonEquipHeight[2]/2);
	drawBitmapCenteredAtLocation(shipSmallButtonPic, buttonEquipX[3] + buttonEquipWidth[3]/2, buttonEquipY[3] + buttonEquipHeight[3]/2);
	drawBitmapCenteredAtLocation(statsSmallButtonPic, buttonEquipX[4] + buttonEquipWidth[4]/2, buttonEquipY[4] + buttonEquipHeight[4]/2);

	// highlight on mouseover
	if(cursorVisible == true) {
		canvasContext.save();
		canvasContext.globalAlpha = 0.3;
		colourRect(buttonHighlightEquipX, buttonHighlightEquipY, buttonHighlightEquipWidth, buttonHighlightEquipHeight, 'white');
		canvasContext.restore();
		hollowRect(buttonHighlightEquipX, buttonHighlightEquipY, buttonHighlightEquipWidth, buttonHighlightEquipHeight, 'grey', 1);
	}
}