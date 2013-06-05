var Game = function (ctx, scrollDistance) {
	this.ctx = ctx;
	this.scrollDistance = 2;
};

Game.prototype.inSafeZone = function () {
	for (var i = 0; i < this.safeZones.length; i ++) {
		var zone = this.safeZones[i];
		if (this.ship.x >= zone.xLeft && this.ship.x <= zone.xRight
		  && this.ship.y >= zone.yTop && this.ship.y <= zone.yBottom) {
		  return true;	
		}
	}
	return false;
}

Game.prototype.successOccurred = function () {
	// return this.ship.y <= 5;
}

Game.prototype.update = function (delta) {
	this.ship.update(delta);
	this.canyon.update(delta);

	if ( !this.inSafeZone() ) {
		console.log('collision!');
		this.init();
	} else if ( this.successOccurred() ) {
		console.log('you won!');
		this.init();
	}
};

Game.prototype.draw = function (ctx) {
	var that = this;
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);

	this.ctx.translate(0, this.scrollDistance);
	this.ctx.translatedDistance += this.scrollDistance;
	this.canyon.draw(this.ctx);
	this.safeZones.forEach (function (zone) {
		zone.draw(that.ctx);
	});
	this.ship.draw(this.ctx);
}

Game.prototype.init = function () {
	// Bring canvas back to original position
	this.ctx.translate(0, -this.ctx.translatedDistance);
	this.ctx.translatedDistance = 0;
	translatedY = 0;
	this.ship = new Ship();
	this.canyon = new Canyon();
	this.initSafeZones();
}

Game.prototype.initSafeZones = function () {
	this.safeZones = [];
	
	// For the base safe zone
	var baseWidth = canvas.width;
	var baseHeight = canvas.height / 4;
	var baseX = 0;
	var baseY = canvas.height - baseHeight;

	// For the other safe zones
	var standardWidth = this.ship.width * 5;
	var standardHeight = canvas.height / 6;
	var standardX = canvas.width / 2 - standardWidth / 2.
	
	// Create base safeZone
	this.safeZones.push(new SafeZone(baseX, baseY, baseWidth, baseHeight));

	// Starting from the top of the baseSafeZone, create other safeZones
	var x = standardX;
	var width = standardWidth;
	var height = standardHeight;

	xVolatility = 0.1;
	yVolatility = 0.05;
	widthVolatility = 0.02;
	heightVolatility = 0.02;

	// Set the x, y, width, height for lots of canyons
	for (var y = baseY; y >= -2000; y -= 3) {
		x = x * volatilityMultiple(xVolatility);
		width = width * volatilityMultiple(widthVolatility);
		height = height * volatilityMultiple(heightVolatility);
		this.safeZones.push(new SafeZone(x, y, width, height));
	}
}

window.onload = function () {
	// Run game loop when user hits enter
	addEventListener("keydown", function (e) {
		if (e.keyCode == 13) {
			startGame();
		}
	}, false);
}

var startGame = function () {
	// Hide the start screen
	document.getElementById('start-screen').className = 'hidden';

	// Set up the canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 600;

	// Init the game
	var game = new Game();
	game.ctx = ctx;
	game.init(ctx);
	game.draw(ctx);

	// Start the countdown, 3...2...1
	var count = 3;
	var countdown = setInterval(function () {
		// At end of countdown, stop the countdown and start the game loop
		var countdownElement = document.getElementById('countdown');
		if (count > 0) {
			countdownElement.innerHTML = count;
			count--;
		} else {
			clearInterval(countdown);
			countdownElement.innerHTML = "";
			
			// Start the game loop	
			var then = Date.now();
			setInterval(function () {
				var now = Date.now();
				var delta = (now - then) / 1000;
				
				game.update(delta);
				game.draw(ctx);

				then = now;
			}, 10); // Execute as fast as possible
		}
	}, 750);
}
