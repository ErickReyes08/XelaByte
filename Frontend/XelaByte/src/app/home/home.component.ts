import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HomeFooterComponent } from '../home-footer/home-footer.component';
import { RequestServicesService } from '../request-services-form/request-services.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit
{
  //DATOS DEL APARTADO DE NUESTRO EQUIPO
  public TeamData = 
  [
    {
      MemberName: "Samuel Rabi Romero",
      MembersPosition: "Depto. Administración",
      MemberImageURL: "../../assets/Img/2.jpg"
    },
    {
      MemberName: "Erick Alfonso Reyes",
      MembersPosition: "Depto. Soporte Técnico",
      MemberImageURL: "../../assets/Img/2.jpg"
    }
  ];
  //------------------------------------

  private FormsPairs = function()
  {
    let FormButtons = Array.from(document.getElementsByName("FormButton"));
    let FormCloseButtons = Array.from(document.getElementsByName("FormCloseButton"));
    let Forms = Array.from(document.getElementsByName("Form"));
    let res = [];
    for(let x = 0; x < Forms.length; x++)
    {
      res.push(
      {
        Button: FormButtons[x],
        CloseButton: FormCloseButtons[x],
        Form: Forms[x]
      });
    }

    return res;
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.SetFormAnimations();
    this.activatedRoute.data.subscribe((response)=>
      {
        //forkJoin PARA DETECTAR CUANDO LOS OBSERVABLES TERMINARON DE ADQUIRIR LOS DATOS DEL SERVIDOR
        forkJoin([response.HomeData.get("TeamData"), response.HomeData.get("ServicesData"), response.HomeData.get("FooterData")]).subscribe((data: any) =>
        {
          //console.log(data);
          //ADQUIRIENDO LOS DATOS DE LA REQUEST DE "TeamData"
          if(typeof(data[0]) === "object"){ console.log(data[0][0]); }

          //ADQUIRIENDO LOS DATOS DE LA REQUEST DE "ServicesData"
          if(typeof(data[1]) === "object"){ console.log(data[1][0]); }

          //ADQUIRIENDO LOS DATOS DE LA REQUEST DE "FooterData"
          if(typeof(data[2]) === "object"){ console.log(data[2][0]); }
          //this.RequestServices.ServicesCards = [];
          //this.TeamData = [];


          //LUEGO DE OBTENER Y ESTABLECER LOS DATOS DE LOS SERVICIOS SE CONFIGURA LA ANIMACIÓN DEL FORMULARIO DE SERVICIOS
          this.SetServicesFormAnimation();
        });
      }
    );
  }

  RecieveFormsData($event: any): void
  {
    let FormInputsText: [HTMLInputElement, HTMLElement | undefined][] | undefined = $event.formInputsText;
    let FormButton: HTMLButtonElement | undefined = $event.formButton;
    let FormInfo: { Data: any, URL: string } | undefined = $event.formInfo;

    //SI NO HAY DATOS, SIGNIFICA QUE HUBO UN ERROR POR LO QUE SE LE MOSTRARÁ AL USUARIO GRÁFICAMENTE SOBRE EL ERROR
    if(FormInfo === undefined)
    {
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
      //RELIZAR EL MÉTODO POST DE LA INFORMACIÓN DEL FORMULARIO
      console.log(FormInfo);
    }
  }

  SetServicesFormAnimation(): void
  {
    console.log("AfterViewInit");
    //FORMULARIO DE SERVICIOS
    let ServiceFormButtons = Array.from(document.getElementsByName("ServiceFormButton"));
    let ServiceFormCloseButton = document.getElementsByName("ServiceFormCloseButton")[0] as HTMLElement;
    let ServiceForm = document.getElementsByName("ServiceForm")[0] as HTMLElement;
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
      //CUANDO HACE CLICK AL BOTÓN PARA MOSTRAR EL FORMULARIO
      item.Button.onclick = () => 
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

  goToServices()
  {
    if(this.IsMobile()) { window.scrollTo(0, 2116); }
    else { window.scrollTo(0, 2661); }
  }
  
  IsMobile(): boolean { return (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false; }
}
