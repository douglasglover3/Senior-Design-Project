const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const url = 'http://localhost:3000';

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    title: "Synesthize",
    webPreferences: {
      	nodeIntegration: true,
		contextIsolation: false,
    },
  });
  mainWindow.loadURL(url);

  // Open the DevTools.
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
    	show: false,
    	autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
      	contextIsolation: false
		}
	});
	newWindow.loadURL(url + '/' + urlTag);
	newWindow.once('ready-to-show', () => {
		newWindow.show()
		// Open the DevTools.
		if (isDev) {
			createDevToolsWindow(newWindow)
		}
	})
}

function createDevToolsWindow(parentWindow) {
	let devtools = new BrowserWindow({parent:parentWindow});
	parentWindow.webContents.setDevToolsWebContents(devtools.webContents);
	//opens dev tools on the side
	parentWindow.webContents.once('did-finish-load', function () {
		var windowBounds = parentWindow.getBounds();
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
				label: 'Add Color Scheme',
				accelerator: 'CmdOrCtrl+N',
				click() {
					mainWindow.webContents.send('ADD_COLOR_SCHEME');
				}
			},
			{
				label: 'Edit Color Scheme',
				accelerator: 'CmdOrCtrl+E',
				click() {
					mainWindow.webContents.send('EDIT_COLOR_SCHEME');
				}
			},
			{
				label: 'Delete Color Scheme',
				accelerator: 'CmdOrCtrl+D',
				click() {
				}
			},
			{
				label: 'Quit',
				accelerator: 'CmdOrCtrl+Q',
				click() {
					app.quit();
				}
			}
		],
	},
	{
		label: 'Debug',
		click() {
			createNewWindow("debug", "Debug")
		}
	}
];

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

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
    createWindow();
  }
});
