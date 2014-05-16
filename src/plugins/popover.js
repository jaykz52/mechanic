// popover.js
// Copyright (c) 2012 Justin Wienckowski
// May be freely distributed under the MIT License

// Helper functions for dealing with popovers
(function($) {
    var target = UIATarget.localTarget();

    $.extend($, {
        popover: function() { return target.frontMostApp().mainWindow().popover(); }
    });

})(mechanic);

// Convenience function for selecting elements in the current popover, analagous to $().
var $P = function(selector) {
    var p = $.popover();
    if (!p) throw "Error: no popover is currently visible";
    return $(p).find(selector);
};
