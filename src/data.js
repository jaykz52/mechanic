//     mechanic.js
//     Copyright (c) 2012 Jason Kozemczak
//     mechanic.js may be freely distributed under the MIT license.

(function($) {
	var app = UIATarget.localTarget().frontMostApp();
	$.extend($.fn, {
		name: function() { return (this.length > 0) ? this[0].name() : null; },
		label: function() { return (this.length > 0) ? this[0].label() : null; },
		value: function() { return (this.length > 0) ? this[0].value() : null; },
		isFocused: function() { return (this.length > 0) ? this[0].hasKeyboardFocus() : false; },
		isVisible: function() { return (this.length > 0) ? this[0].isVisible() : false; },
		isValid: function(certain) {
			if (this.length > 0) return false;
			else if (certain) return this[0].checkIsValid();
			else return this[0].isValid();
		}
	});

	$.extend($, {
		version: function() {
			return app.version();
		},
		bundleId: function()  {
			return app.bundleID();
		},
		prefs: function(prefsOrKey) {
			// TODO: should we handle no-arg version that returns all prefs???
			if (typeof prefsToReturn == 'string') return app.preferencesValueForKey();
			else {
				$.each(prefsOrKey, function(val, key) {
					app.setPreferencesValueForKey(val, key);
				});
			}
		}
	});

})(mechanic);
