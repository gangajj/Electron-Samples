const electron = require('electron');
const app =  electron.app;
const path = require('path');
const url = require('url');
const BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('ready',function(){
	mainWindow = new BrowserWindow({
			width: 1024,
			height: 768,
			backgroundColor: '#2e2c29',
			webPreferences: {
				nativeWindowOpen: true
			}
		});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true,
		nativeWindowOpen : true
	}));
	
	mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
	  if (frameName === 'modal') {
		// open window as modal
		event.preventDefault()
		Object.assign(options, {
		  modal: true,
		  parent: mainWindow,
		  width: 100,
		  height: 100
		})
		event.newGuest = new BrowserWindow(options)
	  }
	});
});