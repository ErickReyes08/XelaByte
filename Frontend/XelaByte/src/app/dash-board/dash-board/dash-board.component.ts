import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ChildActivationEnd, ChildActivationStart, ResolveEnd, RoutesRecognized, NavigationCancel } from '@angular/router';
import { LoadingScreenService } from 'src/app/loading-screen.service';
import { LoadingPageComponent } from 'src/app/loading-page/loading-page.component';
import { filter } from 'rxjs/internal/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'DashBoard',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DashBoardComponent implements OnInit 
{
  /*COMPONENTES DINÁMICOS*/
    //CONTENEDOR DE PANTALLA DE CARGA
    @ViewChild("ChildLoadingContainer", { read: ViewContainerRef })
    ChildLoadingContainer!: ViewContainerRef;
    //CONTENEDOR DE BARRAS DE NAVEGACIÓN
    @ViewChild("NavbarsContainer", { read: ViewContainerRef })
    NavbarsContainer!: ViewContainerRef;
  /*---------------------*/

  WorkingPage: string = "Inicio";
  public ActualPage: { Title: string, IconClass: string } = { Title: "", IconClass: "" };

  constructor(private router: Router, private loadingService: LoadingScreenService, private componentFactoryResolver: ComponentFactoryResolver, public dashBoardService: DashboardService) 
  {
    //ESTABLECIENDO LA BARRA DE NAVEGACIÓN
    this.SetNavbar();
    //------------------------------------

    //console.log("Dashboard constructed");
    this.loadingService.StartLoading.set("DashboardComponent", () => 
    {
      const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingPageComponent);
      const componentRef = this.ChildLoadingContainer.createComponent(dynamicComponentFactory);
      setTimeout(() => { document.querySelector("#Dashboard")?.querySelector("#LoadingContainer")?.classList.toggle("active"); }, 5);
    });

    this.loadingService.EndLoading.set("DashboardComponent", () => 
    {
      //ELIMINANDO LA PÁGINA DE CARGA UNA VEZ SE HAYA CARGADO EL CONTENIDO DE LA PÁGINA
      document.querySelector("#Dashboard")?.querySelector("#LoadingContainer")?.classList.toggle("active");
      //ESPERAMOS UN TIEMPO EN LO QUE DESAPARECE LA PANTALLA DE CARGA
      setTimeout(() => { this.ChildLoadingContainer.remove(); }, 300);
    });

    this.router.events.forEach((event) => 
    {
      if(event instanceof NavigationCancel) 
      { 
        //console.log("CHILD NAVIGATION CANCEL");
        if(document.querySelector("#Dashboard")?.querySelector("#LoadingContainer")?.classList.contains("active")) this.loadingService.EndLoading.get("DashboardComponent")!();
      }

      if((event instanceof RoutesRecognized))
      {
        if(event.urlAfterRedirects.split("/").length >= 3) this.loadingService.StartLoading.get("DashboardComponent")!();
      }

      if((event instanceof NavigationEnd))
      {
        if(event.urlAfterRedirects.split("/").length >= 3) 
        {
          this.loadingService.EndLoading.get("DashboardComponent")!();
          switch(event.urlAfterRedirects.split("/")[2])
          {
            //AÑADIR LAS RUTAS HIJAS PRINCIPALES DEL DASHBOARD
            case "inicio": this.ActualPage = { Title: "Dashboard", IconClass: "ui-checks-grid" }; break;
            case "administradores": this.ActualPage = { Title: "Administradores", IconClass: "diagram-3-fill" }; break;
            case "mensajes": this.ActualPage = { Title: "Mensajes", IconClass: "chat-left-dots-fill" }; break;
            case "servicios": this.ActualPage = { Title: "Servicios", IconClass: "inboxes-fill" }; break;
            case "empleos": this.ActualPage = { Title: "Solicitudes de empleo", IconClass: "people-fill" }; break;
            case "citas": this.ActualPage = { Title: "Citas", IconClass: "pencil-square" }; break;
            case "informacion_empresa": this.ActualPage = { Title: "Info de la empresa", IconClass: "building" }; break;
          }
        }
      }
    });

  }

  SetNavbar()
  {
    let isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;
    
  }

  ngOnInit(): void 
  {
    
  }
}
