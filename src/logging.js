//     mechanic.js
//     Copyright (c) 2012 Jason Kozemczak
//     mechanic.js may be freely distributed under the MIT license.

(function($) {
    $.extend($, {
        log: function(s, level) {
            level = level || 'message';
            if (level === 'error') $.error(s);
            else if (level === 'warn') $.warn(s);
            else if (typeof $.isVerbose !== "undefined" && $.isVerbose) {
                if (level === 'debug') $.debug(s);
                else $.message(s);
            }
        },
        error: function(s) { UIALogger.logError(s); },
        warn: function(s) { UIALogger.logWarning(s); },
        debug: function(s) { UIALogger.logDebug(s); },
        message: function(s) { UIALogger.logMessage(s); },
        capture: function(imageName, rect) {
            var target = UIATarget.localTarget();
            imageName = imageName || new Date().toString();
            if (rect) target.captureRectWithName(rect, imageName);
            else target.captureScreenWithName(imageName);
        }
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
