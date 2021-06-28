import { ThrowStmt, TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[DragNDrop]'
})

export class DragNDropDirective 
{
  @Output() file = new EventEmitter<any>();
  @HostBinding("class.fileOver") isfileOver: boolean = false;
  @HostBinding("class.errorText") isfileInValid: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(ev: DragEvent)
  {
    ev.preventDefault();
    ev.stopPropagation();
    //ACCIONES EN CASO DE ARRASTRAR EL OBJETO AL INPUT
    this.isfileOver = true;
    //console.log("Archivo arrastrandose adentro del input");
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(ev: DragEvent)
  {
    ev.preventDefault();
    ev.stopPropagation();
    //ACCIONES EN CASO DE DEJAR DE ARRASTRAR EL OBJETO DEL INPUT
    this.isfileOver = false;
    //console.log("Archivo fuera del input");
  }

  @HostListener("drop", ["$event"]) public onDrop(ev: DragEvent)
  {
    this.isfileOver = false;

    console.log(ev.dataTransfer?.files.item(0)?.type);
    if(ev.dataTransfer?.files.item(0)?.type != "application/pdf" || ev.dataTransfer?.files.item(0)?.type == null) 
    { 
      this.isfileInValid = true;
      setTimeout(() => { this.isfileInValid = false; }, 2000);
      this.file.emit(new File([], "fileError")); 
      return false; 
    } 

    ev.preventDefault();
    ev.stopPropagation();
    console.log("Archivo dropeado");

    let file = ev.dataTransfer?.files.item(0);
    this.file.emit(file);

    this.isfileInValid = false;
    return true;
  }

}
