import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RoutesRecognized, ChildActivationStart, ChildActivationEnd, RouteConfigLoadEnd, ResolveStart, ResolveEnd } from '@angular/router';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { filter } from 'rxjs/internal/operators';

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

  constructor(private router: Router, activatedRoute: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver)
  {

    this.router.events.forEach((e) => 
    {
      //console.log("children " + this.activeRoute.children);
      //console.log("lenght " + this.activeRoute.children.length);
      //if(e instanceof ChildActivationStart) console.log("childActivationStart");
      if(e instanceof ResolveStart) { console.log(router.url); }
      if(e instanceof ResolveEnd) { console.log(router.url); }
      if(e instanceof NavigationEnd) { console.log(router.url); }
      if((e instanceof ChildActivationStart))
      {
        //console.log(router.url);
        console.log(e);
        if(e.snapshot.url.length === 0)
        {
          
          //CREANDO LA PÁGINA DE CARGA CADA VEZ QUE SE CAMBIE DE RUTA
          const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingPageComponent);
          const componentRef = this.LoadingContainer.createComponent(dynamicComponentFactory);
          setTimeout(() => { document.getElementById("LoadingContainer")?.classList.toggle("active"); }, 5);
          //console.log("Navigation start")
        }
      }

      if((e instanceof ChildActivationEnd))
      {
        if(e.snapshot.url.length === 0)
        {
          //ELIMINANDO LA PÁGINA DE CARGA UNA VEZ SE HAYA CARGADO EL CONTENIDO DE LA PÁGINA
        document.getElementById("LoadingContainer")?.classList.toggle("active");
        //ESPERAMOS UN TIEMPO EN LO QUE DESAPARECE LA PANTALLA DE CARGA
        setTimeout(() => { this.LoadingContainer.remove(); }, 300);
        //console.log("Navigation end");
        }
        
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(e =>  
    {
      console.log("passing");
    });

  }
}
