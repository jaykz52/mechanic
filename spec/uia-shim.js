function extend(c, p) {
    c.prototype = new p();
    c.prototype.constructor = p;
    c.prototype.toString = function() {
        // TODO: this function is pretty awful, but we'll deal since it's just to set up a semi-accurate picture of UIAutomation as it stands
        var parts = c.toString().match(/function\s*(\w+)/);
        return "[object " + parts[1] + "]";
     };
}

function f(args) {
	return new function(args) {};
}

function UIAElementArray() {}
extend(UIAElementArray, Array);
UIAElementArray.prototype.toArray = function() { return this; }

function UIAElement() { }
extend(UIAElement, Object);
UIAElement.prototype.elements = function() {
    if (!this.internalElements) this.internalElements = new UIAElementArray();
	return this.internalElements;
};
UIAElement.prototype.name = function() {};
UIAElement.prototype.label = function() {};
UIAElement.prototype.value = function() {};
UIAElement.prototype.isEnabled = function() {};
UIAElement.prototype.isVisible = function() {};
UIAElement.prototype.hasKeyboardFocus = function() {};
UIAElement.prototype.isValid = function() {};
UIAElement.prototype.checkIsValid = function() {};
UIAElement.prototype.tap = function() {};
UIAElement.prototype.doubleTap = function() {};
UIAElement.prototype.twoFingerTap = function() {};
UIAElement.prototype.tapWithOptions = function() {};
UIAElement.prototype.touchAndHold = function(duration) {};
UIAElement.prototype.dragInsideWithOptions = function(options) {};
UIAElement.prototype.flickInsideWithOptions = function(options) {};
UIAElement.prototype.rotateWithOptions = function(options) {};
UIAElement.prototype.scrollToVisible = function() {};
UIAElement.prototype.logElement = function() {};
UIAElement.prototype.logElementTree = function() {};
UIAElement.prototype.rect = function(val) {};

function UIAWindow() {}
extend(UIAWindow, UIAElement);

function UIAScrollView() {}
extend(UIAScrollView, UIAElement);

function UIATabBar() {}
extend(UIATabBar, UIAElement);

function UIANavigationBar() {}
extend(UIANavigationBar, UIAElement);

function UIAStaticText() {}
extend(UIAStaticText, UIAElement);

function UIATextField() {}
extend(UIATextField, UIAElement);

function UIAImage() {}
extend(UIAImage, UIAElement);

function UIATableView() {}
extend(UIATableView, UIAElement);

function UIAButton() {}
extend(UIAButton, UIAElement);

function UIACollectionView() {}
extend(UIACollectionView, UIAElement);

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
UIAApplication.prototype.version = function() {
    return 1;
};
UIAApplication.prototype.bundleID = function() {
    return "bundle1234";
};
UIAApplication.prototype.setPreferencesValueForKey = function(val, key) {
    // don't do anything...
};
UIAApplication.prototype.preferencesValueForKey = function(key) {
    // don't do anything...
};

function UIATarget() {}
UIATarget.prototype.frontMostApp = function() {
    if (!this.internalApp) this.internalApp = new UIAApplication();
    return this.internalApp;

};
UIATarget.prototype.setTimeout = function(duration) {};
UIATarget.prototype.captureScreenWithName = function(name) {};
UIATarget.prototype.captureRectWithName = function(rect, name) {};
UIATarget.localTarget = function() {
	if (!UIATarget.internalTarget) UIATarget.internalTarget = new UIATarget();
    return UIATarget.internalTarget;
};

function UIALogger() {}
UIALogger.logError = function (s) { console.log(s); }
UIALogger.logWarning = UIALogger.logError;
UIALogger.logDebug = UIALogger.logError;
UIALogger.logMessage = UIALogger.logError;
