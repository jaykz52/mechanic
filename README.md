#mechanic.js (UIAutomation for the rest of us)

mechanic.js lets you take the power of UIAutomation with the simplicity of modern javascript CSS selector engines to make your UIAutomation scripts terse and beautiful.

Use mechanic.js to trim down your iOS automation scripts or to cut out the cruft in your iOS UATs.

You can also just use it to have fun. Want to click every button in the application? That's one line of code with mechanic. Need to get screenshots of every table cell in your favorite UITableView? Still just one line.

##Features

Selecting elements with mechanic.js looks a lot like jQuery, Dojo, Zepto, etc. The followimg will select all static text elements in the element named "My Scroll View":

``` js
$('#My Scroll View').find('UIAStaticText');
```

Mechanic provides selector shortcuts to remove some of the verbosity in selecting elements by type. The same elements could be selected with the following line:

``` js
$('#My Scroll View').find('text');
```

If you've already got a hold of the instances you care about, they can be passed into mechanic, giving them all the benefits of mechanic:

``` js
var mainWindow = UIATarget.localTarget().frontMostApp().mainWindow();
$(mainWindow).children().log();		// this calls logElement() internall
```

Mechanic comes with a number of utility functions to make your life easier:

``` js
$.backgroundApp(2);
$.delay(5);			// this calls UIATarget.localTarget().delay() internally
$("window").children().log();
```

Many of the utility functions are also tagged onto the selector implementation to allow chaining of selector commands and app-level commands, creating a nice cadence to your automation scripts. The following code captures screenshots of each cell in the "trip table" UITableView, waits for 5 seconds, and then logs their parent:

``` js
$.delay(5);
$('#trip table').find('cell')
	.capture()
	.delay(5)
	.parent().log();
```

Many of the UIAutomation user interaction functions have been simplified:

``` js
$.volume({direction: "up", duration: 2});	// UIATarget.localTarget().holdVolumeUp(2)
$.volume({direction: "down"});				// UIATarget.localTarget().clickVolumeDown();
$.prefs({
	"pref1": "value1", 						// ... frontMostApp().setPreferencesValueForKey("value1", "pref1");
	"pref2": "value2"						// ... frontMostApp().setPreferencesValueForKey("value2", "pref2")
});						
```

###... and more!

Mechanic has many more functions to make your life in iOS automation easier. API documentation is underway, and a test coverage is also a priority. In the mean time, take a look at the source to get an idea of what mechanic has to offer.

##Extending Mechanic.js

If there's a feature you're missing, it's easy to extend mechanic with your own "mixins"

``` js
(function() {
	$.extend($, {
		someAwesomeFeature: function() {
			// do something awesome
		},
		andAnother: function(someArg, anotherArg) {
			// more amazing greatness
		}
	});
	$.extend($.fn, {
		aNewSelectorMethod: function() {
			// yadda yadda yadda
			return this;	// returning 'this' allows you to chain selector-based functions together
		}
	});
}))();

$.someAwesomeFeature();
$("tableview").aNewSelectorMethod();	
```

##Including Mechanic.js

Grab a copy of mechanic.js and place it alongside your UIAutomation scripts. At the top of your UIAutomation script(s), import mechanic.js:

``` js
#import "mechanic.js"

// you'll now have "mechanic" (with "$" as a shortcut) in the global context.
mechanic("#some element name").ancestry().capture();
...
```

## Feature Requests/Bugs

 Mechanic is not perfect. Submit bugs and feature requests if there's something that you think is missing! If you encounter bugs, please report it on mechanic's Issues page: http://github.com/jaykz52/mechanic/issues
 
If you've got a fix in mind, fork and submit a pull request. We need contributors!

## Contributing

The project is currently in its infancy (~ 1 week old!). We need API documentation, additional features, and test coverage (!!!), so feel free to get in touch via github, or just start submitting patches! Try to keep patches to single issues, this will make our lives easier in the long term.

# License

Copyright (c) 2012 Jason Kozemczak

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
