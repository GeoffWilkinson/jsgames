var item0 = {name: "Common Metal Scrap", icon: undefined, value: 10, equippable: false, stackable: true, rarity: 1, dropRate: 1};
var item1 = {name: "Rare Metal Scrap", icon: undefined, value: 40, equippable: false, stackable: true, rarity: 2, dropRate: 0.5};
var item2 = {name: "Exotic Metal Scrap", icon: undefined, value: 90, equippable: false, stackable: true, rarity: 3, dropRate: 0.125};

const ITEM_TYPES = [item0, item1, item2];

function itemClass() {
	this.init = function(itemType) {
		this.type = itemType;
	}

	this.draw = function() {
		// For icons
	}
}