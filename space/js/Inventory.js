function spawnInventory() {
	var drops = [];
	for(var i = 0; i < ITEM_TYPES.length; i++) {
		// If the drop rate is greater than an integer value then we automatically drop it that many times.
		if(Math.floor(ITEM_TYPES[i].dropRate) > 0) {
			drops.push({count: Math.floor(ITEM_TYPES[i].dropRate), item: ITEM_TYPES[i]});
		}
		// For the non-integer portion of the drop rate, we roll to see if we drop the item.
		if(Math.random() <= ITEM_TYPES[i].dropRate - Math.floor(ITEM_TYPES[i].dropRate)) {
			drops.push({count: 1, item: ITEM_TYPES[i]});
		}
	}
	// Stack inventory items before returning.
	return stackInventory(drops);
}

function stackInventory(inventoryIn) {
	var inventoryOut = [];
	for(var i = 0; i < inventoryIn.length; i++) {
		if(inventoryOut.length > 0) {
			for(var j = 0; j < inventoryOut.length; j++) {
				if(inventoryIn[i].item == inventoryOut[j].item && inventoryIn[i].item.stackable) {
					inventoryOut[j].count += inventoryIn[i].count;
				} else {
					inventoryOut.push(inventoryIn[i]);
				}
			}
		} else {
			inventoryOut.push(inventoryIn[i]);
		}
	}
	return inventoryOut;
}

function readInventory(inventoryIn) {
	var readThis = "";
	var delimiter = "";
	if(inventoryIn.length > 1) {
		delimiter = ", ";
	}
	for(var i = 0; i < inventoryIn.length; i++) {
		readThis = readThis + inventoryIn[i].count + "x " + inventoryIn[i].item.name + delimiter;
	}
	return readThis;
}