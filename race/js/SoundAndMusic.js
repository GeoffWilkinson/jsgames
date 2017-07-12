var audioFormat;

function setFormat() {
	var audio = new Audio();
	if(audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function soundOverlapsClass(filenameWithPath) {
	setFormat();

	var altSoundTurn = false;
	var mainSound = new Audio(filenameWithPath + audioFormat);
	var altSound = new Audio(filenameWithPath + audioFormat);

	var loopSound = new Audio(filenameWithPath + audioFormat);
	var loopSoundLooping = false;

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

	this.enableLoop = function() {
		loopSound.loop = true;
	}

	this.conditionalPlay = function(action) {
		if(action && loopSoundLooping == false) {
			loopSound.play();
			loopSoundLooping = true;
		} else if(action == false && loopSoundLooping) {
			loopSound.pause();
			loopSoundLooping = false;
		}
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