import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RoutesRecognized, ChildActivationStart, ChildActivationEnd, RouteConfigLoadEnd, ResolveStart, ResolveEnd, NavigationCancel } from '@angular/router';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { filter, first } from 'rxjs/internal/operators';
import { LoadingScreenService } from './loading-screen.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit
{
  @ViewChild("LoadingContainer", { read: ViewContainerRef })
  LoadingContainer!: ViewContainerRef;
  
  title = 'XelaByte';

  constructor(private router: Router, private loadingService: LoadingScreenService, private componentFactoryResolver: ComponentFactoryResolver)
  {
    this.loadingService.StartLoading.set("AppComponent", () => 
    {
      const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingPageComponent);
      const componentRef = this.LoadingContainer.createComponent(dynamicComponentFactory);
      setTimeout(() => { document.getElementById("LoadingContainer")?.classList.toggle("active"); }, 5);
    });

    this.loadingService.EndLoading.set("AppComponent", () => 
    {
      //ELIMINANDO LA PÁGINA DE CARGA UNA VEZ SE HAYA CARGADO EL CONTENIDO DE LA PÁGINA
      document.getElementById("LoadingContainer")?.classList.toggle("active");
      //ESPERAMOS UN TIEMPO EN LO QUE DESAPARECE LA PANTALLA DE CARGA
      setTimeout(() => { this.LoadingContainer.remove(); }, 300);
    });
    let firstLoading = false;
    this.router.events.forEach(event => 
    {
      if(event instanceof NavigationCancel)
      {
        if(document.getElementById("Loadingcontainer")?.classList.contains("active")) this.loadingService.EndLoading.get("AppComponent")!(); 
      }

      if((event instanceof RoutesRecognized))
      {
        console.log("PARENT LOADING");
        this.loadingService.getCurrentUrl();
        if(this.loadingService.PageURL == event.urlAfterRedirects) firstLoading = true; 
        console.log("current: " + this.loadingService.PageURL + " actual: " + event.urlAfterRedirects + " bool: " + firstLoading);
        if(event.urlAfterRedirects.split("/").length <= 2 || this.loadingService.PageURL == event.urlAfterRedirects) this.loadingService.StartLoading.get("AppComponent")!();
      }
      
      if((event instanceof NavigationEnd))
      {
        if(event.urlAfterRedirects.split("/").length <= 2 || firstLoading) this.loadingService.EndLoading.get("AppComponent")!();
        firstLoading = false;
      }

    });
    
  }

  ngOnInit()
  {
    
  }
}
