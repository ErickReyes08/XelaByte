import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HomeResolverService } from '../home-resolver.service';
import { RequestServicesService } from '../request-services-form/request-services.service';
import { MessagesService } from '../messages-container/messages.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit
{
  private FormsPairs = function()
  {
    //let FormButtons = Array.from(document.getElementsByName("FormButton"));
    let FormButtons = 
    [ 
      Array.from(document.getElementsByName("ContactFormButton")),
      Array.from(document.getElementsByName("TalentFormButton")),
      Array.from(document.getElementsByName("MakeAppointmentFormButton"))
    ];

    let FormCloseButtons = Array.from(document.getElementsByName("FormCloseButton"));
    let Forms = Array.from(document.getElementsByName("Form"));
    let res = [];
    for(let x = 0; x < Forms.length; x++)
    {
      res.push(
      { 
        Buttons: FormButtons[x],
        CloseButton: FormCloseButtons[x],
        Form: Forms[x]
      });
    }

    return res;
  }
  //PROPIEDADES GET PARA ENCAPSULAR LA INFORMACIÓN DEL "HomeResolver"
  public get TeamData(): any { return this.HomeResolver.TeamData; }
  public get HomeVideoLink(): any { return this.HomeResolver.HomeVideoLink; }

  constructor(
    private activatedRoute: ActivatedRoute, 
    private HomeResolver: HomeResolverService, 
    private RequestService: RequestServicesService, 
    private sanitizer: DomSanitizer,
    private MessageService: MessagesService) { }
  
  ngOnInit(): void
  {
    this.SetFormAnimations();
    this.activatedRoute.data.subscribe( response => {
      //ESTABLECIENDO LOS DATOS UNA VEZ CARGADO CORRECTAMENTE EL RESOLVER
      let HomeVideoURL = "https://www.youtube.com/embed/JIZLzhUFLvY";
      //--------CÓDIGO FINAL CUANDO SE RECIBNA LOS DATOS DEL BACKEND------------this.HomeResolver.HomeVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(response.HomeData.get("HomeVideoLink"));
      this.HomeResolver.HomeVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(HomeVideoURL);
      console.log(response.HomeData);
    });
  }
  //ESTABLECIENDO LA ANIMACIÓN DEL FORMULARIO DE LOS SERVICIOS DESPUÉS DE QUE SE GENEREN LOS ELMENTOS
  ngAfterViewInit(){ this.SetServicesFormAnimation(); }

  RecieveFormsData($event: any): void
  {
    let FormInputsText: [HTMLInputElement, HTMLElement | undefined][] | undefined = $event.formInputsText;
    let FormButton: HTMLButtonElement | undefined = $event.formButton;
    let FormInfo: { Data: any, FormFrom: string, URL: string } | undefined = $event.formInfo;

    //SI NO HAY DATOS, SIGNIFICA QUE HUBO UN ERROR POR LO QUE SE LE MOSTRARÁ AL USUARIO GRÁFICAMENTE SOBRE EL ERROR
    if(FormInfo === undefined)
    {
      this.MessageService.SendMessage("Error al enviar el formulario", "Debe ingresar o corregir todos los campos del formulario antes de enviarlo. Verifique los espacios marcados en color rojo", 6000);
      for(let [input, small] of FormInputsText!)
      {
        input.classList.replace("ng-pristine", "ng-dirty");
        if(small === undefined) continue;
        small!.classList.add("shakeError");
        setTimeout(() => { small!.classList.remove("shakeError"); }, 310);
      }
      FormButton!.classList.add("shakeError");
      setTimeout(() => { FormButton!.classList.remove("shakeError"); }, 310);
    }
    else
    {
      this.MessageService.SendMessage("Enviando formulario...", "El formulario se está enviando, por favor espere", 4000);
      //RELIZAR EL MÉTODO POST DE LA INFORMACIÓN DEL FORMULARIO
      setTimeout(() => {
        switch(FormInfo?.FormFrom)
        {
          case "ContactForm": this.MessageService.SendMessage("Los datos se enviaron correctamente", "Su mensaje para contactarnos de envió correctamente, espere una respuesta en los proximos días en la dirección de correco electrónico ingresado", 6000, {AcceptButton: ()=>{}}); break;
        }
      }, 2000);
      console.log(FormInfo);
    }
  }

  SetServicesFormAnimation(): void
  {
    //console.log("AfterViewInit");
    //FORMULARIO DE SERVICIOS
    let ServiceFormButtons = Array.from(document.getElementsByName("ServiceFormButton"));
    let ServiceFormCloseButton = document.getElementsByName("ServiceFormCloseButton")[0] as HTMLElement;
    let ServiceForm = document.getElementsByName("ServiceForm")[0] as HTMLElement;
    console.log(ServiceFormButtons, ServiceFormCloseButton, ServiceForm);
    //ABRIENDO EL FORMULARIO
    for(let ServiceFormButton of ServiceFormButtons)
    {
      ServiceFormButton.onclick = () => 
      { 
        ServiceForm.classList.toggle("d-block");
        setTimeout(() => 
        {
          if(this.IsMobile()) document.body.classList.toggle("ModalActive-m");
          else document.body.classList.toggle("ModalActive");
          ServiceForm.classList.toggle("Show"); ServiceForm.children[0].children[0].classList.toggle("Show-content");
        }, 2)
      };
    }
    //CERRANDO EL FORMULARIO
    let isMobile = this.IsMobile();
    ServiceFormCloseButton.onclick = function()
    {
      let child = ServiceForm.children[0].children[0];
      child.classList.replace("Show-content", "Hide-content");
      ServiceForm.classList.remove("Show");
      setTimeout(() => 
      { 
        child.classList.remove("Hide-content");
        if(isMobile) document.body.classList.remove("ModalActive-m");
        else document.body.classList.remove("ModalActive");
        ServiceForm.classList.remove("d-block"); 
      }, 152);
    }
  }

  SetFormAnimations()
  {
    for(let item of this.FormsPairs())
    {
      /*ABRIENDO EL FORM*/
      for(let formButton of item.Buttons)
      {
        //CUANDO HACE CLICK AL BOTÓN PARA MOSTRAR EL FORMULARIO
        formButton.onclick = () => 
        { 
          item.Form.classList.toggle("d-block");
          setTimeout(() => 
          {
            if(this.IsMobile()) document.body.classList.toggle("ModalActive-m");
            else document.body.classList.toggle("ModalActive");
            item.Form.classList.toggle("Show"); item.Form.children[0].children[0].classList.toggle("Show-content");
          }, 2)
        };
        /*----------------*/
      }
      
      /*CERRANDO EL FORM*/
      let isMobile = this.IsMobile();
      let OnExitForm = function()
      {
        let child = item.Form.children[0].children[0];
        child.classList.replace("Show-content", "Hide-content");
        item.Form.classList.remove("Show");
        setTimeout(() => 
        { 
          child.classList.remove("Hide-content");
          if(isMobile) document.body.classList.remove("ModalActive-m");
          else document.body.classList.remove("ModalActive");
          item.Form.classList.remove("d-block"); 
        }, 152);
      }

      //CUANDO PRESIONA AFUERA DEL FORMULARIO LO CIERRA
      //window.onclick = function(event: MouseEvent) { if(event.target === item.Form){ OnExitForm(); } }
      //CUANDO PRESIONA EL BOTÓN DE CERRAR
      item.CloseButton.onclick = function() { OnExitForm(); };
      /*----------------*/
    }
  }
  
  IsMobile(): boolean { return (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false; }
}
