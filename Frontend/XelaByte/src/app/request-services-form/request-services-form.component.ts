import { Component, OnInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { RequestServicesService } from './request-services.service';

@Component({
  selector: 'RequestServicesForm',
  templateUrl: './request-services-form.component.html',
  styleUrls: ['./request-services-form.component.scss']
})
export class RequestServicesFormComponent implements OnInit, AfterContentInit
{
  @Output() FormDataEmmiter = new EventEmitter<any>();
  //DATOS DEL FORMULARIO
  RequestServicesFormData:
  {
    Name: string,
    Telephone: string,
    Email: string,
    Services: string[],
    OtherService: string
  } = { Name: "", Telephone: "", Email: "", Services: [], OtherService: "" }
  //--------------------

  constructor(public RequestServices: RequestServicesService) { }

  ngOnInit(): void 
  {
  }

  ngAfterContentInit(): void
  {
    let OtherServiceCB = document.getElementById("ServiceCBOtherOption") as HTMLInputElement;
    let Label = document.getElementById("ServiceCBOtherOption") as HTMLElement;
    let TextArea = document.getElementById("OtherServiceArea") as HTMLTextAreaElement;

    TextArea.innerHTML = "";
    TextArea.readOnly = true;

    let OtherServiceClick = function()
    {
      if(OtherServiceCB.checked)
      {
        TextArea.value = "";
        TextArea.readOnly = false;
      }
      else
      {
        TextArea.value = "";
        TextArea.readOnly = true;
      }
    }

    OtherServiceCB.onclick = OtherServiceClick;
    Label.onload = OtherServiceClick;

    this.RequestServices.CanSetServices = true;
  }

  SendForm(): void
  {
    let formInputsText: [HTMLInputElement, HTMLElement | undefined][] | undefined = [];
    let formButton: HTMLButtonElement | undefined;
    let formInfo: { Data: any, URL: string } | undefined;
    
    //ESTABLECIENDO TODOS LOS ELEMENTOS DEL FORMULARIO
    let formElement = document.getElementById("requestServicesForm")!;

    /*ADQUIRIENDO LOS ELEMENTOS VÁLIDOS DEL FORM*/
    for(let x=0; x<=2; x++)
    {
      let input = formElement.getElementsByClassName("input-c")[x].children.item(0) as HTMLInputElement;
      let small = formElement.getElementsByClassName("input-c")[x].children.item(1) as HTMLElement;
      if(input.classList.contains("ng-valid")) continue;
      formInputsText.push([input, small]);
    }

    let ServicesCheckBoxes = Array.from(document.getElementsByName("ServicesCheckBox")) as HTMLInputElement[];
    let ServicesNames = Array.from(document.getElementsByName("ServiceName")) as HTMLElement[]

    let OtherServiceOption = document.getElementById("ServiceCBOtherOption") as HTMLInputElement; ServicesCheckBoxes.push(OtherServiceOption);

    let ValidatedServices: [HTMLInputElement, HTMLElement][] = new Array<[HTMLInputElement, HTMLElement]>();
    let AllUnChecked = true;
    //VERIFICANDO Y ADQUIRIENDO LOS SERVICIOS CHEQUEADOS POR EL USUARIO A EXCEPCIÓN DE "Otro servicio"
    for(let x = 0; x < ServicesCheckBoxes.length; x++)
    {
      if(ServicesCheckBoxes[x].checked)
      {
        AllUnChecked = false; if(ServicesCheckBoxes[x] == OtherServiceOption) continue;
        ValidatedServices!.push([ServicesCheckBoxes[x], ServicesNames[x]]);
      }
    }
    if(AllUnChecked) { formInputsText.push([OtherServiceOption, formElement.getElementsByClassName("input-c")[3].children.item(1) as HTMLElement]); }
    for(let [VServiceInput, VServiceName] of ValidatedServices){ this.RequestServicesFormData.Services.push(VServiceName.textContent!); }
    //------------------------------------------------

    //SI HAY CAMPOS INVÁLIDOS SE AÑADE EL BOTÓN A LA LISTA Y SE MANDAN LOS CAMPOS AL PADRE
    if(formInputsText.length >= 1)
    {
      formButton = formElement.getElementsByClassName("footer").item(0)?.children.item(0)?.children.item(0) as HTMLButtonElement;
      this.FormDataEmmiter.emit({formInputsText, formButton, undefined});
    }
    else //SE ENVIAN LOS DATOS AL PADRE PARA QUE SE SUBAN AL BACKEND
    {
      console.log(this.RequestServicesFormData);
      formInfo = { Data: this.RequestServicesFormData, URL: "requestServicesFormURL-Backend" }
      this.FormDataEmmiter.emit({formInputsText, formButton, formInfo});
    }
  }

}
