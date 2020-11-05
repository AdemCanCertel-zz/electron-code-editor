import { app, BrowserWindow } from 'electron';


// Keep a general reference of the window object, if you don't, the window
// JavaScript object is automatically closed when garbage is collected.
let mainMenu;

const newWindow = () => {
  // Build the browser window.
  mainMenu = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and loads the application's index.html.
  mainMenu.loadURL(`file://${__dirname}/index.html`);

  mainMenu.webContents.openDevTools();

  mainMenu.on('closed', () => {
    mainMenu = null;
  });
};

app.on('ready', newWindow);

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainMenu === null) {
    newWindow();
  }
});
