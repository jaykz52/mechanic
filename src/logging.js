(function($) {
 	$.extend($, {
 		log: function(s, level) {
 			level = level || 'message';
 			if (level === 'error') UIALogger.logError(s);
 			else if (level === 'warn') UIALogger.logWarning(s);
 			else if (level === 'debug') UIALogger.logDebug(s);
 			else UIALogger.logMessage(s);
 		},
 		error: function(s) { $.log(s, 'error'); },
 		warn: function(s) { $.log(s, 'warn'); },
 		debug: function(s) { $.log(s, 'debug'); },
 		message: function(s) { $.log(s, 'message'); }
 	});
	
 	$.extend($.fn, {
 		log: function() { return this.each(function() { this.logElement(); }); },
 		logTree: function () { return this.each(function() { this.logElementTree(); }); },
 		capture: function(imageName) {
 			imageName = imageName || new Date().toString();
 			return this.each(function() { $.capture(imageName + '-' + this.name(), this.rect()); });
 		}
 	});
 })(mechanic);