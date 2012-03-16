describe('Mechanic Data Module', function() {
    it('has a name selector function that returns the first element\'s name', function() {
		var text = new UIAStaticText();
		text.name('name1');
        var win = new UIAWindow();
		win.name('name2');
        
        var sel = $([text, win]);
        
		expect(sel.name()).toEqual('name1');
    });
	
	it('returns null when name is called on an empty selector', function() {
		var sel = $();
		
		expect(sel.name()).toEqual(null);
	});
	
	it('has a label selector function that returns the first element\'s label', function() {
		var mySwitch = new UIASwitch();
		mySwitch.label('switchname');
		var table = new UIATableView();
		table.label('tablename');
		
		var sel = $([mySwitch, table]);
		
		expect(sel.label()).toEqual('switchname');
	});
	
	it('returns null when label is called on an empty selector', function() {
		var sel = $();
		
		expect(sel.label()).toEqual(null);
	});
	
	it('has a value selector function that returns the first element\'s value', function() {
		var link = new UIALink();
		link.value('linkvalue');
		var table = new UIATableView();
		table.value('tablevalue');
		
		var sel = $([link, table]);
		
		expect(sel.value()).toEqual('linkvalue');
	});
	
	it('returns null when value is called on an empty selector', function() {
		var sel = $();
		
		expect(sel.value()).toEqual(null);
	});
	
	it('has an isFocused selector function that returns whether or not the first element is focused', function() {
		var link = new UIALink();
		link.hasKeyboardFocus(true);
		var image = new UIAImage();
		image.hasKeyboardFocus(false);
		
		var sel = $([link, image]);
		
		expect(sel.isFocused()).toEqual(true);
	});
	
	it('returns false when isFocused is called on an empty selector', function() {
		var sel = $();
		
		expect(sel.isFocused()).toEqual(false);
	});
	
	it('has an isVisible selector function that returns whether or not the first element is visible', function() {
		var scroll = new UIAScrollView();
		scroll.isVisible(true);
		var tabbar = new UIATabBar();
		tabbar.isVisible(false);
		
		var sel = $([scroll, tabbar]);
		
		expect(sel.isVisible()).toEqual(true);
	});
	
	it('returns false when isVisible is called on an empty selector', function() {
		var sel = $();
		
		expect(sel.isVisible()).toEqual(false);
	});

	it('has an isValid selector function that returns whether or not the element in the selector is valid', function() {
		var win = new UIAWindow();
		win.isValid(true);
		
		var sel = $(win);
		
		expect(sel.isValid()).toEqual(true);
	});
	
	it('will internally use checkIsValid for isValid selector function when true argument is passed in', function() {
		var win = new UIAWindow();
		win.checkIsValid(true);
		win.isValid(false);
		
		var sel = $(win);
		
		expect(sel.isValid(true)).toEqual(true);
	});
	
	it('returns false when isValid is called on a selector not containing 1 element', function() {
		var win = new UIAWindow();
		win.isValid(true);
		var tab = new UIATabBar();
		tab.isValid(true);
		
		var sel = $([win, tab]);
		
		expect(sel.isValid()).toEqual(false);
	});
});