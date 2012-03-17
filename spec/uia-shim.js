function extend(c, p) {
    c.prototype = new p();
    c.prototype.constructor = p;
    c.prototype.toString = function() {
        // TODO: this function is pretty awful, but we'll deal since it's just to set up a semi-accurate picture of UIAutomation as it stands
        var parts = c.toString().match(/function\s*(\w+)/);
        return "[object " + parts[1] + "]";
     };
}


function UIAElementArray() {}
extend(UIAElementArray, Array);
UIAElementArray.prototype.toArray = function() { return this; }

function UIAElement() { }
extend(UIAElement, Object);
UIAElement.prototype.name = function(name) { 
    if (!name) return this.internalName;
    else this.internalName = name;
};
UIAElement.prototype.label = function(label) { 
    if (!label) return this.internalLabel;
    else this.internalLabel = label;
};
UIAElement.prototype.value = function(val) { 
    if (!val) return this.internalValue;
    else this.internalValue = val;
};
UIAElement.prototype.isVisible = function(val) { 
    if (val === undefined) return this.internalVisible;
    else this.internalVisible = val;
};
UIAElement.prototype.hasKeyboardFocus = function(focused) { 
    if (focused === undefined) return this.internalFocused;
    else this.internalFocused = focused;
};
UIAElement.prototype.isValid = function(val) { 
    if (val === undefined) return this.internalValid;
    else this.internalValid = val;
};
UIAElement.prototype.checkIsValid = function(val) { 
    if (val === undefined) return this.internalCheckIsValid;
    else this.internalCheckIsValid = val;
};
UIAElement.prototype.elements = function() {
    if (!this.internalElements) this.internalElements = new UIAElementArray();
	return this.internalElements;
};
UIAElement.prototype.tap = function() {};
UIAElement.prototype.doubleTap = function() {};
UIAElement.prototype.twoFingerTap = function() {};
UIAElement.prototype.tapWithOptions = function() {};
UIAElement.prototype.touchAndHold = function(duration) {};
UIAElement.prototype.dragInsideWithOptions = function(options) {};
UIAElement.prototype.flickInsideWithOptions = function(options) {};
UIAElement.prototype.rotateWithOptions = function(options) {};
UIAElement.prototype.scrollToVisible = function() {};


function UIAWindow() {}
extend(UIAWindow, UIAElement);

function UIAScrollView() {}
extend(UIAScrollView, UIAElement);

function UIATabBar() {}
extend(UIATabBar, UIAElement);

function UIAStaticText() {}
extend(UIAStaticText, UIAElement);

function UIAImage() {}
extend(UIAImage, UIAElement);

function UIATableView() {}
extend(UIATableView, UIAElement);

function UIAButton() {}
extend(UIAButton, UIAElement);

function UIALink() {}
extend(UIALink, UIAElement);

function UIASwitch() {}
extend(UIASwitch, UIAElement);

function UIAApplication() {}
extend(UIAApplication, UIAElement);
UIAApplication.prototype.mainWindow = function() {
    if (!this.internalMainWindow) this.internalMainWindow = new UIAWindow();
    return this.internalMainWindow;
};

function UIATarget() {}
UIATarget.prototype.frontMostApp = function() { return new UIAApplication(); };
UIATarget.prototype.setTimeout = function(duration) {
	// don't do anything here
};
UIATarget.localTarget = function() {
	if (!UIATarget.internalTarget) UIATarget.internalTarget = new UIATarget();
    return UIATarget.internalTarget;
};