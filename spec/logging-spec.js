describe('Mechanic Logging Module', function() {
    it('suppresses message and debug logs when isVerbose is false', function() {
        spyOn(UIALogger, 'logError');
        spyOn(UIALogger, 'logWarning');
        spyOn(UIALogger, 'logDebug');
        spyOn(UIALogger, 'logMessage');

        $.isVerbose = false;
        $.log('error', 'error');
        $.log('warn', 'warn');
        $.log('debug', 'debug');
        $.log('message', 'message');

        expect(UIALogger.logError).toHaveBeenCalledWith('error');
        expect(UIALogger.logWarning).toHaveBeenCalledWith('warn');
        expect(UIALogger.logDebug).not.toHaveBeenCalled();
        expect(UIALogger.logMessage).not.toHaveBeenCalled();
    });

    it('delegates to UIALogger when logging', function() {
        spyOn(UIALogger, 'logError');
        spyOn(UIALogger, 'logWarning');
        spyOn(UIALogger, 'logDebug');
        spyOn(UIALogger, 'logMessage');

        $.isVerbose = true;
        $.error('error');
        $.warn('warn');
        $.debug('debug');
        $.message('message');

        expect(UIALogger.logError).toHaveBeenCalledWith('error');
        expect(UIALogger.logWarning).toHaveBeenCalledWith('warn');
        expect(UIALogger.logDebug).toHaveBeenCalledWith('debug');
        expect(UIALogger.logMessage).toHaveBeenCalledWith('message');
    });

    it('defaults log level to \'message\' level when none is given to log function', function() {
        spyOn(UIALogger, 'logMessage');
        spyOn(UIALogger, 'logError');

        $.isVerbose = true;
        $.log('hello!');

        expect(UIALogger.logMessage).toHaveBeenCalledWith('hello!');
        expect(UIALogger.logError).not.toHaveBeenCalled();
    })

    it('defaults log level to \'message\' when an unknown log level is given to log function', function() {
        spyOn(UIALogger, 'logMessage');
        spyOn(UIALogger, 'logError');

        $.isVerbose = true;
        $.log('hello!', 'fakelevel');

        expect(UIALogger.logMessage).toHaveBeenCalledWith('hello!');
        expect(UIALogger.logError).not.toHaveBeenCalled();
    });

    it('calls appropriate UIALogger method based on log level passed', function() {
        spyOn(UIALogger, 'logError');
        spyOn(UIALogger, 'logWarning');
        spyOn(UIALogger, 'logDebug');
        spyOn(UIALogger, 'logMessage');

        $.isVerbose = true;
        $.log('error', 'error');
        $.log('warn', 'warn');
        $.log('debug', 'debug');
        $.log('message', 'message');

        expect(UIALogger.logError).toHaveBeenCalledWith('error');
        expect(UIALogger.logWarning).toHaveBeenCalledWith('warn');
        expect(UIALogger.logDebug).toHaveBeenCalledWith('debug');
        expect(UIALogger.logMessage).toHaveBeenCalledWith('message');
    });

    it('calls captureScreenWithName when no rect given to capture', function() {
        spyOn(UIATarget.localTarget(), 'captureScreenWithName');

        $.capture('image');

        expect(UIATarget.localTarget().captureScreenWithName).toHaveBeenCalledWith('image');
    });

    it('uses date as image name when no image name is passed to capture.', function() {
        spyOn(UIATarget.localTarget(), 'captureScreenWithName');

        var date = new Date();
        $.capture();

        expect(UIATarget.localTarget().captureScreenWithName).toHaveBeenCalledWith(date.toString());
    });

    it('calls captureRectWithName when an image name and rect is passed to capture.', function() {
        spyOn(UIATarget.localTarget(), 'captureRectWithName');
        var rect = {x:1, y:2};

        $.capture("name", rect);

        expect(UIATarget.localTarget().captureRectWithName).toHaveBeenCalledWith(rect, "name");
    });

    it('allows chaining when log function is called', function() {
        var win = new UIAWindow();

        var sel = $(win);

        expect(sel.log()).toBe(sel);
    });

    it('calls logElement on each element in the selector when log is called', function() {
        var text = new UIAStaticText();
        spyOn(text, 'logElement');
        var image = new UIAImage();
        spyOn(image, 'logElement');

        var sel = $([text, image]);
        sel.log();

        expect(text.logElement).toHaveBeenCalled();
        expect(image.logElement).toHaveBeenCalled();
    });

    it('allows chaining when logTree function is called', function() {
        var win = new UIAWindow();

        var sel = $(win);

        expect(sel.logTree()).toBe(sel);
    });

    it('calls logElementTree on each element in the selector when logTree is called', function() {
        var text = new UIAStaticText();
        spyOn(text, 'logElementTree');
        var image = new UIAImage();
        spyOn(image, 'logElementTree');

        var sel = $([text, image]);
        sel.logTree();

        expect(text.logElementTree).toHaveBeenCalled();
        expect(image.logElementTree).toHaveBeenCalled();
    });

    it('allows chaining when capture is called', function() {
        var win = new UIAWindow();

        var sel = $(win);

        expect(sel.capture()).toBe(sel);
    });

    it('calls captureRectWithName for each element in select when capture is called', function() {
        rect1 = {x:1, y:1};
        var win = new UIAWindow();
        spyOn(win, 'rect').andReturn(rect1);

        rect2 = {x:2, y:2};
        var text = new UIAStaticText();
        spyOn(text, 'rect').andReturn(rect2);

        spyOn(UIATarget.localTarget(), 'captureRectWithName');


        var sel = $([win, text]);
        sel.capture();


        expect(sel.capture()).toBe(sel);
        expect(UIATarget.localTarget().captureRectWithName).toHaveBeenCalledWith(rect1, jasmine.any(String));
        expect(UIATarget.localTarget().captureRectWithName).toHaveBeenCalledWith(rect2, jasmine.any(String));
    });
});