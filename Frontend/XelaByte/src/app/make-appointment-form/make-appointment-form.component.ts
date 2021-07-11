import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../messages-container/messages.service';

@Component({
  selector: 'MakeAppointmentForm',
  templateUrl: './make-appointment-form.component.html',
  styleUrls: ['./make-appointment-form.component.scss']
})
export class MakeAppointmentFormComponent implements OnInit 
{
  @Output() FormDataEmmiter = new EventEmitter<any>();
  private todayDateStr: string = "";
  //DATOS DEL FORMULARIO
  MakeAppointmentFormData:
  {
    Name: string,
    Telephone: string,
    Email: string,
    Date: string,
    Hour: string
  } = { Name: "", Telephone: "", Email: "", Date: "", Hour: "" };
  //--------------------
  
  constructor(private MessageService: MessagesService) { }

  ngOnInit(): void 
  {
    let appointmentDate = document.getElementById("AppointmentDate") as HTMLInputElement;
    let todayDate = new Date();
    let day = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    let year = todayDate.getFullYear();
    let dayStr = day < 10 ? '0' + day : day.toString();
    let monthStr = month < 10 ? '0' + month : month.toString();
    let todayDateStr = year + '-' + monthStr + '-' + dayStr;
    appointmentDate.setAttribute("min", todayDateStr);
    this.todayDateStr = todayDateStr;
  }

  SendForm(form: NgForm): void
  {
    let formInputsText: [HTMLInputElement, HTMLElement | undefined][] | undefined = [];
    let formButton: HTMLButtonElement | undefined;
    let formInfo: { Data: any, FormFrom: string, URL: string } | undefined;
    
    //ESTABLECIENDO TODOS LOS ELEMENTOS DEL FORMULARIO
    let formElement = document.getElementById("makeAppointmentForm")!;

    /*ADQUIRIENDO LOS ELEMENTOS VÁLIDOS DEL FORM*/
    for(let x=0; x<=4; x++)
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
      this.ResetFormValues(form);
      this.MessageService.SendMessage("Enviando formulario...", "El formulario se está enviando, por favor espere", 4000);
      formInfo = { Data: this.MakeAppointmentFormData, FormFrom: "MakeAppointment", URL: "makeAppointmentFormURL-Backend" }
      this.FormDataEmmiter.emit({formInputsText, formButton, formInfo});
    }
  }

  //MÉTODOS PARA PREVENIR EL INGRESO ERRONEO DE DATOS EN LA FECHA Y HORA DE LA CITA
  DateChanged($event: any): void
  {
    let formElement = document.getElementById("makeAppointmentForm")!;
    let dateInput = formElement.getElementsByClassName("input-c")[3].children.item(0) as HTMLInputElement;
    let dateInputDateTime = new Date(dateInput.value), todayDate = new Date(this.todayDateStr);
    //console.log(dateInputDateTime.toDateString() + " < " + todayDate + "?: " + (dateInputDateTime < todayDate));
    if(dateInputDateTime < todayDate || dateInputDateTime.toDateString() == "Invalid Date") { setTimeout(() => { dateInput.classList.replace("ng-valid", "ng-invalid"); }, 100); }
    else dateInput.classList.replace("ng-invalid", "ng-valid");
    //console.log("Changed");
  }

  HourChanged($event: any): void
  {
    let formElement = document.getElementById("makeAppointmentForm")!;
    let hourInput = formElement.getElementsByClassName("input-c")[4].children.item(0) as HTMLInputElement;

    let minHour = 6, maxHour = 18;
    let Hour: number = +hourInput.value.split(":")[0], Minute: number = +hourInput.value.split(":")[1];

    if(Hour < minHour || Hour > maxHour || Hour == 0 || (Hour == maxHour && Minute >= 1)) { setTimeout(() => { hourInput.classList.replace("ng-valid", "ng-invalid"); }, 100); }
    else hourInput.classList.replace("ng-invalid", "ng-valid");
    //console.log("Hour: " + Hour + "\nMinute: " + Minute);
  }

  ResetFormValues(form: NgForm)
  {
    let contactForm = document.getElementById("MakeAppointmentForm");
    let closeButton = contactForm!.getElementsByClassName("Modal-exit")[0] as HTMLElement;
    closeButton.click();
    setTimeout(() => { form.resetForm(); }, 152);
  }
}
