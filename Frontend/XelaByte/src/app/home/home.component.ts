import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit
{
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
    console.log(res);
    console.log(FormButtons);
    return res;
  }

  constructor() { }

  ngOnInit(): void
  {
    this.SetFormAnimations();
  }

  ngAfterViewInit()
  {
    //FORMULARIO DE SERVICIOS
    let ServiceFormButtons = Array.from(document.getElementsByName("ServiceFormButton"));
    console.log(ServiceFormButtons);
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
