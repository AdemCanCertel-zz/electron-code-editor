import { ipcRenderer, remote } from 'electron';
import fs from 'fs';

class FileManager {
  constructor({ editor, monaco }) {
    this.editor = editor;
    this.monaco = monaco;

    ipcRenderer.on('open-file', (e, url) => this.openFile(url));

    document.querySelector('#save').onclick = () => this.saveFile(); // Define a save area
  }

  openFile(url) {
    const parsedUrl = (url.slice(0, 7) === 'file://') ? url.slice(7) : url; // Saved home directory location

    fs.readFile(parsedUrl, 'utf-8', (err, data) => {  // Software languages can be added and deleted.
      this.editor.setModel(this.monaco.editor.createModel(data, 'javascript'));  // We apply the same procedures here, set it to be placed one under the other, you can press (TAB) for the same alignment.
      this.editor.setModel(this.monaco.editor.createModel(data, 'python')); // We apply the same procedures here, set it to be placed one under the other, you can press (TAB) for the same alignment.
    });
  }

  saveFile() {  // Save space
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
