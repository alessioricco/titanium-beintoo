/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	
	
	var guid = Ti.App.Properties.getString('userguid', '');
	if (guid == '') {
		guid = Ti.App.Properties.setString('userguid', Titanium.Platform.createUUID());
	}
	Ti.API.info('userguid is a string that uniquely identify this player in your app ' + guid);
	

	var Window = require('ApplicationWindow');
	var win = new Window();
	win.open();
	
})();
