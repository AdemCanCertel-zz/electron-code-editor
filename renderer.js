import loader from 'monaco-loader';
import { remote } from 'electron';
import FileManager from './filemanager'; // File

loader().then((monaco) => {
  const editor = monaco.editor.create(document.getElementById('container'), {
    language: 'python',  // It is changed for each language. If JavaScript, javascript codes are used.
    language: 'javascript',  // For multiple languages, add it below and go to filemanager.js and go to this.editor.setModel (this.monaco.editor.createModel (data, 'javascript')); add language to the bottom.
    theme: 'vs-dark', // Code Editor theme color set to (Visual Code Dark Theme)
    automaticLayout: true,
  });

  const fileManager = new FileManager({ editor, monaco });

  remote.getCurrentWindow().show();
});
