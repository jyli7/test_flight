var TRIANGLE = 0;
var RECTANGLE = 1;

// Given a bound, returns anything between that bound and -1 * that bound.
// e.g. give it 100, and it returns something between -100 and 100
var volatilityFactor = function (bound) {
	return Math.random() * bound * 2 - bound;
}

var setMessage = function (id, message) {
	document.getElementById(id).innerHTML = message;
}

var wipeAllMessages = function () {
	setMessage('primary-message', "");
	setMessage('secondary-message', "");
}

var playSound = function (file) {
	
}

var mixin = function (obj, mixin) {
	for (var i in mixin) {
		obj[i] = mixin[i];
	}
}

var setUpAmmoBar = function (ship) {
	$('.ammo-count').html(ship.initialBulletCount);
}

var shortenAmmoBar = function (ship) {
	var totalWidth = $('.ammo-bar-container').width();
	var widthReduction = totalWidth / ship.initialBulletCount;
	var currentWidth = $('.ammo-bar').width();
	$('.ammo-bar').width(currentWidth - widthReduction);
	$('.ammo-count').html(ship.currentBulletCount);
}

var refillAmmoBar = function (ship) {
	var totalWidth = $('.ammo-bar-container').width();
	$('.ammo-bar').width(totalWidth);
	$('.ammo-count').html(ship.initialBulletCount);
}