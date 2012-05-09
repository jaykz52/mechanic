describe('Mechanic Event Module', function() {
    it('allows chaining from tap event', function() {
        var win = new UIAWindow();

        var sel = $(win);
        var returnVal = sel.tap();

        expect(returnVal).toBe(sel);
    });

    it('calls tapWithOptions with empty object literal for each element in the selector as the default implementation of tap', function() {
        var scrollView = new UIAScrollView();
        spyOn(scrollView, 'tapWithOptions');
        var text = new UIAStaticText();
        spyOn(text, 'tapWithOptions');

        var sel = $([scrollView, text]);
        sel.tap();

        expect(scrollView.tapWithOptions).toHaveBeenCalledWith({});
        expect(text.tapWithOptions).toHaveBeenCalledWith({});
    });

    it('calls doubleTap when \'style\' of double is passed as an option', function() {
        var scrollView = new UIAScrollView();
        spyOn(scrollView, 'doubleTap');

        var sel = $([scrollView]);
        sel.tap({style: 'double'});

        expect(scrollView.doubleTap).toHaveBeenCalled();
    });

    it('calls twoFingerTap when \'style\' of twoFinger is passed as an option', function() {
        var scrollView = new UIAScrollView();
        spyOn(scrollView, 'twoFingerTap');

        var sel = $([scrollView]);
        sel.tap({style: 'twoFinger'});

        expect(scrollView.twoFingerTap).toHaveBeenCalled();
    });

    it('passes options to tapWithOptions', function() {
        var scrollView = new UIAScrollView();
        spyOn(scrollView, 'tapWithOptions');

        var sel = $([scrollView]);
        sel.tap({'option1': 'value1', 'option2': 'value2'});

        expect(scrollView.tapWithOptions).toHaveBeenCalledWith({'option1': 'value1', 'option2': 'value2'});
    });

    it('allows chaining from touch event', function() {
        var win = new UIAWindow();

        var sel = $(win);
        var returnVal = sel.touch();

        expect(returnVal).toBe(sel);
    });


    it('calls touchAndHold internally on each element in selector when touch is called', function() {
        var mySwitch = new UIASwitch();
        spyOn(mySwitch, 'touchAndHold');
        var image = new UIAImage();
        spyOn(image, 'touchAndHold');

        var sel = $([mySwitch, image]);
        sel.touch(5);

        expect(mySwitch.touchAndHold).toHaveBeenCalledWith(5);
        expect(image.touchAndHold).toHaveBeenCalledWith(5);
    });

    it('allows chaining from dragInside event', function() {
        var win = new UIAWindow();

        var sel = $(win);
        var returnVal = sel.dragInside();

        expect(returnVal).toBe(sel);
    });

    it('calls dragInsideWithOptions internally on each element in selector when dragInside is called', function() {
        var mySwitch = new UIASwitch();
        spyOn(mySwitch, 'dragInsideWithOptions');
        var image = new UIAImage();
        spyOn(image, 'dragInsideWithOptions');
        var opts = {'key1': 'value1', 'key2': 'value2'};

        var sel = $([mySwitch, image]);
        sel.dragInside(opts);

        expect(mySwitch.dragInsideWithOptions).toHaveBeenCalledWith(opts);
        expect(image.dragInsideWithOptions).toHaveBeenCalledWith(opts);
    });

    it('allows chaining from flick event', function() {
        var win = new UIAWindow();

        var sel = $(win);
        var returnVal = sel.flick();

        expect(returnVal).toBe(sel);
    });

    it('calls flickInsideWithOptions internally on each element in selector when flick is called', function() {
        var mySwitch = new UIASwitch();
        spyOn(mySwitch, 'flickInsideWithOptions');
        var image = new UIAImage();
        spyOn(image, 'flickInsideWithOptions');
        var opts = {'key1': 'value1', 'key2': 'value2'};

        var sel = $([mySwitch, image]);
        sel.flick(opts);

        expect(mySwitch.flickInsideWithOptions).toHaveBeenCalledWith(opts);
        expect(image.flickInsideWithOptions).toHaveBeenCalledWith(opts);
    });

    it('allows chaining from rotate event', function() {
        var win = new UIAWindow();

        var sel = $(win);
        var returnVal = sel.rotate();

        expect(returnVal).toBe(sel);
    });

    it('calls rotateWithOptions internally on each element in selector when rotate is called', function() {
        var mySwitch = new UIASwitch();
        spyOn(mySwitch, 'rotateWithOptions');
        var image = new UIAImage();
        spyOn(image, 'rotateWithOptions');
        var opts = {'key1': 'value1', 'key2': 'value2'};

        var sel = $([mySwitch, image]);
        sel.rotate(opts);

        expect(mySwitch.rotateWithOptions).toHaveBeenCalledWith(opts);
        expect(image.rotateWithOptions).toHaveBeenCalledWith(opts);
    });

    it('allows chaining from scrollToVisible event', function() {
        var win = new UIAWindow();

        var sel = $(win);
        var returnVal = sel.scrollToVisible();

        expect(returnVal).toBe(sel);
    });

    it('calls scrollToVisible internally on first element in selector when scrollToVisible is called', function() {
        var mySwitch = new UIASwitch();
        spyOn(mySwitch, 'scrollToVisible');
        var image = new UIAImage();
        spyOn(image, 'scrollToVisible');

        var sel = $([mySwitch, image]);
        sel.scrollToVisible();

        expect(mySwitch.scrollToVisible).toHaveBeenCalled();
        expect(image.scrollToVisible).not.toHaveBeenCalled();
    });

});