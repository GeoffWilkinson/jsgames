var carThemes = [];
var trackThemes = [];
var titlePic = document.createElement("img");
var button1Pic = document.createElement("img");
var button2Pic = document.createElement("img");
var cursorPic = document.createElement("img");

var picsToLoad = 0;

function loadImages() {

	trackThemes = [];
	for(var i = 0; i < numThemes; i++) {
		trackThemes[i] = [];
	}
	carThemes = [];
	for(var i = 0; i < numThemes; i++) {
		carThemes[i] = [];
	}

	var imageList = [
		{theme: DAY_THEME, playerNum: P1, theFile: "player1_day.png"},
		{theme: DAY_THEME, playerNum: P2, theFile: "player2_day.png"},
		{theme: NIGHT_THEME, playerNum: P1, theFile: "player1_night.png"},
		{theme: NIGHT_THEME, playerNum: P2, theFile: "player2_night.png"},
		{theme: DAY_THEME, playerNum: SHADOW, theFile: "car_shadow.png"},
		{theme: NIGHT_THEME, playerNum: SHADOW, theFile: "car_shadow.png"},
		{theme: DAY_THEME, trackType: TRACK_ROAD, theFile: "track_road_day.png"},
		{theme: DAY_THEME, trackType: TRACK_PLAYER_START, theFile: "player_start.png"},
		{theme: DAY_THEME, trackType: TRACK_WALL, theFile: "track_wall_day.png"},
		{theme: DAY_THEME, trackType: TRACK_GOAL, theFile: "track_goal_day.png"},
		{theme: DAY_THEME, trackType: TRACK_TREE, theFile: "track_treeWall_day.png"},
		{theme: DAY_THEME, trackType: TRACK_FLAG, theFile: "track_flagWall_day.png"},
		{theme: DAY_THEME, trackType: TRACK_GRASS, theFile: "track_grass_day.png"},
		{theme: DAY_THEME, trackType: TRACK_OIL, theFile: "track_oil_day.png"},
		{theme: DAY_THEME, trackType: TRACK_PLAYER_ORIENT, theFile: "player_orient.png"},
		{theme: DAY_THEME, trackType: TRACK_RAMP, theFile: "track_ramp_day.png"},
		{theme: DAY_THEME, trackType: CHECKPOINT_A, theFile: "checkpoint_A.png"},
		{theme: DAY_THEME, trackType: CHECKPOINT_B, theFile: "checkpoint_B.png"},
		{theme: DAY_THEME, trackType: CHECKPOINT_C, theFile: "checkpoint_C.png"},
		{theme: DAY_THEME, trackType: CHECKPOINT_D, theFile: "checkpoint_D.png"},
		{theme: NIGHT_THEME, trackType: TRACK_ROAD, theFile: "track_road_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_PLAYER_START, theFile: "player_start.png"},
		{theme: NIGHT_THEME, trackType: TRACK_WALL, theFile: "track_wall_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_GOAL, theFile: "track_goal_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_TREE, theFile: "track_treeWall_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_FLAG, theFile: "track_flagWall_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_GRASS, theFile: "track_grass_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_OIL, theFile: "track_oil_night.png"},
		{theme: NIGHT_THEME, trackType: TRACK_PLAYER_ORIENT, theFile: "player_orient.png"},
		{theme: NIGHT_THEME, trackType: TRACK_RAMP, theFile: "track_ramp_night.png"},
		{theme: NIGHT_THEME, trackType: CHECKPOINT_A, theFile: "checkpoint_A.png"},
		{theme: NIGHT_THEME, trackType: CHECKPOINT_B, theFile: "checkpoint_B.png"},
		{theme: NIGHT_THEME, trackType: CHECKPOINT_C, theFile: "checkpoint_C.png"},
		{theme: NIGHT_THEME, trackType: CHECKPOINT_D, theFile: "checkpoint_D.png"},
		{imageVar: titlePic, theFile: "title_screen.png"},
		{imageVar: button1Pic, theFile: "single_player.png"},
		{imageVar: button2Pic, theFile: "two_player.png"},
		{imageVar: cursorPic, theFile: "cursor.png"}
		];

	picsToLoad = imageList.length;

	for(var i = 0; i < imageList.length; i++) {
		if(imageList[i].playerNum != undefined) {
			loadImageForCarCode(imageList[i].theme, imageList[i].playerNum, imageList[i].theFile);
		} else if(imageList[i].trackType != undefined) {
			loadImageForTrackCode(imageList[i].theme, imageList[i].trackType, imageList[i].theFile);
		} else {
			beginLoadingImage(imageList[i].imageVar, imageList[i].theFile);
		}
	}

}

function countLoadedImagesAndLaunchIfReady() {
		picsToLoad--;
		if(picsToLoad == 0) {
			allPicturesLoaded = true;
			tryToStart();
		}
	}

function beginLoadingImage(imgVar, fileName) {

	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = "images/" + fileName;

}

function loadImageForCarCode(theme, carCode, fileName) {

	carThemes[theme][carCode] = document.createElement("img");
	beginLoadingImage(carThemes[theme][carCode], fileName);

}

function loadImageForTrackCode(theme, trackCode, fileName) {

	trackThemes[theme][trackCode] = document.createElement("img");
	beginLoadingImage(trackThemes[theme][trackCode], fileName);

}
