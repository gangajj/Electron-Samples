'use strict';
const electron = require('electron');
const app = electron.app;
global.filepreview = require('filepreview');
//require('electron-debug')();
let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);
	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
		filepreview.generate('https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjh6MLW0u3YAhWBOpQKHULbAFQQFggmMAA&url=http%3A%2F%2Fgahp.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fsample.pdf&usg=AOvVaw1uNIspJe1bqvlT-j0ZbIQn', 'https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi8ttzq0u3YAhXJG5QKHWQyBf4QjRwIBw&url=http%3A%2F%2Fwww.cameraegg.org%2Fcanon-powershot-g3-x-sample-images%2F&psig=AOvVaw2pktc5SvwGcHpBa5znwVfb&ust=1516781843854287', function(error) {
		if (error) {
		  return console.log(error);
		}
		console.log('File preview is /home/myfile_preview.gif');
	});	
});