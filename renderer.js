import loader from 'monaco-loader';
import { remote } from 'electron';
import FileManager from './filemanager'; // Dosya

loader().then((monaco) => {
  const editor = monaco.editor.create(document.getElementById('container'), {
    language: 'python',  // Her dil için değiştirilir JavaScript ise javascript kodları kullanılır
    language: 'javascript',  // Birden çok dil için altına ekleyin  ve filemanager.js gidip  this.editor.setModel(this.monaco.editor.createModel(data, 'javascript'));  alt alta dil ekleyin.
    theme: 'vs-dark', // Kod Editörü tema rengi (Visual Code Dark Theme) olarak ayarlandı
    automaticLayout: true,
  });

  const fileManager = new FileManager({ editor, monaco });

  remote.getCurrentWindow().show();
});
