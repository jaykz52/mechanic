/*
 * mechanic.js UIAutomation Library
 * http://cozykozy.com/pages/mechanicjs
 *
 * Copyright (c) 2012 Jason Kozemczak
 * mechanic.js may be freely distributed under the MIT license.
 *
 * Includes parts of Zepto.js
 * Copyright 2010-2012, Thomas Fuchs
 * Zepto.js may be freely distributed under the MIT license.
 */

var mechanic = (function() {
    // Save a reference to the local target for convenience
    var target = UIATarget.localTarget();

    // Set the default timeout value to 0 to avoid making walking the object tree incredibly slow.
    // Developers can adjust this value by calling $.timeout(duration)
    target.setTimeout(0);

    var app = target.frontMostApp(),
        window = app.mainWindow(),
        emptyArray = [],
        slice = emptyArray.slice,
        idSelectorRE = /^#([\w\s\W-]+)$/;

    // Setup a map of UIAElement types to their "shortcut" selectors.
    var typeShortcuts = {
        'UIAActionSheet' : ['actionsheet'],
        'UIAActivityIndicator' : ['activityIndicator'],
        'UIAAlert' : ['alert'],
        'UIAButton' : ['button'],
        'UIAElement' : ['\\*'], // TODO: sort of a hack
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
        'UIAWindow' : ['window'],
        'UIANavigationBar': ['navigationBar']
    };

    // Build a RegExp for picking out type selectors.
    var typeSelectorRE = (function() {
        var key;
        var typeSelectorREString = "\\";
        for (key in typeShortcuts) {
            typeSelectorREString += key + "|";
            typeShortcuts[key].forEach(function(shortcut) { typeSelectorREString += shortcut + "|"; });
        }
        typeSelectorREString = typeSelectorREString.substr(0, typeSelectorREString.length - 1);
        return new RegExp(typeSelectorREString);
    })();

    // Add functions to UIAElement to make object graph searching easier.
    UIAElement.prototype.getElementByName = function(name) {
        var foundEl = null;
        $.each(this.elements().toArray(), function(idx, el) {
            if (el.name() === name) foundEl = el;
            else foundEl = el.getElementByName(name);
            if (foundEl) return false;
        });

        return foundEl;
    };
    UIAElement.prototype.getElementsByType = function(type) {
        return $.map(this.elements().toArray(), function(el) {
            var matches = el.getElementsByType(type);
            if (el.isType(type)) matches.unshift(el);
            return matches;
        });
    };
    UIAElement.prototype.isType = function(type) {
        var thisType = this.toString().split(" ")[1];
        thisType = thisType.substr(0, thisType.length - 1);
        if (type === thisType) return true;
        else if (typeShortcuts[thisType] !== undefined && typeShortcuts[thisType].indexOf(type) >= 0) return true;
        else if (type === '*' || type === 'UIAElement') return true;
        else return false;
    };

    function isF(value) { return ({}).toString.call(value) == "[object Function]"; }
    function isO(value) { return value instanceof Object; }
    function isA(value) { return value instanceof Array; }
    function likeArray(obj) { return typeof obj.length == 'number'; }

    function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null; }); }
    function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array; }

    function uniq(array) { return array.filter(function(item,index,array){ return array.indexOf(item) == index; }); }

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
            else if (selector instanceof UIAElement) dom = [selector];
            else dom = $$(app, selector);
            return Z(dom, selector);
        }
    }

    $.qsa = $$ = function(element, selector) {
        var found;
        if (idSelectorRE.test(selector)) {
            found = element.getElementByName(selector.substr(1));
            return found ? [found] : emptyArray;
        } else if (typeSelectorRE.test(selector)) {
            found = element.getElementsByType(selector);
            return found ? found : emptyArray;
        } else {
            return emptyArray;
        }
    };

    function filtered(elements, selector) {
        return selector === undefined ? $(elements) : $(elements).filter(selector);
    }

    $.extend = function(target){
        var key;
        slice.call(arguments, 1).forEach(function(source) {
            for (key in source) target[key] = source[key];
        });
        return target;
    };

    $.inArray = function(elem, array, i) {
        return emptyArray.indexOf.call(array, elem, i);
    };

    $.map = function(elements, callback) {
        var value, values = [], i, key;
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++) {
                value = callback(elements[i], i);
                if (value != null) values.push(value);
            }
        } else {
            for (key in elements) {
                value = callback(elements[key], key);
                if (value != null) values.push(value);
            }
        }
        return flatten(values);
    };

    $.each = function(elements, callback) {
        var i, key;
        if (likeArray(elements)) {
            for(i = 0; i < elements.length; i++) {
                if(callback.call(elements[i], i, elements[i]) === false) return elements;
            }
        } else {
            for(key in elements) {
                if(callback.call(elements[key], key, elements[key]) === false) return elements;
            }
        }
        return elements;
    };

    $.fn = {
        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        push: emptyArray.push,
        indexOf: emptyArray.indexOf,
        concat: emptyArray.concat,
        map: function(fn){
            return $.map(this, function(el, i){ return fn.call(el, i, el); });
        },
        slice: function(){
            return $(slice.apply(this, arguments));
        },
        get: function(idx){ return idx === undefined ? slice.call(this) : this[idx]; },
        size: function(){ return this.length; },
        each: function(callback) {
            this.forEach(function(el, idx){ callback.call(el, idx, el); });
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
            return this.add(this.prevObject || $());
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
        first: function(){ var el = this[0]; return el && !isO(el) ? el : $(el); },
        last: function(){ var el = this[this.length - 1]; return el && !isO(el) ? el : $(el); },
        find: function(selector) {
            var result;
            if (this.length == 1) result = $$(this[0], selector);
            else result = this.map(function(){ return $$(this, selector); });
            return $(result);
        },
        predicate: function(predicate) {
            return this.map(function(el, idx) {
                if (typeof predicate == 'string') return el.withPredicate(predicate);
                else return null; // TODO: handle map with key/values to match using withValueForKey
            });
        },
        closest: function(selector, context) {
            var el = this[0], candidates = $$(context || app, selector);
            if (!candidates.length) el = null;
            while (el && candidates.indexOf(el) < 0)
                el = el !== context && el !== app && el.parent();
            return $(el);
        },
        ancestry: function(selector) {
            var ancestors = [], elements = this;
            while (elements.length > 0)
                elements = $.map(elements, function(node){
                    if ((node = node.parent()) && !node.isType('UIAApplication') && ancestors.indexOf(node) < 0) {
                        ancestors.push(node);
                        return node;
                    }
                });
            return filtered(ancestors, selector);
        },
        parent: function(selector) {
            return filtered(uniq(this.map(function() { return this.parent(); })), selector);
        },
        children: function(selector) {
            return filtered(this.map(function(){ return slice.call(this.elements()); }), selector);
        },
        siblings: function(selector) {
            return filtered(this.map(function(i, el) {
                return slice.call(el.parent().elements()).filter(function(child){ return child!==el; });
            }), selector);
        },
        next: function(selector) {
            return filtered(this.map(function() {
                var els = this.parent().elements().toArray();
                return els[els.indexOf(this) + 1];
            }), selector);
        },
        prev: function(selector) {
            return filtered(this.map(function() {
                var els = this.parent().elements().toArray();
                return els[els.indexOf(this) - 1];
            }), selector);
        },
        index: function(element) {
            return element ? this.indexOf($(element)[0]) : this.parent().elements().toArray().indexOf(this[0]);
        },
        pluck: function(property) {
            return this.map(function() {
                if (typeof this[property] == 'function') return this[property]();
                else return this[property];
            });
        }
    };

    'filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings'.split(',').forEach(function(property) {
        var fn = $.fn[property];
        $.fn[property] = function() {
            var ret = fn.apply(this, arguments);
            ret.prevObject = this;
            return ret;
        };
    });

    Z.prototype = $.fn;
    return $;
})();

var $ = $ || mechanic;  // expose $ shortcut
