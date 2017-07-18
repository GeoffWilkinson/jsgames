const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const TILE_GAP = 2;
const TILE_COLS = 16;
const TILE_ROWS = 12;
const WORLD_ROWS = 5;
const WORLD_COLS = 5;

var level0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var level1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 3, 0, 1, 1, 1, 9, 9, 9, 9, 9, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 9, 1, 1, 0, 1, 1, 10, 1, 1, 1, 1, 0, 0, 0, 0, 0, 9, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 3, 0, 1, 1, 1, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 3, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level2 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 9, 9, 9, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 9, 1, 9, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 9, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 9, 9, 9, 0, 0, 1, 1, 1, 16, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 0, 6, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 18, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 9, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 9, 9, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level4 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 9, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 6, 1, 9, 0, 0, 9, 1, 1, 9, 9, 9, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 9, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 9, 1, 1, 9, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 9, 1, 1, 9, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 1, 1, 1, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level5 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 0, 14, 14, 0, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 12, 12, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 10, 0, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level6 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 9, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 9, 0, 3, 0, 0, 10, 0, 0, 0, 0, 0, 19, 0, 0, 1, 1, 9, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 9, 9, 9, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 14, 14, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 0, 12, 12, 0, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level7 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 0, 0, 3, 0, 10, 0, 0, 10, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 3, 0, 10, 0, 0, 10, 0, 3, 0, 0, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level8 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 3, 0, 1, 1, 0, 0, 1, 1, 0, 3, 0, 1, 1, 1, 1, 0, 0, 0, 1, 9, 0, 0, 9, 1, 0, 0, 0, 1, 1, 1, 9, 9, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 9, 9, 1, 1, 9, 9, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 9, 9, 1, 1, 1, 0, 0, 0, 1, 9, 0, 0, 9, 1, 0, 0, 0, 1, 1, 1, 1, 0, 3, 0, 1, 1, 0, 0, 1, 1, 0, 3, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level9 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 0, 0, 0, 9, 9, 1, 1, 1, 1, 1, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 9, 1, 1, 1, 1, 0, 0, 13, 5, 15, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 0, 0, 13, 5, 15, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 0, 0, 0, 9, 9, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level10 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 10, 0, 10, 5, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 10, 0, 10, 5, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 14, 5, 5, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 12, 5, 5, 1, 0, 0, 10, 0, 0, 0, 0, 0, 1, 1, 5, 5, 0, 5, 5, 1, 0, 0, 10, 0, 0, 0, 0, 6, 1, 1, 5, 5, 0, 5, 5, 1, 0, 0, 1, 1, 1, 1, 16, 1, 1, 1, 5, 5, 0, 5, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 5, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 20, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level11 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 0, 14, 14, 0, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 12, 12, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 0, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level12 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 10, 0, 21, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var level13 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 9, 1, 1, 1, 9, 0, 0, 0, 0, 9, 5, 0, 0, 0, 0, 0, 9, 9, 1, 1, 6, 0, 10, 0, 0, 13, 5, 15, 0, 0, 0, 3, 0, 9, 1, 1, 9, 0, 0, 0, 0, 9, 5, 0, 0, 0, 0, 0, 0, 9, 1, 1, 5, 5, 5, 5, 5, 5, 5, 0, 10, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 22, 1, 1, 1, 1, 1, 1, 16, 1, 1, 16, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 7, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 3, 3, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level14 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 23, 1, 1, 1, 9, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 9, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var level15 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 9, 9, 1, 1, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 9, 1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 1, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 9, 1, 1, 9, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];

var floor0 = [level0, level3, level0, level12, level0, level1, level2, level4, level5, level7, level0, level0, level0, level6, level8, level0, level0, level13, level11, level9, level0, level0, level0, level0, level10];
var floor1 = [level0, level0, level0, level0, level0, level0, level0, level0, level0, level0, level0, level0, level15, level0, level0, level0, level0, level14, level0, level0, level0, level0, level0, level0, level0];

var allLevels = [floor0, floor1];
var loadedLevels = [];
var loadedEntities = [];
var thisLevelIndex = 0;
var thisFloorIndex = 0;
var worldGrid = [];
var oldWorldGrid = [];

const TILE_FLOOR = 0;
const TILE_WALL = 1;
const TILE_PLAYER_START = 2;
const TILE_ENEMY_START = 3;
const TILE_HP_ROCK = 4;
const TILE_ABYSS = 5;
const TILE_TORCH = 6;
const TILE_BOSS_DOOR = 7;
const TILE_BOSS_DOOR_OPEN = 8;
const TILE_SPIKES = 9;
const TILE_ROCK = 10;
const TILE_RUBBLE = 11;
const TILE_JUMP_PAD_U = 12;
const TILE_JUMP_PAD_R = 13;
const TILE_JUMP_PAD_D = 14;
const TILE_JUMP_PAD_L = 15;
const TILE_TORCH_DOOR = 16;
const TILE_TORCH_DOOR_OPEN = 17;
const SPAWN_LEARN_FLAME = 18;
const SPAWN_PICKAXE = 19;
const SPAWN_POWER_STONE = 20;
const SPAWN_BOSS_KEY = 21;
const TILE_STAIRS_UP = 22;
const TILE_STAIRS_DOWN = 23;
const TILE_BOSS_START = 24;

function unlockAllTorchDoors() {
	for(var i = 0; i < worldGrid.length; i++) {
		if(worldGrid[i] == 16) {
			worldGrid[i] = 17;
		}
	}
}

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < TILE_COLS &&
		row >= 0 && row < TILE_ROWS) {
		var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[worldIndexUnderCoord];
	} else {
		return TILE_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / TILE_WIDTH);
	var warriorWorldRow = Math.floor(atY / TILE_HEIGHT);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < TILE_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < TILE_ROWS) {
		var tileHere = worldIndexUnderWarrior;
		return tileHere;
	}
	return undefined;
}

function getPixelCoordAtTileIndex(tileIndex) {
	var atX = ((tileIndex % TILE_COLS) + 0.5) * TILE_WIDTH;
	var atY = (Math.floor(tileIndex / TILE_COLS) + 0.5) * TILE_HEIGHT;
	return {x: atX, y: atY};
}

function rowColToArrayIndex(col, row) {
	return col + TILE_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_HP_ROCK ||
			checkTileType == TILE_SPIKES ||
			checkTileType == TILE_TORCH ||
			checkTileType == TILE_BOSS_DOOR_OPEN ||
			checkTileType == TILE_TORCH_DOOR_OPEN ||
			checkTileType == TILE_ROCK ||
			checkTileType == TILE_RUBBLE ||
			checkTileType == TILE_JUMP_PAD_U ||
			checkTileType == TILE_JUMP_PAD_R ||
			checkTileType == TILE_JUMP_PAD_D ||
			checkTileType == TILE_JUMP_PAD_L ||
			checkTileType == SPAWN_LEARN_FLAME ||
			checkTileType == SPAWN_PICKAXE ||
			checkTileType == SPAWN_POWER_STONE ||
			checkTileType == SPAWN_BOSS_KEY ||
			checkTileType == TILE_PLAYER_START ||
			checkTileType == TILE_ENEMY_START ||
			checkTileType == TILE_BOSS_START);
}

function drawOldWorld() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	if(transition) {
		canvasContext.save();
		canvasContext.translate(transitionX - Math.sign(transitionX) * 800, transitionY - Math.sign(transitionY) * 600);
	}

	for(var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
		for(var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
			var tileTypeHere = oldWorldGrid[arrayIndex];
			if(tileTypeHasTransparency(tileTypeHere)) {
				drawBitmapPositionedByTopLeftCorner(worldPics[TILE_FLOOR], drawTileX, drawTileY);
			}
			drawBitmapPositionedByTopLeftCorner(worldPics[tileTypeHere], drawTileX, drawTileY);
			arrayIndex++;
			drawTileX += TILE_WIDTH;
		}
		drawTileX = 0;
		drawTileY += TILE_HEIGHT;
	}

	if(transition) {
		canvasContext.restore();
	}
}

function drawWorld() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for(var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
		for(var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
			var tileTypeHere = worldGrid[arrayIndex];
			if(tileTypeHasTransparency(tileTypeHere)) {
				drawBitmapPositionedByTopLeftCorner(worldPics[TILE_FLOOR], drawTileX, drawTileY);
			}
			drawBitmapPositionedByTopLeftCorner(worldPics[tileTypeHere], drawTileX, drawTileY);
			arrayIndex++;
			drawTileX += TILE_WIDTH;
		}
		drawTileX = 0;
		drawTileY += TILE_HEIGHT;
	}
}
