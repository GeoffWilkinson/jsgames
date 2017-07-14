const BASE_HIT_SCORE = 100;
const COMBO_TIMEOUT = 150

var totalScore = 0;
var highScore = 0;
var timeSinceLastHit = COMBO_TIMEOUT;
var hitCombo = 1;
var hitComboReset = true;

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

function awardScore(forEntity) {
	var scoreGained = calculateHitScore();
	addScoreToTotal(scoreGained);

	var hitScore = new floatingTextClass();
	hitScore.init(scoreGained, forEntity.x, forEntity.y, 'yellow');
	allFloatingText.push(hitScore);

	var combo = new floatingTextClass();
	combo.init(hitCombo + "x combo", p1.x, p1.y, 'yellow');
	allFloatingText.push(combo);
}

function drawScore() {
	colourText("Score: " + totalScore + " High Score: " + highScore, 10, 10, 'yellow');
}