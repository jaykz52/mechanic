describe('Mechanic Core', function() {
    it('returns a wrapped UIAElement when one is passed as an argument', function() {
        var window = new UIAWindow();

        var wrappedWindow = $(window);

        expect(wrappedWindow[0]).toBe(window);
        expect(wrappedWindow.length).toEqual(1);
    });

    it('returns a wrapped array of UIAElements when one is passed as an argument', function() {
        var window = new UIAWindow();
        var text = new UIAStaticText();

        var wrappedArray = $([window, text]);

        expect(wrappedArray).toContain(window);
        expect(wrappedArray).toContain(text);
        expect(wrappedArray.length).toEqual(2);
    });

    it('uses the context passed to it to filter selection', function() {
        var window = new UIAWindow();
        var text1 = new UIAStaticText();
        var scrollView = new UIAScrollView();
        var text2 = new UIAStaticText();
        window.elements().push(text1);
        window.elements().push(scrollView);
        scrollView.elements().push(text2);

        var filteredByContext = $('UIAStaticText', scrollView);

        expect(filteredByContext).toContain(text2);
        expect(filteredByContext).toNotContain(text1);
    });

    it('supports selecting by name/label', function() {
        var window = new UIAWindow();

        var text1 = new UIAStaticText();
        spyOn(text1, 'name').andReturn('text1');
        window.elements().push(text1);

        var text2 = new UIAStaticText();
        spyOn(text2, 'name').andReturn('text2');
        window.elements().push(text2);


        var byNameSelector = $('#text1', window);


        expect(byNameSelector).toContain(text1);
        expect(byNameSelector).toNotContain(text2);
    });

    $('supports selecting by type', function() {
        var window = new UIAWindow();
        var button = new UIAButton();
        window.elements().push(tableview);
        var tableview = new UIATableView();
        window.elements().push(button);

        var byTypeSelector = $('UIAButton', window);

        expect(byTypeSelector).toContain(button);
        expect(byTypeSelector).toNotContain(tableview);
    });

    $('allows for a number of shortcut type selectors', function() {
        var link = new UIALink();
        var text = new UIAStaticText();
        var window = new UIAWindow();
        window.elements().push(link);
        window.elements().push(text);

        var byTypeShortcutSel = $('link', window);
    });

    it('allows you to select elements with names/labels with special characters (closes GI-5)', function() {
        var window = new UIAWindow();
        var text = new UIAStaticText();
        spyOn(text, 'name').andReturn('100% Awesome');
        window.elements().push(text);

        var result = $('#100% Awesome', window);
        expect(result[0]).toBe(text);
    });

    it('returns the passed selector if a selector is passed as an argument', function() {
        var window = new UIAWindow();
        var wrappedWindow = $(window);

        var doubleWrappedWindow = $(wrappedWindow);

        expect(doubleWrappedWindow).toBe(wrappedWindow);
    });

    it('returns an empty selector when no arguments are passed in', function() {
        var emptySelector = $();

        expect(emptySelector.length).toEqual(0);
    });

    it('stores the selector passed to it', function() {
        var window = new UIAWindow();

        var wrappedWindow = $(window);
        var otherWrappedWindow = $('window');

        expect(wrappedWindow.selector).toBe(window);
        expect(otherWrappedWindow.selector).toBe('window');
    });

    // it('uses frontMostApp as the default context', function() {
    // 	var win = new UIAWindow();
    // 	var tableview = new UIATableView();
    // 	win.elements().push(tableview);
    //
    // 	var app = new UIAApplication();
    // 	app.elements().push(win);
    // 	spyOn(UIATarget.localTarget(), 'frontMostApp').andReturn(app);
    //
    // 	var sel = $('tableview');
    //
    // 	expect(sel[0]).toBe(tableview);
    // 	expect(sel.length).toEqual(1);
    // });
});