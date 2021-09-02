import { Directive, HostBinding, HostListener, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File,
  url: SafeUrl,
  name: string
}

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding("style.background") public background = "#fff";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#fff";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff';
  
    let files: FileHandle[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      const name = evt.dataTransfer.files[i].name;
      files.push({ file, url, name });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }

}

