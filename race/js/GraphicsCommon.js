function drawBitmapPositionedByTopLeftCorner(graphic, atX, atY) {
	canvasContext.drawImage(graphic,atX,atY);
}

function drawBitmapCenteredAtLocation(graphic, atX, atY) {
	canvasContext.drawImage(graphic,atX-graphic.width/2,atY-graphic.height/2);
}

function drawBitmapCenteredWithRotation(graphic, atX, atY,withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colourRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colourCircle(centerX, centerY, radius, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function colourText(showWords, textX, textY, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.fillText(showWords, textX, textY);
}