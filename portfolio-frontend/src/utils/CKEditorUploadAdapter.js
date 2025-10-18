// src/utils/CKEditorUploadAdapter.js
export default class CKEditorUploadAdapter {
  constructor(loader, token) {
    this.loader = loader;
    this.token = token;
  }

  // Starts the upload process
  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('upload', file);

        fetch('http://localhost:8082/api/blogs/upload-image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}` // send JWT token
          },
          body: data
        })
        .then(res => res.json())
        .then(res => {
          // CKEditor expects { default: "url" }
          resolve({ default: res.url });
        })
        .catch(err => reject(err));
      }));
  }

  abort() {
    // Optional: implement abort logic
  }
}

// Plugin for CKEditor to use the above adapter
export function CKEditorUploadPlugin(editor, token) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new CKEditorUploadAdapter(loader, token);
  };
}
