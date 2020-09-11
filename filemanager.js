import { ipcRenderer, remote } from 'electron';
import fs from 'fs';

class FileManager {
  constructor({ editor, monaco }) {
    this.editor = editor;
    this.monaco = monaco;

    ipcRenderer.on('open-file', (e, url) => this.openFile(url));

    document.querySelector('#save').onclick = () => this.saveFile(); // Kaydetme alanı tanımlama
  }

  openFile(url) {
    const parsedUrl = (url.slice(0, 7) === 'file://') ? url.slice(7) : url; // Kaydedilen ana dizin yeri

    fs.readFile(parsedUrl, 'utf-8', (err, data) => {  // Yazılım dilleri eklenebilir silinebilir.
      this.editor.setModel(this.monaco.editor.createModel(data, 'javascript'));  // Aynı işlemleri burda uyguluyoruz alt alta koyulcak şekilde ayarlayın aynı hiza için (TAB) basabilirsiniz.
      this.editor.setModel(this.monaco.editor.createModel(data, 'python')); // Aynı işlemleri burda uyguluyoruz alt alta koyulcak şekilde ayarlayın aynı hiza için (TAB) basabilirsiniz.
    });
  }

  saveFile() {  // Kaydetme alanı
    remote.dialog.showSaveDialog((filename) => {
      if (!filename) return;

      const model = this.editor.getModel();
      let data = '';

      model._lines.forEach((line) => {
        data += line.text + model._EOL;
      });

      fs.writeFile(filename, data, 'utf-8');
    });
  }
}

module.exports = FileManager;
