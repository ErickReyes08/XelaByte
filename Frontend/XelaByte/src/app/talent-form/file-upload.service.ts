import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, Subscription } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService implements OnInit
{
  readonly FileTitle = "Seleccionar un archivo .pdf";
  FileSubTitle = "o arrastre el archivo .pdf a esta área";

  public forLabelFile = "inputFile";
  public fileTitle = "";
  public fileSubTitle = "";

  public FileButtons = new Map<string, any>();

  public FileUploadedLink: string = "";
  public FileUploadedData: any = undefined;
  public FileUploaded: boolean = false;
  public RequestingFile!: Subscription;
  

  InputLocked: boolean = false;

  constructor(private http:HttpClient) { }

  ngOnInit()
  {
  }

  //MÉTODO PARA DETECTAR SI ABRIÓ EL BUSCADOR DE ARCHIVOS PARA BLOQUEAR EL ARRASTRE DE ARCHIVOS EN SIMULTANEO
  FileInputClicked(): void
  {
    //console.log("BrowseOpened");
    let inputFile = document.getElementById("inputFile") as HTMLInputElement;
    //let containFiles = true;
    window.onfocus = () =>
    {
      console.log("ON WINDOWS FOCUS");
      if(inputFile.files?.length){ /*console.log("ENTER IF");*/ this.InputLocked = true; } 
      else { /*console.log("ENTER ELSE");*/ this.InputLocked = false; }
      window.onfocus = null;
    }
    //this.InputLocked = containFiles;
  }

  //MÉTODO PARA ADQUIRIR EL ARCHIVO SI LO ARRASTRÓ MANUALMENTE
  fileDropped($event: File): void
  {
    if(this.InputLocked){ return; }
    this.fileTryUpload($event);
    //console.log("Archivo: " + $event.name);
  }

  //MÉTODO PARA ADQUIRIR EL ARCHIVO SUBIDO MEDIANTE EL BUSCADOR DE ARCHIVOS
  fileBrowseHandler($event: Event)
  {
    $event.stopImmediatePropagation();
    $event.preventDefault();
    $event.stopPropagation();
    const element = event?.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList)
    {
      let fileContainer = document.getElementsByClassName("FileInputContainer").item(0) as HTMLElement;
      if(fileList.item(0)?.type == "application/pdf")
      { 
        fileContainer.classList.add("fileLoading");
        this.fileTryUpload(fileList.item(0));
      }
      else
      {
        fileContainer.classList.add("errorText");
        this.fileTryUpload(new File([], "fileError"))
        setTimeout(() => { fileContainer.classList.remove("errorText"); }, 2000);

        this.InputLocked = false;
      }
      (<HTMLInputElement>document.getElementById("inputFile")).value = '';
      //console.log("Archivo: " + fileList.item(0)?.name);
    }
  }

  
  //MÉTODO PARA SUBIR EL ARCHIVO AL SERVIDOR
  fileTryUpload($file: File | null): void
  {
    if($file?.name == "fileError" || $file == null)
    {
      this.forLabelFile="";
      this.fileTitle = "Error, la extensión del archivo no es correcta"; this.fileSubTitle = "";
      this.InputLocked = true;
      setTimeout(() => { this.fileTitle = this.FileTitle; this.fileSubTitle = this.FileSubTitle; this.forLabelFile="inputFile"; this.InputLocked = false; }, 2000);
    }
    else
    { 
      this.forLabelFile=""; this.fileTitle = "Subiendo: " + $file?.name; this.fileSubTitle = ""; 

      //SUBIR EL ARCHIVO AL SERVIDOR
      let tryUpload = this.UploadFile($file, "https://file.io");
      this.RequestingFile = tryUpload.subscribe((event: any) =>
      {
        if(typeof(event) === 'object')
        {
          //ACCIONES DE HABERSE SUBIDO EL ARCHIVO
          this.fileTitle = $file?.name; this.fileSubTitle = "";
          (document.getElementsByClassName("FileInputContainer").item(0))?.classList.remove("fileLoading");
          console.log(event.link);
          this.FileUploadedData = { id: uuidv4(), event };
          this.FileUploadedLink = event.link;
          this.FileUploaded = true;
          console.log(this.FileUploadedData);
          //CREAR EL BOTÓN DE BORRAR SI ES QUE SE TERMINÓ EL PROCESO DE SUBIR EL ARCHIVO
          this.RemoveButton("Remove");
          this.CreateButton("RemoveButton");
          //setTimeout(() => { this.fileTitle = $file?.name; this.fileSubTitle = ""; this.CreateButton("RemoveButton"); }, 300);
        }
      });

      //CREAR EL BOTÓN DE CANCELAR PARA TENER LA OPORTUNIDAD DE DE CANCELAR EL PROCESO DE SUBIDA
      this.CreateButton("CancelButton");
      this.InputLocked = true;
    }
  }

  UploadFile($file: File, url: string): Observable<any>
  {
    const formData = new FormData();
    formData.append("file", $file, $file.name);
    return this.http.post(url, formData);
  }

  //MÉTODO PARA ELIMINAR EL ARCHIVO Y PEDIR NUEVAMENTE LA SUBIDA DE UN ARCHIVO
  CancelUpload(): any
  {
    this.RequestingFile.unsubscribe();
    this.RestoreInputData();
    console.log("Archivo cancelado...");
  }

  DeleteFile(fileName: string, url: string): Observable<any>
  {
    //RESETEAR EL LINK PARA EL PRÓXIMO ARCHIVO
    this.FileUploadedLink = "";
    return this.http.delete(url);
  }

  //MÉTODO PARA ELIMINAR EL ARCHIVO Y PEDIR NUEVAMENTE LA SUBIDA DE UN ARCHIVO
  RemoveFile(): any
  {
    let fileInputContainer = (document.getElementsByClassName("FileInputContainer").item(0));
    //ACCIONES PARA ELIMINAR EL ARCHIVO DEL SERVIDOR
    fileInputContainer?.classList.add("fileLoading", "errorText");

    this.fileTitle = "Eliminando archivo del servidor"; this.fileSubTitle = "";
    this.forLabelFile = "";

    this.DeleteFile("", this.FileUploadedLink).subscribe((event: any) => 
    {
      if(typeof(event) === 'object')
      {
        //ACCIONES EN CASO DE HABERSE ELIMINADO EL ARCHIVO CORRECTAMENTE
        fileInputContainer?.classList.remove("fileLoading", "errorText");
        this.RestoreInputData();
        console.log("Se eliminó el archivo: ", event);
      }
    }, (error) => 
    {
      console.log(error);
      fileInputContainer?.classList.remove("fileLoading", "errorText");
      this.RestoreInputData();
      console.log("Se eliminó el archivo: ");
    });
    

    console.log("Archivo eliminado...");
  }

  //MÉTODOS VARIOS
  CreateButton(op: string, subscription?: Subscription): void
  {
    this.FileButtons.get(op)();
  }

  RemoveButton(op: string): void
  {
    this.FileButtons.get(op)();
  }

  RestoreInputData()
  {
    this.fileTitle = this.FileTitle;
    this.fileSubTitle = this.FileSubTitle;
    this.forLabelFile = "inputFile";
    document.getElementById("FileInputContainer")!.classList.remove("fileLoading");
    this.RemoveButton("Remove");
    this.InputLocked = false;
    this.FileUploaded = false;
    this.FileUploadedData = undefined;
  }

  IsMobile(): boolean { return (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false; }
}
