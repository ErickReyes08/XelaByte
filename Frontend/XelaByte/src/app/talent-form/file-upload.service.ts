import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService 
{
  readonly FileTitle = "Seleccionar un archivo";
  readonly FileSubTitle = "o arrastre el archivo a esta área";

  public forLabelFile = "inputFile";
  public fileTitle = "";
  public fileSubTitle = "";

  constructor() { }

  //MÉTODO PARA ADQUIRIR EL ARCHIVO SI LO ARRASTRÓ MANUALMENTE
  fileDropped($event: File): void
  {
    this.fileTryUpload($event);
    //console.log("Archivo: " + $event.name);
  }

  //MÉTODO PARA ADQUIRIR EL ARCHIVO SUBIDO MEDIANTE EL BUSCADOR DE ARCHIVOS
  fileBrowseHandler($event: Event): void
  {
    const element = event?.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList)
    {
      if(fileList.item(0)?.type == "application/pdf") this.fileTryUpload(fileList.item(0));
      else
      {
        let fileContainer = document.getElementsByClassName("FileInputContainer").item(0) as HTMLElement;
        fileContainer.classList.add("errorText");
        setTimeout(() => { fileContainer.classList.remove("errorText"); }, 2000);
        this.fileTryUpload(new File([], "fileError"))
      }
      //console.log("Archivo: " + fileList.item(0)?.name);
    }
  }

  //MÉTODO PARA SUBIR EL ARCHIVO AL SERVIDOR
  fileTryUpload($event: File | null): void
  {
    if($event?.name == "fileError" || $event == null)
    { 
      this.fileTitle = "Error, la extensión del archivo no es correcta"; this.fileSubTitle = "";
      setTimeout(() => { this.fileTitle = this.FileTitle; this.fileSubTitle = this.FileSubTitle; }, 2000);
    }
    else
    { 
      this.forLabelFile=""; this.fileTitle = "Subiendo: " + $event?.name; this.fileSubTitle = "..."; 

      //CREAR EL BOTÓN DE CANCELAR PARA TENER LA OPORTUNIDAD DE DE CANCELAR EL PROCESO DE SUBIDA
      //CREAR EL BOTÓN DE BORRAR SI ES QUE SE TERMINÓ EL PROCESO DE SUBIR EL ARCHIVO
    }
  }

  //MÉTODO PARA ELIMINAR EL ARCHIVO Y PEDIR NUEVAMENTE LA SUBIDA DE UN ARCHIVO
  fileRemove(): any
  {
    console.log("Archivo eliminado...");
  }

}
