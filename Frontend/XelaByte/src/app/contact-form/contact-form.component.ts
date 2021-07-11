import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../messages-container/messages.service';

@Component({
  selector: 'ContactForm',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit 
{
  @Output() FormDataEmmiter = new EventEmitter<any>();

  //DATOS DEL FORMULARIO
  ContactFormData:
  {
    Name: string,
    Email: string,
    Affair: string,
    Message: string
  } = { Name: "", Email: "", Affair: "", Message: "" };
  //--------------------

  constructor(private MessageService: MessagesService) { }

  ngOnInit(): void
  {
  }

  SendForm(form: NgForm): void
  {
    let formInputsText: [HTMLInputElement, HTMLElement | undefined][] | undefined = [];
    let formButton: HTMLButtonElement | undefined;
    let formInfo: { Data: any, FormFrom: string, URL: string } | undefined;
    
    //ESTABLECIENDO TODOS LOS ELEMENTOS DEL FORMULARIO
    let formElement = document.getElementById("contactForm")!;

    /*ADQUIRIENDO LOS ELEMENTOS VÁLIDOS DEL FORM*/
    for(let x=0; x<=3; x++)
    {
      let input = formElement.getElementsByClassName("input-c")[x].children.item(0) as HTMLInputElement;
      let small = formElement.getElementsByClassName("input-c")[x].children.item(1) as HTMLElement;
      if(input.classList.contains("ng-valid")) continue;
      formInputsText.push([input, small]);
    }
    //------------------------------------------------

    //SI HAY CAMPOS INVÁLIDOS SE AÑADE EL BOTÓN A LA LISTA Y SE MANDAN LOS CAMPOS AL PADRE
    if(formInputsText.length >= 1)
    {
      this.MessageService.SendMessage("Error al enviar el formulario", "Debe ingresar o corregir todos los campos del formulario antes de enviarlo. Verifique los espacios marcados en color rojo", 6000);
      formButton = formElement.getElementsByClassName("footer").item(0)?.children.item(0)?.children.item(0) as HTMLButtonElement;
      this.FormDataEmmiter.emit({formInputsText, formButton, undefined});
    }
    else //SE ENVIAN LOS DATOS AL PADRE PARA QUE SE SUBAN AL BACKEND
    {
      //SE CIERRA Y RESETEA EL FORMULARIO
      this.ResetFormValues(form);
      //SE ENVÍAN LOS DATOS
      this.MessageService.SendMessage("Enviando formulario...", "El formulario se está enviando, por favor espere", 4000);
      formInfo = { Data: this.ContactFormData, FormFrom: "ContactForm", URL: "contactFormURL-Backend" }
      this.FormDataEmmiter.emit({formInputsText, formButton, formInfo});
    }
  }

  ResetFormValues(form: NgForm)
  {
    let contactForm = document.getElementById("ContactForm");
    let closeButton = contactForm!.getElementsByClassName("Modal-exit")[0] as HTMLElement;
    closeButton.click();
    setTimeout(() => { form.resetForm(); }, 152);
  }

}
