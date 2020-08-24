export class FileDownloader {
  constructor(private globalWindow: Window & typeof globalThis) {}

  download(filename: string, content: string, contentType: string) {
    const blob = new Blob(['\ufeff', content], { type: contentType });
    const link = this.globalWindow.document.createElement('a');
    this.globalWindow.document.body.appendChild(link);
    link.href = this.globalWindow.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    this.globalWindow.URL.revokeObjectURL(link.href);
    this.globalWindow.document.body.removeChild(link);
  }
}
