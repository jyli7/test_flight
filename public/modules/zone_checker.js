(function (exports) {

	/////////////////////////////////////////
	// HOW POINTS AND ZONES WORK
	/////////////////////////////////////////
	
	// POINTS have an 'x' and a 'y' attribute
	// targetZones have four attributes: yBottom, yTop, xLeft, and xRight
	// SOURCE_ZONES have 3 or 4 POINTS, depending on whether the SOURCE_ZONE is a triangle or rectangle
	
	// Examples of valid questions:
	// Is a POINT in the TARGET_ZONE?
	// Is an SOURCE_ZONE fully in the TARGET_ZONE?

	exports.pointInTargetZone = function (point, targetZone) {
		return ((point.y >= targetZone.yTop && point.y <= targetZone.yBottom) &&
					 	(point.x >= targetZone.xLeft && point.x <= targetZone.xRight));
	}

	exports.pointInAnyOfTargetZones = function (point, targetZones) {
		var result = false;
		targetZones.forEach(function (targetZone) {
			if (pointInTargetZone(point, targetZone)) {
				result = true;
			};
		});
		return result;
	}

	// e.g. triangle is entirely within rectangle
	exports.sourceZoneEntirelyInAnyTargetZone = function (sourceZone, targetZones) {
		var result = true;
		sourceZone.points().forEach(function (point) {
			if (!pointInAnyOfTargetZones(point, targetZones)) {
				result = false;
			}
		});
		return result;
	}

	// e.g. triangle top tip is in specific rectangle
	exports.sourceZoneVertexInTargetZone = function (sourceZone, targetZone) {
		var result = false;
		sourceZone.points().forEach(function (point) {
			if (pointInTargetZone(point, targetZone)) {
				result = true;
			}
		});
		return result;
	}

	// e.g. triangle top tip is in any of 5 rectangles
	exports.sourceZoneVertexInAnyTargetZones = function (sourceZone, targetZones) {
		var result = false;
		if (targetZones) {
			targetZones.forEach(function (targetZone) {
				if (sourceZoneVertexInTargetZone(sourceZone, targetZone)) {
					result = true;
				}
			});
			return result;
		}
	}

	// e.g. if any of these triangle's vertices is in specific rectangle
	exports.anySourceZoneVertexInTargetZone = function (sourceZones, targetZone) {
		var result = false;
		var relevantSourceZone;
		if (sourceZones) {
			sourceZones.forEach(function (sourceZone) {
				if (sourceZoneVertexInTargetZone(sourceZone, targetZone)) {
					result = true;
					relevantSourceZone = sourceZone;
					return false;
				}
			});
			return { result: result, sourceZone: relevantSourceZone };
		}
	}

	exports.sourceZoneInSafeZone = function (sourceZone) {
		return sourceZoneEntirelyInAnyTargetZone(sourceZone, sourceZone.level.safeZones);
	}

	exports.sourceZoneVertexTouchPillar = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.pillars);
	}

	exports.sourceZoneVertexTouchGateWall = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.gateWalls);
	}

	exports.sourceZoneVertexTouchBullet = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.bullets);
	}

	exports.sourceZoneVertexTouchEnemyShip = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.enemyShips);	
	}

	exports.sourceZoneVertexTouchAsteroid = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.asteroids);
	}

	exports.sourceZoneBeyondVictoryLine = function (sourceZone) {
		return (sourceZone.yTop <= sourceZone.level.victoryZone.yBottom);
	}

})(this);