function drawBitmapPositionedByTopLeftCorner(graphic, atX, atY) {
	canvasContext.drawImage(graphic, atX, atY, graphic.width, graphic.height);
}

function drawBitmapCenteredAtLocation(graphic, atX, atY) {
	canvasContext.drawImage(graphic,atX-graphic.width/2,atY-graphic.height/2, graphic.width, graphic.height);
}

function drawBitmapCenteredWithRotation(graphic, atX, atY, withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2, graphic.width, graphic.height); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colourRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function hollowRect(topLeftX, topLeftY, boxWidth, boxHeight, strokeColour, lineThickness) {
	canvasContext.strokeStyle = strokeColour;
	canvasContext.lineWidth = lineThickness;
	canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
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

function sprite(options) {
	var params = {};
	var frameIndexH = 1;
	var tickCount = 0;
	var ticksPerFrame = options.ticksPerFrame || 0;
	var numberOfFramesH = options.numberOfFramesH || 1;
	var numberOfFramesV = options.numberOfFramesV || 1;
	var forwards = true;

	params.width = options.width;
	params.height = options.height;
	params.frameWidth = params.width / numberOfFramesH;
	params.frameHeight = params.height / numberOfFramesV;
	params.x = 0;
	params.y = 0;
	params.image = options.image;
	params.orientationIndex = options.orientationIndex || 0;

	params.update = function() {
		tickCount++;
		if(tickCount > ticksPerFrame) {
			tickCount = 0;
			if(forwards) {
				if(frameIndexH < numberOfFramesH - 1) {
					frameIndexH++;
				} else {
					forwards = false;
				}
			} else {
				if(frameIndexH > 0) {
					frameIndexH--;
				} else {
					forwards = true;
				}
			}
		}
	}

	params.render = function() {
		canvasContext.drawImage(
			params.image,
			frameIndexH * params.frameWidth,
			params.orientationIndex * params.frameHeight,
			params.frameWidth,
			params.height / numberOfFramesV,
			params.x - (params.frameWidth / 2),
			params.y - (params.frameHeight / 2),
			params.frameWidth,
			params.frameHeight
			);
		}

	return params;
}
