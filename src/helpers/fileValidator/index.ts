export default class FileValidator {
  private file: File;

  constructor(file: File) {
    this.file = file;
  }

  isImage(): boolean {
    return true;
  }
}
