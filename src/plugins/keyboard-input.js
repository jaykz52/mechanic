// keyboard-input.js
// Copyright (c) 2012 Justin Wienckowski
// May be freely distributed under the MIT License

// Helper functions related to keyboard handling.  
//
// These functions include workarounds for issues observed in Instruments 4.4 and 4.5.1 that sometimes cause
// test failures or app crashes if keyboard interaction is attempted while animation is still in progress.
//
// To disable these workarounds, include the following code in your test:
//      $.kbDelay = 0;
//      $.mixedCaseInputWorkaround = false;

(function($) {

    // Automatic delay before and after buggy keyboard actions.  Adjust as needed, may be dependant on computer speed.
    $.kbDelay = 0.5;

    // Set to true to work around failures caused by trying to input mixed-case strings using $.input(). 
    $.mixedCaseInputWorkaround = true;

    var target = UIATarget.localTarget();
    var _ki_oldInput = $.input;

    $.extend($, {
        hideKeyboard: function() { $.delay($.kbDelay); target.frontMostApp().keyboard().buttons()["Hide keyboard"].tap(); $.delay($.kbDelay); },

        input: function(text) {
            $.delay($.kbDelay);

            // UIAutomation sometimes fails to change the keyboard case correctly for mixed-case strings when
            // using typeString(), resulting in a crash.  Typing a single character at a time is slower but 
            // avoids this issue.
            if ($.mixedCaseInputWorkaround && text.match('[A-Z]')) {
                var kb = target.frontMostApp().keyboard();
                for (var i = 0; i < text.length; i++) {
                    kb.typeString(text.charAt(i));
                }
            } else _ki_oldInput(text);

            $.delay($.kbDelay);
        }
    });

    $.extend($.fn, {
        hideKeyboard: function() {
            $.hideKeyboard();
            return this;
        },

        isTextInput: function() {
            return this.length > 0 && (this[0].isType('textfield') || this[0].isType('textview') || this[0].isType('secure') || this[0].isType('searchbar'));
        },

        textInputs: function() {
            return this.find('textfield').add('textview', this).add('secure', this).add('searchbar', this);
        },

        setValue: function(value) {
            return this.each(function() { this.setValue(value); });
        },

        // Safer way to set the value of a text input control (use on other types of controls is a no-op)
        setText: function(value) {
            if (this.isTextInput())
                this[0].setValue(value);
            else
                this.textInputs().setValue(value);
            return this;
        },

        // Safer way to clear the value of a text input control (use on other types of controls is a no-op)
        clearText: function() {
            if (this.isTextInput()) {
                this[0].setValue('');
            } else {
                this.textInputs().setValue('');
            }
            return this;
        }
    });
})(mechanic);

