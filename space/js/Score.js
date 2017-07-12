const BASE_HIT_SCORE = 100;
const COMBO_TIMEOUT = 150

var totalScore = 0;
var highScore = 0;
var timeSinceLastHit = COMBO_TIMEOUT;
var hitCombo = 1;

function calculateHitScore() {
	timeSinceLastHit = 0;
	if(hitComboReset) {
		hitCombo = 1;
	} else {
		hitCombo++;
	}

	return(BASE_HIT_SCORE * hitCombo);
}

function addScoreToTotal(newScore) {
	totalScore += newScore;
	highScore = Math.max(highScore, totalScore);
}

function drawScore() {
	colourText("Score: " + totalScore + " High Score: " + highScore, 10, 10, 'yellow');
}