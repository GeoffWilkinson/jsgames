var wave0 = {ufos: 1, asteroids: 0};
var wave1 = {ufos: 1, asteroids: 1};
var wave2 = {ufos: 2, asteroids: 2};
var wave3 = {ufos: 3, asteroids: 1};
var wave4 = {ufos: 4, asteroids: 2};

const WAVES = [wave0, wave1, wave2, wave3, wave4];

var level0 = [wave0, wave1, wave2, wave3, wave4];

const LEVELS = [level0];

var thisLevel = 0;
var thisWave = 0;

var maxLevel = LEVELS.length - 1;
var maxWave = WAVES.length - 1;

function loadLevel(levelNumber) {
	thisLevel = levelNumber;
	maxWave = LEVELS[thisLevel].length - 1;
	thisWave = 0;
	loadWave(thisLevel, thisWave);
}

function loadWave(levelNumber, waveNumber) {
	thisLevel = levelNumber;
	thisWave = waveNumber;
	console.log("level " + thisLevel + ", wave " + thisWave);

	for(var i = 0; i < LEVELS[thisLevel][thisWave].ufos; i++) {
		var newUFO = new UFOClass();
		newUFO.init(UFOPic);
		allUFOs.push(newUFO);
	}

	for(var i = 0; i < LEVELS[thisLevel][thisWave].asteroids; i++) {
		var newAsteroid = new asteroidClass();
		newAsteroid.init(asteroidPic);
		allAsteroids.push(newAsteroid);
	}
}
