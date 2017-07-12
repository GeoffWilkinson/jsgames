//items
const ITEM_TYPES = ["hp", "maxhp", "javelins", "learnFlame"];

function itemClass() {
	this.x;
	this.y;
	this.isDead = false;
	this.modifier;
	this.itemType;
	this.itemColourCode;
	this.itemImage;

	this.setItemType = function(itemType, itemPower, droppedX, droppedY) {
		this.itemType = itemType;
		if(this.itemType == 0) {
			this.itemColourCode = "green";
			this.itemImage = hpItemPic;
		} else if(this.itemType == 1) {
			this.itemColourCode = "blue";
			this.itemImage = maxhpItemPic;
		} else if(this.itemType == 2) {
			this.itemColourCode = "yellow";
			this.itemImage = javelinPic;
		} else if(this.itemType == 3) {
			this.itemColourCode = "red";
			this.itemImage = flamePic;
		}
		this.modifier = itemPower;
		this.x = droppedX;
		this.y = droppedY;
	}

	this.pickup = function(finder) {
		if(this.itemType == 0) {
			finder.hp += this.modifier;
			if(finder.hp > finder.maxhp) {
				finder.hp = finder.maxhp;
			}
		} else if(this.itemType == 1) {
			finder.maxhp += this.modifier;
			finder.hp = finder.maxhp;
		} else if(this.itemType == 2) {
			finder.javelinAmmo += this.modifier;
			if(finder.javelinAmmo > finder.maxJavelinAmmo) {
				finder.javelinAmmo = finder.maxJavelinAmmo
			}
		}
		console.log(finder.name + " " + ITEM_TYPES[this.itemType] + " +" + this.modifier);
		this.isDead = true;
		deadEntitiesToClear = true;
	}

	this.draw = function() {
		colourRect(this.x - 2, this.y - 2, 4, 4, this.itemColourCode);
		drawBitmapCenteredAtLocation(this.itemImage, this.x, this.y);
	}
}

function spawnRandomItem(droppedX, droppedY) {
	var itemType;
	var itemPower;
	if(Math.random() < 0.3) {
		itemType = 0;
		itemPower = 2;
	} else if(Math.random() > 0.7) {
		itemType = 1;
		itemPower = 1;
	} else {
		itemType = 2;
		itemPower = 2;
	}
	var newItem = new itemClass();
	newItem.setItemType(itemType, itemPower, droppedX, droppedY);
	allItems.push(newItem);
}

function spawnSpecificItem(itemType, itemPower, droppedX, droppedY) {
	var newItem = new itemClass();
	newItem.setItemType(itemType, itemPower, droppedX, droppedY);
	allItems.push(newItem);
}