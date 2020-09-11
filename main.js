import { app, BrowserWindow } from 'electron';


// Pencere nesnesinin genel bir referansını tutun, yapmazsanız, pencere
// JavaScript nesnesi çöp toplandığında otomatik olarak kapatılır.
let anaMenü;

const yeniPencere = () => {
  // Tarayıcı penceresini oluşturun.
  anaMenü = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // ve uygulamanın index.html'sini yükler.
  anaMenü.loadURL(`file://${__dirname}/index.html`);

  anaMenü.webContents.openDevTools();

  anaMenü.on('closed', () => {
    anaMenü = null;
  });
};

app.on('ready', yeniPencere);

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (anaMenü === null) {
    yeniPencere();
  }
});