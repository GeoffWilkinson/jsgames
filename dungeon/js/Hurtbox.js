function hurtboxClass(options) {
	this.offsetX = options.offsetX;
	this.offsetY = options.offsetY;
	this.x = this.offsetX;
	this.y = this.offsetY;
	this.radius = options.radius || 1;
	this.rotation = options.rotation || 0;

	this.duration = options.duration || 0;
	this.expired = options.expired || false;

	this.update = function(followOwner, owner) {
		if(followOwner) {
			this.rotation = owner.facing || 0;
			var angledOffsetX = Math.cos(this.rotation) * this.offsetX - Math.sin(this.rotation) * this.offsetY;
			var angledOffsetY = Math.sin(this.rotation) * this.offsetX + Math.cos(this.rotation) * this.offsetY;
			this.x = owner.x + angledOffsetX;
			this.y = owner.y + angledOffsetY;
		}
		this.duration--;
		if(this.duration < 0) {
			this.expired = true;
		}
	}
}