var audioFormat;

var swordSwingSound = new soundOverlapsClass("audio/sword_swing");
var swordHitWallSound = new soundOverlapsClass("audio/wall_hit");
var javelinThrowSound = new soundOverlapsClass("audio/fire_arrow");
var javelinHitWallSound = new soundOverlapsClass("audio/arrow_wall_hit");
var enemyPainSound = new soundOverlapsClass("audio/enemy_hit");
var playerPainSound = new soundOverlapsClass("audio/player_hit");
var batDeathSound = new soundOverlapsClass("audio/bat_death");

function setFormat() {
	var audio = new Audio();
	if(audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else if(audio.canPlayType("audio/wav")) {
		audioFormat = ".wav";
	} else if(audio.canPlayType("audio/ogg")) {
		audioFormat = ".ogg";
	}
}

function soundOverlapsClass(filenameWithPath) {
	setFormat();

	var altSoundTurn = false;
	var mainSound = new Audio(filenameWithPath + audioFormat);
	var altSound = new Audio(filenameWithPath + audioFormat);
	mainSound.muted = true;
	altSound.muted = true;

	this.play = function() {
		if(altSoundTurn) {
			altSound.currentTime = 0;
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			mainSound.play();
		}
		altSoundTurn != altSoundTurn;
	}
}

function backgroundMusicClass() {
	var musicSound = null;

	this.loopSong = function(filenameWithPath) {
		setFormat();

		if(musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath + audioFormat);
		musicSound.loop = true;
		musicSound.play();
	}

	this.startOrStopMusic = function() {
		if(musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
	}
}