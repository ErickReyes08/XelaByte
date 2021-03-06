import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { CancelButtonComponent } from './CancelButton.component';
import { RemoveButtonComponent } from './RemoveButton.component';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../messages-container/messages.service';

@Component({
  selector: 'TalentForm',
  templateUrl: './talent-form.component.html',
  styleUrls: ['./talent-form.component.scss']
})

export class TalentFormComponent implements OnInit 
{
  @ViewChild("ActionButton", { read: ViewContainerRef })
  ActionButton!: ViewContainerRef;

  @Output() FormDataEmmiter = new EventEmitter<any>();

  //DATOS DEL FORMULARIO
  TalentFormData:
  {
    FullName: string,
    Age: number | undefined,
    Address: string,
    Telephone: string,
    AcademicDegree: string,
    Curriculum?: any | undefined
  } = { FullName: "", Age: undefined, Address: "", Telephone: "", AcademicDegree: "Bachillerato", Curriculum: undefined };
  //--------------------
  
  constructor(public FileUploader: FileUploadService, public componentFactoryResolver: ComponentFactoryResolver, private MessageService: MessagesService) { }

  ngOnInit(): void
  {
    if(this.FileUploader.IsMobile()) { this.FileUploader.FileSubTitle = ""; }
    this.FileUploader.fileTitle = this.FileUploader.FileTitle;
    this.FileUploader.fileSubTitle = this.FileUploader.FileSubTitle;
    this.FileUploader.FileButtons.set("CancelButton", () => { const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CancelButtonComponent); const componentRef = this.ActionButton.createComponent(dynamicComponentFactory); });
    this.FileUploader.FileButtons.set("RemoveButton", () => { const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(RemoveButtonComponent); const componentRef = this.ActionButton.createComponent(dynamicComponentFactory); });
    this.FileUploader.FileButtons.set("Remove", () => { this.ActionButton.remove(); });
  }

  SendForm(form: NgForm): void
  {
    //console.log(this.TalentFormData);
    let formInputsText: [HTMLInputElement, HTMLElement | undefined][] | undefined = [];
    let formButton: HTMLButtonElement | undefined;
    let formInfo: { Data: any, FormFrom: string, URL: string } | undefined;
    
    //ESTABLECIENDO TODOS LOS ELEMENTOS DEL FORMULARIO
    let formElement = document.getElementById("talentForm")!;

    /*ADQUIRIENDO LOS ELEMENTOS V??LIDOS DEL FORM*/
    for(let x=0; x<=3; x++)
    {
      let input = formElement.getElementsByClassName("input-c")[x].children.item(0) as HTMLInputElement;
      let small = formElement.getElementsByClassName("input-c")[x].children.item(1) as HTMLElement;
      if(input.classList.contains("ng-valid")) continue;
      formInputsText.push([input, small]);
    }
    //------------------------------------------------

    //SI HAY CAMPOS INV??LIDOS SE A??ADE EL BOT??N A LA LISTA Y SE MANDAN LOS CAMPOS AL PADRE
    if(formInputsText.length >= 1)
    {
      this.MessageService.SendMessage("Error al enviar el formulario", "Debe ingresar o corregir todos los campos del formulario antes de enviarlo. Verifique los espacios marcados en color rojo", 6000);
      formButton = formElement.getElementsByClassName("footer").item(0)?.children.item(0)?.children.item(0) as HTMLButtonElement;
      this.FormDataEmmiter.emit({formInputsText, formButton, undefined});
    }
    else //SE ENVIAN LOS DATOS AL PADRE PARA QUE SE SUBAN AL BACKEND
    {
      this.TalentFormData.Curriculum = this.FileUploader.FileUploadedData;
      /** CUANDO SE VALIDE EL FORM, SI EXISTE EL CURRICULUM SE ESTABLECER?? EL VALOR "FromValid" A "true" PARA QUE AL HACER EL POST SE SUBA EL ARCHIVO A LA CARPETA DE ALMACENAMIENTO PERMANENTE
      * @this.TalentForm.Data.Curriculum.FormValid = true;
      **/
      this.ResetFormValues(form);
      this.MessageService.SendMessage("Enviando formulario...", "El formulario se est?? enviando, por favor espere", 4000);
      formInfo = { Data: this.TalentFormData, FormFrom: "TalentForm", URL: "talentFormURL-Backend" }
      this.FormDataEmmiter.emit({formInputsText, formButton, formInfo});
    }
    //console.log(formInputsText, formButton);
  }

  ResetFormValues(form: NgForm)
  {
    let contactForm = document.getElementById("TalentForm");
    let closeButton = contactForm!.getElementsByClassName("Modal-exit")[0] as HTMLElement;
    closeButton.click();
    setTimeout(() => { form.resetForm(); contactForm!.getElementsByTagName("select")[0].selectedIndex = 0; }, 152);
  }
}
