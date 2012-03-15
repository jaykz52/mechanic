function UIAElement() {
    this.internalName = "blah";
}
UIAElement.prototype = new Object();
UIAElement.prototype.constructor = UIAElement;
UIAElement.prototype.setName = function(name) { this.internalName = name; };
UIAElement.prototype.name = function(name) { 
    if (!name) return this.internalName;
    else this.internalName = name;
};

UIAElement.prototype.elements = function() {
    if (!this.internalElements) {
        this.internalElements = new UIAElementArray();
    }
	return this.internalElements;
};
// TODO: fix toString() to match how it works in UIAutomation

function UIAElementArray() {}
UIAElementArray.prototype = new Array();
UIAElementArray.prototype.constructor = UIAElementArray;
UIAElementArray.prototype.toArray = function() {
    return this;
}

function UIAWindow() {}
UIAWindow.prototype = new UIAElement();
UIAWindow.prototype.constructor = UIAWindow;

function UIAScrollView() {}
UIAScrollView.prototype = new UIAElement();
UIAScrollView.prototype.constructor = UIAScrollView;

function UIAStaticText() {}
UIAStaticText.prototype = new UIAElement();
UIAStaticText.prototype.constructor = UIAStaticText;

function UIAApplication() {}
UIAApplication.prototype = new UIAElement();
UIAApplication.prototype.constructor = UIAWindow;
UIAApplication.prototype.mainWindow = function() {
	return new UIAWindow();
};

function UIATarget() {}
UIATarget.localTarget = function() {
	return new UIATarget();
};
UIATarget.prototype.frontMostApp = function() {
	return new UIAApplication();
};
UIATarget.prototype.setTimeout = function(duration) {
	// don't do anything here
};