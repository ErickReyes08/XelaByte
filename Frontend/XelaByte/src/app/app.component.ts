import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingPageComponent } from './loading-page/loading-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent 
{
  @ViewChild("LoadingContainer", { read: ViewContainerRef })
  LoadingContainer!: ViewContainerRef;
  title = 'XelaByte';

  constructor(router: Router, private componentFactoryResolver: ComponentFactoryResolver)
  {
    router.events.forEach((e) => 
    {
      if(e instanceof NavigationStart) 
      { 
        //CREANDO LA PÁGINA DE CARGA CADA VEZ QUE SE CAMBIE DE RUTA
        const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingPageComponent);
        const componentRef = this.LoadingContainer.createComponent(dynamicComponentFactory);
        setTimeout(() => { document.getElementById("LoadingContainer")?.classList.toggle("active"); }, 5);
        console.log("Navigation start")
      }
      if(e instanceof NavigationEnd)
      { 
        //ELIMINANDO LA PÁGINA DE CARGA UNA VEZ SE HAYA CARGADO EL CONTENIDO DE LA PÁGINA
        document.getElementById("LoadingContainer")?.classList.toggle("active");
          //ESPERAMOS UN TIEMPO EN LO QUE DESAPARECE LA PANTALLA DE CARGA
          setTimeout(() => { this.LoadingContainer.remove(); }, 300);
        console.log("Navigation end") 
      }
    });
  }
}
