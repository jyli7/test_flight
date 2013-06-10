var SafeZone = function (game, xLeft, yTop, width, height) {
	this.game = game;
	this.width = width;
	this.height = height;
	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = yTop + this.height;
};

SafeZone.prototype.draw = function (ctx) {
	// Draw only those SafeZones that are in advance of the ship
	
		var threshold = -1 * this.game.translatedDistance;
		var bottomLine = threshold + canvas.height;
		var topLine = threshold - canvas.height;

		if (this.yTop < bottomLine && this.yTop > topLine ) {
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
		}
	
};

SafeZone.prototype.update = function () {};
