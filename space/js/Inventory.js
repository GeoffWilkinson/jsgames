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

function stackInventory(inventoryIn, intoInventory) {
	var stacked = false;
	if(!intoInventory) {
		var inventoryOut = [];
		for(var i = 0; i < inventoryIn.length; i++) {
			stacked = false;
			if(inventoryOut.length > 0) {
				for(var j = 0; j < inventoryOut.length; j++) {
					if(inventoryIn[i].item == inventoryOut[j].item && inventoryIn[i].item.stackable) {
						inventoryOut[j].count += inventoryIn[i].count;
						stacked = true;
						break;
					}
				}
				if(!stacked) {
					inventoryOut.push(inventoryIn[i]);
				}
			} else {
				inventoryOut.push(inventoryIn[i]);
			}
		}
		//console.log("inventoryOut = " + readInventory(inventoryOut));
		return inventoryOut;
	} else {
		for(var i = 0; i < inventoryIn.length; i++) {
			stacked = false;
			if(intoInventory.length > 0) {
				for(var j = 0; j < intoInventory.length; j++) {
					if(inventoryIn[i].item == intoInventory[j].item && inventoryIn[i].item.stackable) {
						intoInventory[j].count += inventoryIn[i].count;
						stacked = true;
						break;
					}
				}
				if(!stacked) {
					intoInventory.push(inventoryIn[i]);
				}
			} else {
				intoInventory.push(inventoryIn[i]);
			}
		}
		//console.log("intoInventory = " + readInventory(intoInventory));
		return intoInventory;
	}
}

function readInventory(inventoryIn) {
	var readThis = "";
	var delimiter = "";
	if(inventoryIn.length > 1) {
		delimiter = ", ";
	}
	for(var i = 0; i < inventoryIn.length; i++) {
		if(i == inventoryIn.length - 1) {
			delimiter = "";
		}
		readThis = readThis + inventoryIn[i].count + "x " + inventoryIn[i].item.name + delimiter;
	}
	return readThis;
}