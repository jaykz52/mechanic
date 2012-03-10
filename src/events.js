//     mechanic.js
//     Copyright (c) 2012 Jason Kozemczak
//     mechanic.js may be freely distributed under the MIT license.

(function($) {
	var target = UIATarget.localTarget();
	$.extend($, {
		timeout: function(duration) { target.setTimeout(duration); },
		delay: function(seconds) { target.delay(seconds); },
		cmd: function(path, args, timeout) { target.host().performTaskWithPathArgumentsTimeout(path, args, timeout); },
		orientation: function(orientation) {
			if (orientation === undefined || orientation === null) return target.deviceOrientation();
			else target.setDeviceOrientation(orientation);
		},
		location: function(coordinates, options) {
			options = options || {};
			target.setLocationWithOptions(options);
		},
		shake: function() { target.shake(); },
		rotate: function(options) { target.rotateWithOptions(options); },
		pinchScreen: function(options) {
			if (!options.style) options.style = 'open';
			if (options.style === 'close') target.pinchCloseFromToForDuration(options.from, options.to, options.duration);
			else target.pinchOpenFromToForDuration(options.from, options.to, options.duration);
		},
		drag: function(options) { target.dragFromToForDuration(options.from, options.to, options.duration); },
		flick: function(options) { target.flickFromTo(options.from, options.to); },
		lock: function(duration) { target.lockForDuration(duration); },
		backgroundApp: function(duration) { target.deactivateAppForDuration(duration); },
		volume: function(direction, duration) {
			if (direction === 'up') {
				if (duration) target.holdVolumeUp(duration)
				else target.clickVolumeUp();
			} else {
				if (duration) target.holdVolumeDown(duration);
				else target.clickVolumeDown();
			}
		},
		input: function(s) {
			target.frontMostApp().keyboard().typeString(s);
		}
	});

	$.extend($.fn, {
		tap: function(options) {
			options = options || {};
			return this.each(function() {
				// TODO: tapWithOptions supports most of the behavior of doubleTap/twoFingerTap looking at the API, do we need to support these methods??
				if (options.style === 'double') this.doubleTap();
				else if (options.style === 'twoFinger') this.twoFingerTap();
				else this.tapWithOptions(options);
			});
		},
		touch: function(duration) {
			return this.each(function() { this.touchAndHold(duration); });
		},
		dragInside: function(options) {
			return this.each(function() { this.dragInsideWithOptions(options); });
		},
		flick: function(options) {
			return this.each(function() { this.flickInsideWithOptions(options); });
		},
		rotate: function(options) {
			return this.each(function() { this.rotateWithOptions(options); });
		},
		scrollToVisible: function() {
			if (this.length > 0) this[0].scrollToVisible();
			return this;
		},
		input: function(s) {
			if (this.length > 0) {
				this[0].tap();
				$.input(s);
			}
		}
	});

    'delay,cmd,orientation,location,shake,pinchScreen,drag,lock,backgroundApp,volume'.split(',').forEach(function(property) {
      	var fn = $[property];
      	$.fn[property] = function() {
			fn.apply($, arguments);
			return this;
		};
  	});
})(mechanic);
