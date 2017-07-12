var warriorPic = document.createElement("img");
var batPic = document.createElement("img");
var ghostPic = document.createElement("img");
var flamePic = document.createElement("img");
var litTorchFlamePic = document.createElement("img");
var spellPic = document.createElement("img");
var javelinPic = document.createElement("img");
var pickAxePic = document.createElement("img");
var powerStonePic = document.createElement("img");
var bossKeyPic = document.createElement("img");
var swordPic = document.createElement("img");
var hpItemPic = document.createElement("img");
var maxhpItemPic = document.createElement("img");
var bossPic = document.createElement("img");
var bossSwordPic = document.createElement("img");
var barQPic = document.createElement("img");
var barEPic = document.createElement("img");
var barSpacePic = document.createElement("img");
var cursorPic = document.createElement("img");
var startGamePic = document.createElement("img");
var returnToTitlePic = document.createElement("img");
var titlePic = document.createElement("img");
var gameOverPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0;

function loadImages() {
	var imageList = [
		{entityName: warriorPic, theFile: "AK_warrior.png"},
		{entityName: bossPic, theFile: "AK_boss.png"},
		{entityName: batPic, theFile: "AK_bat.png"},
		{entityName: ghostPic, theFile: "AK_caster.png"},
		{entityName: flamePic, theFile: "flame.png"},
		{entityName: litTorchFlamePic, theFile: "lit_torch.png"},
		{entityName: javelinPic, theFile: "javelin.png"},
		{entityName: pickAxePic, theFile: "pickaxe.png"},
		{entityName: powerStonePic, theFile: "power_stone.png"},
		{entityName: bossKeyPic, theFile: "boss_key.png"},
		{entityName: spellPic, theFile: "spell.png"},
		{entityName: swordPic, theFile: "sword.png"},
		{entityName: bossSwordPic, theFile: "boss_sword.png"},
		{entityName: hpItemPic, theFile: "hp_item.png"},
		{entityName: maxhpItemPic, theFile: "maxhp_item.png"},
		{entityName: barQPic, theFile: "bar_q.png"},
		{entityName: barEPic, theFile: "bar_e.png"},
		{entityName: barSpacePic, theFile: "bar_space.png"},
		{entityName: cursorPic, theFile: "cursor.png"},
		{entityName: startGamePic, theFile: "game_start.png"},
		{entityName: returnToTitlePic, theFile: "return_to_title.png"},
		{entityName: titlePic, theFile: "title_screen.png"},
		{entityName: gameOverPic, theFile: "game_over_screen.png"},
		{entityName: hpItemPic, theFile: "hp_item.png"},
		{entityName: maxhpItemPic, theFile: "maxhp_item.png"},
		{worldType: TILE_FLOOR, theFile: "tile_floor.png"},
		{worldType: TILE_WALL, theFile: "tile_wall.png"},
		{worldType: TILE_HP_ROCK, theFile: "rock.png"},
		{worldType: TILE_ABYSS, theFile: "abyss.png"},
		{worldType: TILE_BOSS_DOOR, theFile: "boss_door.png"},
		{worldType: TILE_BOSS_DOOR_OPEN, theFile: "boss_door_open.png"},
		{worldType: TILE_JUMP_PAD_U, theFile: "jump_pad_up.png"},
		{worldType: TILE_JUMP_PAD_R, theFile: "jump_pad_right.png"},
		{worldType: TILE_JUMP_PAD_D, theFile: "jump_pad_down.png"},
		{worldType: TILE_JUMP_PAD_L, theFile: "jump_pad_left.png"},
		{worldType: TILE_ROCK, theFile: "rock.png"},
		{worldType: TILE_RUBBLE, theFile: "rubble.png"},
		{worldType: TILE_TORCH, theFile: "unlit_torch.png"},
		{worldType: TILE_SPIKES, theFile: "tile_spikes.png"},
		{worldType: TILE_PLAYER_START, theFile: "player_start.png"},
		{worldType: TILE_ENEMY_START, theFile: "enemy_start.png"},
		{worldType: TILE_BOSS_START, theFile: "boss_start.png"},
		{worldType: TILE_TORCH_DOOR_OPEN, theFile: "torch_door_open.png"},
		{worldType: TILE_TORCH_DOOR, theFile: "torch_door.png"},
		{worldType: SPAWN_LEARN_FLAME, theFile: "flame.png"},
		{worldType: SPAWN_PICKAXE, theFile: "pickaxe.png"},
		{worldType: SPAWN_POWER_STONE, theFile: "power_stone.png"},
		{worldType: SPAWN_BOSS_KEY, theFile: "boss_key.png"},
		{worldType: TILE_STAIRS_UP, theFile: "stairs_up.png"},
		{worldType: TILE_STAIRS_DOWN, theFile: "stairs_down.png"}
		];

	picsToLoad = imageList.length;

	for(var i = 0; i < imageList.length; i++) {
		if(imageList[i].entityName != undefined) {
			beginLoadingImage(imageList[i].entityName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = "images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}
