#import "../src/mechanic.js"

$.log("Hi!");
$("window")
	.find('#centerButton')
		.touch(2)
		.capture()
		.end()
	.children()
		.log()
		.orientation(UIA_DEVICE_ORIENTATION_LANDSCAPELEFT);
