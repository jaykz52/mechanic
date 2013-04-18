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

    it('supports selecting by name using longform', function() {
        var window = new UIAWindow();

        var text1 = new UIAStaticText();
        spyOn(text1, 'name').andReturn('text 1');
        window.elements().push(text1);

        var text2 = new UIAStaticText();
        spyOn(text2, 'name').andReturn('text 2');
        window.elements().push(text2);


        var byNameSelector = $('[name=text 1]', window);


        expect(byNameSelector).toContain(text1);
        expect(byNameSelector).toNotContain(text2);
    })

    it('supports selecting by value', function() {
        var window = new UIAWindow();

        var text1 = new UIATextField();
        spyOn(text1, 'name').andReturn('text 1');
        spyOn(text1, 'value').andReturn('First Name');
        window.elements().push(text1);

        var text2 = new UIAStaticText();
        spyOn(text2, 'name').andReturn('text 2');
        spyOn(text2, 'value').andReturn('Last Name');
        window.elements().push(text2);


        var byValueSelector = $('[value=First Name]', window);

        expect(byValueSelector).toContain(text1);
        expect(byValueSelector).toNotContain(text2);
    })

    it('supports selecting by type', function() {
        var window = new UIAWindow();
        var button = new UIAButton();
        window.elements().push(button);
        var tableview = new UIATableView();
        window.elements().push(tableview);

        var byTypeSelector = $('UIAButton', window);

        expect(byTypeSelector).toContain(button);
        expect(byTypeSelector).toNotContain(tableview);
    });

    it('allows for a number of shortcut type selectors', function() {
        var link = new UIALink();
        var text = new UIAStaticText();
        var window = new UIAWindow();
        window.elements().push(link);
        window.elements().push(text);

        var byTypeShortcutSel = $('link', window);
    });

    it('allows you to select multiple element groups at once', function() {
        var window = new UIAWindow();
        var text1 = new UIAStaticText();
        var text2 = new UIAStaticText();
        var button1 = new UIAButton();
        var button2 = new UIAButton();
        spyOn(text1, 'name').andReturn('text 1');
        spyOn(text2, 'name').andReturn('text 2');
        spyOn(button1, 'name').andReturn('button 1');
        spyOn(button2, 'name').andReturn('button 2');
        window.elements().push(text1);
        window.elements().push(text2);
        window.elements().push(button1);
        window.elements().push(button2);

        var result = $('#button 1, [name=text 2]', window);
        expect(result[0]).toBe(button1);
        expect(result[1]).toBe(text2);
        expect(result.length).toEqual(2);
    });

    it('allows you to select elements that are the children of another selector', function() {
      // window
      //   image#image1
      //   button#button1
      //   link#link1
      //   navigationBar#navbar1
      //     button#button2
      //     link#link2
      //   navigationBar#navbar2
      //     link#link3
      //     text#text1
      //     tabbar#navbar3
      //       button#button3
      //       link#link4
      var window = new UIAWindow()
      var image1 = new UIAImage()
      spyOn(image1, 'name').andReturn('image1')
      var button1 = new UIAButton()
      spyOn(button1, 'name').andReturn('button1')
      var link1 = new UIALink()
      spyOn(link1, 'name').andReturn('link1')
      var navigationBar1 = new UIANavigationBar()
      spyOn(navigationBar1, 'name').andReturn('navigationBar1')
      var button2 = new UIAButton()
      spyOn(button2, 'name').andReturn('button2')
      var link2 = new UIALink()
      spyOn(link2, 'name').andReturn('link2')
      var navigationBar2 = new UIANavigationBar()
      spyOn(navigationBar2, 'name').andReturn('navigationBar2')
      var link3 = new UIALink()
      spyOn(link3, 'name').andReturn('link3')
      var text1 = new UIAStaticText()
      spyOn(text1, 'name').andReturn('text1')
      var tabbar1 = new UIATabBar()
      spyOn(tabbar1, 'name').andReturn('tabbar1')
      var button3 = new UIAButton()
      spyOn(button3, 'name').andReturn('button3')
      var link4 = new UIALink()
      spyOn(link4, 'name').andReturn('link4')

      window.elements().push(image1)
      window.elements().push(button1)
      window.elements().push(link1)
      window.elements().push(navigationBar1)
      window.elements().push(navigationBar2)
      navigationBar1.elements().push(button2)
      navigationBar1.elements().push(link2)
      navigationBar2.elements().push(link3)
      navigationBar2.elements().push(text1)
      navigationBar2.elements().push(tabbar1)
      tabbar1.elements().push(button3)
      tabbar1.elements().push(link4)

      var found

      found = $("navigationBar > link", window)
      expect(found[0]).toBe(link2)
      expect(found[1]).toBe(link3)
      expect(found.length).toBe(2)

      found = $("navigationBar > link[name=link3]", window)
      expect(found.length).toBe(1)
      expect(found[0]).toBe(link3)

      found = $("navigationBar > link", window)
      expect(found[0]).toBe(link2)
      expect(found[1]).toBe(link3)
      expect(found.length).toBe(2)

      found = $("tabbar > *", window)
      expect(found[0]).toBe(button3)
      expect(found[1]).toBe(link4)
      expect(found.length).toBe(2)

      // without the ">", depth is unlimited
      found = $("navigationBar link", window)
      expect(found[0]).toBe(link2)
      expect(found[1]).toBe(link3)
      expect(found[2]).toBe(link4)
      expect(found.length).toBe(3)
    })

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

    describe('pluck', function() {
        it('captures the return values of each object when passed the name of a function', function() {
            var scrollView = new UIAScrollView();
            spyOn(scrollView, 'name').andReturn('name #1');
            var text = new UIAStaticText();
            spyOn(text, 'name').andReturn('name #2');

            var sel = $([scrollView, text]);
            var names = sel.pluck('name');

            expect(scrollView.name).toHaveBeenCalled();
            expect(text.name).toHaveBeenCalled();

            expect(names.length).toBe(2);
            expect(names[0]).toBe('name #1');
            expect(names[1]).toBe('name #2');
        });
    });
});
