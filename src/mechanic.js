/*
 * mechanic.js UIAutomation Library
 * http://cozykozy.com/
 *
 * Copyright 2012, Jason Kozemczak
 * mechanic.js may be freely distributed under the MIT license.
 *
 * Includes modified Zepto.js
 * Copyright 2010-2012, Thomas Fuchs
 * Zepto.js may be freely distributed under the MIT license.
 *
 */

var $ = (function() {
	var target = UIATarget.localTarget();
	target.setTimeout(0);
	
	var app = target.frontMostApp(),
		window = app.mainWindow(),
		emptyArray = [],
		slice = emptyArray.slice,
		idSelectorRE = /^#([\w-]+)$/,
		typeSelectorRE = /|UIAPageIndicator/;
		
	// shortcut selectors for common elements
	var typeShortcuts = {
		'UIAActionSheet' : ['actionsheet'],
		'UIAActivityIndicator' : ['activityIndicator'],
		'UIAAlert' : ['alert'],
		'UIAButton' : ['button'],
		'UIAImage' : ['image'],
		'UIAImage' : ['image'],
		'UIALink' : ['link'],
		'UIAPageIndicator' : ['pageIndicator'],
		'UIAPicker' : ['picker'],
		'UIAPickerWheel' : ['pickerwheel'],
		'UIAPopover' : ['popover'],
		'UIAProgressIndicator' : ['progress'],
		'UIAScrollView' : ['scrollview'],
		'UIASearchBar' : ['searchbar'],		
		'UIASecureTextField' : ['secure'],
		'UIASegmentedControl' : ['segemented'],
		'UIASlider' : ['slider'],
		'UIAStaticText' : ['text'],
		'UIAStatusBar' : ['statusbar'],
		'UIASwitch' : ['switch'],	
		'UIATabBar' : ['tabbar'],
		'UIATableView' : ['tableview'],
		'UIATableCell' : ['cell'],
		'UIATableGroup' : ['group'],
		'UIATextField' : ['textfield'],
		'UIATextView' : ['textview'],
		'UIAToolbar' : ['toolbar'],
		'UIAWebView' : ['webview'],
		'UIAWindow' : ['window']
	};
		
	UIAElement.prototype.getElementByName = function(name) {
		if (this.name() === name) return this;
		else {
			var elements = this.elements();
			var i;
			for (i = 0; i < elements.length; i++) {
				var elementByName = elements[i].getElementByName(name);
				if (elementByName) {
					return elementByName;
				}
			}
			
			// if we get here, we don't have a valid choice
			return null;
		}
	};
	UIAElement.prototype.getElementByType = function(type) {
		if (type === this.type() || (typeShortcuts[this.type()] !== undefined && typeShortcuts[this.type()].indexOf(type) >= 0)) return this;
		else {
			var elements = this.elements();
			var i;
			for (i = 0; i < elements.length; i++) {
				var elementByType = elements[i].getElementByType(type);
				if (elementByType) {
					return elementByType;
				}
			}
			
			// if we get here, we don't have a valid choice
			return null;
		}
		
	}
	UIAElement.prototype.type = function() {
		var type = this.toString().split(" ")[1];
		return type.substr(0, type.length - 1);
	};
	
    function isF(value) { return ({}).toString.call(value) == "[object Function]" }
    function isO(value) { return value instanceof Object }
    function isA(value) { return value instanceof Array }
    function likeArray(obj) { return typeof obj.length == 'number' }
	
    function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
    function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
	
    function uniq(array) { return array.filter(function(item,index,array){ return array.indexOf(item) == index }) }

	
    function Z(dom, selector){
      dom = dom || emptyArray;
      dom.__proto__ = Z.prototype;
      dom.selector = selector || '';
      return dom;
    }
	
    function $(selector, context) {
		if (!selector) return Z();
		if (context !== undefined) return $(context).find(selector);
		else if (selector instanceof Z) return selector;
		else {
			var dom;
			if (isA(selector)) dom = compact(selector);
			else dom = $$(window, selector);
			return Z(dom, selector);
		}
    }
	
	$.qsa = $$ = function(element, selector) {		
		var found;
		if (idSelectorRE.test(selector)) {	
			found = element.getElementByName(selector.substr(1));
			return found ? [found] : emptyArray;
		} else if (typeSelectorRE.test(selector)) {
			found = element.getElementByType(selector);
			return found ? [found] : emptyArray;
			
		} else {
			return emptyArray;
		}
	}
	
    function filtered(elements, selector) {
      return selector === undefined ? $(elements) : $(elements).filter(selector);
    }
	
    $.extend = function(target){
      slice.call(arguments, 1).forEach(function(source) {
        for (key in source) target[key] = source[key];
      });
      return target;
    }
	
    $.inArray = function(elem, array, i) {
  		return emptyArray.indexOf.call(array, elem, i);
  	}

    $.map = function(elements, callback) {
      var value, values = [], i, key;
      if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
          value = callback(elements[i], i);
          if (value != null) values.push(value);
        }
      else
        for (key in elements) {
          value = callback(elements[key], key);
          if (value != null) values.push(value);
        }
      return flatten(values);
    }

    $.each = function(elements, callback) {
      var i, key;
      if (likeArray(elements))
        for(i = 0; i < elements.length; i++) {
          if(callback.call(elements[i], i, elements[i]) === false) return elements;
        }
      else
        for(key in elements) {
          if(callback.call(elements[key], key, elements[key]) === false) return elements;
        }
      return elements;
  	}
	
	$.fn = {
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,
	    map: function(fn){
	      return $.map(this, function(el, i){ return fn.call(el, i, el) });
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments));
	    },
	    get: function(idx){ return idx === undefined ? slice.call(this) : this[idx] },
	    size: function(){ return this.length },
	    each: function(callback) {
	      this.forEach(function(el, idx){ callback.call(el, idx, el) });
	      return this;
	    },
	    filter: function(selector) {
	      return $([].filter.call(this, function(el) {
			  var parent = el.parent();
	        return parent && $$(parent, selector).indexOf(el) >= 0;
	      }));
	    },
	    end: function(){
	      return this.prevObject || $();
	    },
	    andSelf:function(){
	      return this.add(this.prevObject || $())
	    },
	    add:function(selector,context){
	      return $(uniq(this.concat($(selector,context))));
	    },
	    is: function(selector){
	      return this.length > 0 && $(this[0]).filter(selector).length > 0;
	    },
	    not: function(selector){
	      var nodes=[];
	      if (isF(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this);
	        });
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isF(selector.item)) ? slice.call(selector) : $(selector);
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el);
	        });
	      }
	      return $(nodes);
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1);
	    },
	    first: function(){ var el = this[0]; return el && !isO(el) ? el : $(el) },
	    last: function(){ var el = this[this.length - 1]; return el && !isO(el) ? el : $(el) },
	    find: function(selector) {
	      var result;
	      if (this.length == 1) result = $$(this[0], selector);
	      else result = this.map(function(){ return $$(this, selector) });
	      return $(result);
	    },
	    ancestry: function(selector) {
	      var ancestors = [], elements = this;
	      while (elements.length > 0)
	        elements = $.map(elements, function(node){
	          if ((node = node.parent()) && node.type() !== window.parent().type() && ancestors.indexOf(node) < 0) {
	            ancestors.push(node);
	            return node;
	          }
	        });
	      return filtered(ancestors, selector);
	    },
	    parent: function(selector) {
	      return filtered(uniq(this.map(function() { return this.parent() })), selector);
	    },
	    children: function(selector) {
	      return filtered(this.map(function(){ return slice.call(this.elements()) }), selector);
	    },
	    siblings: function(selector) {
	      return filtered(this.map(function(i, el){
	        return slice.call(el.parent().elements()).filter(function(child){ return child!==el });
	      }), selector);
	    },
	    index: function(element) {
	      return element ? this.indexOf($(element)[0]) : this.parent().elements().toArray().indexOf(this[0]);
	    },
		pluck: function(property) { return this.map(function(){ return this[property] }) }
	};
	
    'filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings'.split(',').forEach(function(property) {
		var fn = $.fn[property];
      	$.fn[property] = function() {
			var ret = fn.apply(this, arguments);
        	ret.prevObject = this;
        	return ret;
      	};
    });
	
	// eventing
	$.fn.tap = function(options) {
		options = options || {};
		if (!options.style) options.style = 'single';
        return this.each(function() {
			if (options.style === 'double') this.doubleTap();
			else if (options.style === 'twoFinger') this.twoFingerTap();
			else this.tapWithOptions(options);
        });
	};
	$.fn.touch = function(duration) {
        return this.each(function() {
			this.touchAndHold(duration);
        });
	};
	$.fn.dragInside = function(options) {
        return this.each(function() {
			this.dragInsideWithOptions(options);
        });
	};
	$.fn.flick = function(options) {
        return this.each(function() {
			this.flickInsideWithOptions(options);
        });
	};
	$.fn.rotate = function(options) {
        return this.each(function() {
			this.rotateWithOptions(options);
        });
	};
	$.fn.scrollToVisible = function() {
        return this.each(function() {
			this.scrollToVisible();
        });
	};
	
	// other selector-type UIA helpers
	$.fn.name = function() {
		return (this.length > 0) ? this[0].name() : null;
	};
	$.fn.label = function() {
		return (this.length > 0) ? this[0].label() : null;
	};
	$.fn.value = function() {
		return (this.length > 0) ? this[0].value() : null;
	};
	$.fn.isFocused = function() {
		return (this.length > 0) ? this[0].hasKeyboardFocus() : false;		
	};
	$.fn.isVisible = function() {
		return (this.length > 0) ? this[0].isVisible() : false;		
	};
	$.fn.isValid = function(certain) {
		if (this.length > 0) return false;
		else if (certain) return this[0].checkIsValid();
		else return this[0].isValid();
	};
	
	// logging
	$.fn.log = function() {
		return this.each(function() {
			this.logElement();
		});
	};
	$.fn.logTree = function () {
		return this.each(function() {
			this.logElementTree();
		});
	};
	
	$.log = function(str) {
		UIALogger.logMessage(str);
	};
	$.timeout = function(duration) {
		target.setTimeout(duration);
	};
	$.delay = function(seconds) {
		target.delay(seconds);
	};
	$.cmd = function(path, args, timeout) {
		target.host().performTaskWithPathArgumentsTimeout(path, args, timeout);
	};
	$.orientation = function(orientation) {
		if (orientation === undefined || orientation === null) return target.deviceOrientation();
		else target.setDeviceOrientation(orientation);
	};
	$.location = function(coordinates, options) {
		options = options || {};
		target.setLocationWithOptions(options);
	};
	$.shake = function() {
		target.shake();
	};
	$.rotate = function(options) {
		target.rotateWithOptions(options);
	};
	$.pinch = function(options) {
		if (!options.style) options.style = 'open';
		if (options.style === 'close') target.pinchCloseFromToForDuration(options.from, options.to, options.duration);
		else target.pinchOpenFromToForDuration(options.from, options.to, options.duration);
	};
	$.drag = function(options) {
		target.dragFromToForDuration(options.from, options.to, options.duration);
	};
	$.flick = function(options) {
		target.flickFromTo(options.from, options.to);
	}
	$.lock = function(duration) {
		target.lockForDuration(duration);
	};
	$.background = function(duration) {
		target.deactivateAppForDuration(duration);
	};
	$.capture = function(imageName, rect) {
		imageName = imageName || new Date().toString();
		if (rect) target.captureRectWithName(rect, imageName);
		else target.captureScreenWithName(imageName);
	};
	$.volume = function(direction, duration) {
		if (direction === "up") {
			if (duration) target.holdVolumeUp(duration)
			else target.clickVolumeUp();
		} else {
			if (duration) target.holdVolumeDown(duration);
			else target.clickVolumeDown();
		}
	};
	
    'delay,cmd,orientation,location,shake,rotate,pinch,drag,flick,lock,background,capture,volume'.split(',').forEach(function(property) {
      	var fn = $[property];
      	$.fn[property] = function() {
			fn.apply($, arguments);
			return this;
		};
  	});
	
	Z.prototype = $.fn;
	return $;
})();