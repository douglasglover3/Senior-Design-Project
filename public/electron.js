const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');

const url = 'http://localhost:3000';

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Synesthize",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(url);

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  // Build and insert <mainMenu> from <mainMenuTemplate>
	const menu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(menu);
}

// Opens up a new window
function createNewWindow(urlTag, name) {
	// Set <newWindow> to a smaller-sized window
	const newWindow = new BrowserWindow({
		width: 600,
		height: 400,
    	parent: win,
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
			newWindow.webContents.openDevTools({ mode: 'detach' });
		}
	})
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
					createNewWindow("addSchema", "Add Color Scheme")
				}
			},
			{
				label: 'Edit Color Scheme',
				click() {
					createNewWindow("editSchema",  "Edit Color Scheme")
				}
			},
			{
				label: 'Delete Color Scheme',
				click() {
					createNewWindow("deleteSchema", "Delete Color Scheme")
				}
			},
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
