// countrols.js
// Copyright (c) 2012 Justin Wienckowski
// May be freely distributed under the MIT License

// Helper functions for specific UIKit controls.
(function($) {

    $.extend($.fn, {
        // Switch controls
        switchOn: function() {
            return this.find('switch').setValue(1);
        },
        switchOff: function() {
            return this.find('switch').setValue(0);
        },
        
        // Counter controls
        increment: function() {
            return this.find('#Increment').tap();
        },
        decrement: function() {
            return this.find('#Decrement').tap();
        }
    });

})(mechanic);
