const { app, BrowserWindow, Menu } = require('electron');
const isDev = require("electron-is-dev");
const url = require('url');
const path = require("path");

// Set the URL to localhost in development (for hot-reloading)
// Otherwise, set the URL to 'index.html' to access the React-app
const appURL = isDev
	? "http://localhost:3000"
	: url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	});

// Main window for displaying the app
let mainWindow;

function createMainWindow() {
	// Create the browser window and load in the URL
	mainWindow = new BrowserWindow({
		width: 800,
		height: 800,
		title: "Synesthize",
		icon: path.join(__dirname, 'SynesthizeIcon.png'),
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		},
	});
	mainWindow.loadURL(appURL);

	// Open the DevTools if in development-mode
	if (isDev) {
		createDevToolsWindow(mainWindow)
	}

	// Build and insert <mainMenu> from <mainMenuTemplate>
	const menu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(menu);
}

// Opens up a new window
function createNewWindow(urlTag, name) {
	// Set <newWindow> to a smaller-sized window
	const newWindow = new BrowserWindow({
		width: 500,
		height: 400,
    	parent: mainWindow,
    	modal: true,
    	title: name,
		icon: path.join(__dirname, 'SynesthizeIcon.png'),
    	show: false,
    	autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
      		contextIsolation: false
		}
	});
	newWindow.loadURL(appURL + '/' + urlTag);

	// Display <newWindow>
	newWindow.once('ready-to-show', () => {
		newWindow.show();

		// Open the DevTools if in development
		if (isDev) {
			createDevToolsWindow(newWindow)
		}
	});
}

// Opens up the DevTools window
function createDevToolsWindow(parentWindow) {
	let devtools = new BrowserWindow({parent:parentWindow, title: "Dev tools"});
	parentWindow.webContents.setDevToolsWebContents(devtools.webContents);

	// Opens dev tools on the side of <parentWindow>
	parentWindow.webContents.once('did-finish-load', function () {
		let windowBounds = parentWindow.getBounds();
		parentWindow.webContents.openDevTools({ mode: 'detach' });
		devtools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
		devtools.setSize(400, windowBounds.height);
	});
}

// ============================ MENU TEMPLATES ============================ //
// Create a menu template for <mainWindow>
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Quit',
				accelerator: 'CmdOrCtrl+Q',
				click() {
					app.quit();
				}
			}
		]
	}
];

// Without an empty {} label, MacOS doesn't show 'File'
if (process.platform === 'darwin')
	mainMenuTemplate.unshift({});

// Add 'Debug' menu if in development
if (isDev) {
	mainMenuTemplate.push({
		label: 'Debug',
		click() {
			createNewWindow("debug", "Debug")
		}
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createMainWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
