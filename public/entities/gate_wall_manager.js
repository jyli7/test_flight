var GateWallManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.xVolatility = 500;
	this.maxGapWidth = this.level.ship.width * 10;
	this.minGapWidth = this.level.ship.width * 5;
	this.meanGapWidth = (this.maxGapWidth + this.minGapWidth) / 2;
	this.gapWidthVolatility = this.meanGapWidth * 0.2;

	this.meanX = canvas.width * 0.5 - this.meanGapWidth * 0.5;
	this.meanYInterval = 1350;
	this.yIntervalVolatility = 350;

	this.minimumX = 0;
	this.maximumX = canvas.width - this.maxGapWidth;
};

GateWallManager.prototype.init = function (ctx) {
	this.level.gateWalls = this.level.gateWalls || [];

	var x = this.meanX;
	var gapWidth = this.meanGapWidth;

	for (var y = -this.level.warmUpLength * 1.5; y >= this.level.victoryZone.yBottom * 1.01; y-= this.meanYInterval + volatilityFactor(this.yIntervalVolatility)) {
		x += volatilityFactor(this.xVolatility);
		gapWidth += volatilityFactor(this.gapWidthVolatility);

		// Ad hoc fixes (TOASK: move this elsewhere?)
		if (x <= this.minimumX) { x += this.maxGapWidth; }
		if (x >= this.maximumX) { x -= this.maxGapWidth; }

		this.level.gateWalls.push(new GateWall(this.level, this.game, 0, x, y));
		this.level.gateWalls.push(new GateWall(this.level, this.game, x + gapWidth, canvas.width, y));
	}
}