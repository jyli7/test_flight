var Canyon = function (game) {
	this.game = game;
	this.length = 1000;
	this.zIndex = 0;
};

Canyon.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(86, 57, 29)";
	ctx.fillRect(0, -this.length, canvas.width, canvas.height + this.length);
};

Canyon.prototype.update = function () {};