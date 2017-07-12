GRID_COLS = 3;
GRID_ROWS = 5;

var zero  = [1, 1, 1,
		     1, 0, 1,
		     1, 0, 1,
		     1, 0, 1,
		     1, 1, 1];

var one   = [0, 0, 1,
		     0, 0, 1,
		     0, 0, 1,
		     0, 0, 1,
		     0, 0, 1];

var two   = [1, 1, 1,
		     0, 0, 1,
		     1, 1, 1,
		     1, 0, 0,
		     1, 1, 1];

var three = [1, 1, 1,
		     0, 0, 1,
		     1, 1, 1,
		     0, 0, 1,
		     1, 1, 1];

var four  = [1, 0, 1,
		     1, 0, 1,
		     1, 1, 1,
		     0, 0, 1,
		     0, 0, 1];

var five  = [1, 1, 1,
		     1, 0, 0,
		     1, 1, 1,
		     0, 0, 1,
		     1, 1, 1];

var six   = [1, 1, 1,
		     1, 0, 0,
		     1, 1, 1,
		     1, 0, 1,
		     1, 1, 1];

var seven = [1, 1, 1,
		     0, 0, 1,
		     0, 0, 1,
		     0, 0, 1,
		     0, 0, 1];

var eight = [1, 1, 1,
		     1, 0, 1,
		     1, 1, 1,
		     1, 0, 1,
		     1, 1, 1];

var nine  = [1, 1, 1,
		     1, 0, 1,
		     1, 1, 1,
		     0, 0, 1,
		     1, 1, 1];

function drawNumToGrid(topLeftX, topLeftY, num, pixelScale, fillColour) {

	var numIn = num;
	if(numIn > 99) {
		numIn = 99;
	}

	var numTens = Math.floor(numIn/10);
	var numOnes = numIn - numTens * 10;

	var tensTopLeftX = topLeftX;
	var onesTopLeftX = topLeftX + (4 * pixelScale);

	if(numTens == 0) {
		drawGrid(tensTopLeftX, topLeftY, zero, pixelScale, fillColour);
	} else if(numTens == 1) {
		drawGrid(tensTopLeftX, topLeftY, one, pixelScale, fillColour);
	} else if(numTens == 2) {
		drawGrid(tensTopLeftX, topLeftY, two, pixelScale, fillColour);
	} else if(numTens == 3) {
		drawGrid(tensTopLeftX, topLeftY, three, pixelScale, fillColour);
	} else if(numTens == 4) {
		drawGrid(tensTopLeftX, topLeftY, four, pixelScale, fillColour);
	} else if(numTens == 5) {
		drawGrid(tensTopLeftX, topLeftY, five, pixelScale, fillColour);
	} else if(numTens == 6) {
		drawGrid(tensTopLeftX, topLeftY, six, pixelScale, fillColour);
	} else if(numTens == 7) {
		drawGrid(tensTopLeftX, topLeftY, seven, pixelScale, fillColour);
	} else if(numTens == 8) {
		drawGrid(tensTopLeftX, topLeftY, eight, pixelScale, fillColour);
	} else if(numTens == 9) {
		drawGrid(tensTopLeftX, topLeftY, nine, pixelScale, fillColour);
	}

	if(numOnes == 0) {
		drawGrid(onesTopLeftX, topLeftY, zero, pixelScale, fillColour);
	} else if(numOnes == 1) {
		drawGrid(onesTopLeftX, topLeftY, one, pixelScale, fillColour);
	} else if(numOnes == 2) {
		drawGrid(onesTopLeftX, topLeftY, two, pixelScale, fillColour);
	} else if(numOnes == 3) {
		drawGrid(onesTopLeftX, topLeftY, three, pixelScale, fillColour);
	} else if(numOnes == 4) {
		drawGrid(onesTopLeftX, topLeftY, four, pixelScale, fillColour);
	} else if(numOnes == 5) {
		drawGrid(onesTopLeftX, topLeftY, five, pixelScale, fillColour);
	} else if(numOnes == 6) {
		drawGrid(onesTopLeftX, topLeftY, six, pixelScale, fillColour);
	} else if(numOnes == 7) {
		drawGrid(onesTopLeftX, topLeftY, seven, pixelScale, fillColour);
	} else if(numOnes == 8) {
		drawGrid(onesTopLeftX, topLeftY, eight, pixelScale, fillColour);
	} else if(numOnes == 9) {
		drawGrid(onesTopLeftX, topLeftY, nine, pixelScale, fillColour);
	}

}

function drawGrid(topLeftX, topLeftY, gridIn, pixelScale, fillColour) {
	pixelOffsetX = topLeftX;
	pixelOffsetY = topLeftY;
	arrayIndex = 0;

	for(var i = 0; i < GRID_ROWS; i++) {
		for(var j = 0; j < GRID_COLS; j++) {
			if(gridIn[arrayIndex] == 1) {
				colourRect(pixelOffsetX, pixelOffsetY, pixelScale, pixelScale, fillColour);
			}
			pixelOffsetX += pixelScale;
			arrayIndex++;
		}
		pixelOffsetY += pixelScale;
		pixelOffsetX = topLeftX;
	}
}
