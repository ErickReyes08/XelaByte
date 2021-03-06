import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestServicesService 
{

  public ServicesCards: { id: number, Title: string, Price: number, Description: string, Features: string[] }[] =
  [
    {
      id: 1,
      Title: "Mantenimiento preventivo",
      Price: 125,
      Description: "Ideal para freelancers que acaban de empezar.",
      Features: 
      [
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo"
      ]
    },
    {
      id: 2,
      Title: "Mantenimiento correctivo",
      Price: 150,
      Description: "Ideal para freelancers que acaban de empezar.",
      Features: 
      [
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo"
      ]
    },
    {
      id: 3,
      Title: "Formateo y actualización",
      Price: 125,
      Description: "Ideal para freelancers que acaban de empezar.",
      Features: 
      [
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo"
      ]
    },
    {
      id: 4,
      Title: "Instalación de todo tipo de programas",
      Price: 150,
      Description: "Ideal para freelancers que acaban de empezar.",
      Features: 
      [
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo"
      ]
    },
    {
      id: 5,
      Title: "Recuperación de información",
      Price: 125,
      Description: "Ideal para freelancers que acaban de empezar.",
      Features: 
      [
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo"
      ]
    },
    {
      id: 6,
      Title: "Venta de todo tipo de dispositivos de tecnología",
      Price: 150,
      Description: "Ideal para freelancers que acaban de empezar.",
      Features: 
      [
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo",
        "Sitio Web responsivo"
      ]
    }
  ];

  public ServicesInputs: any;
  public CanSetServices: boolean = false;

  constructor() { }
  
  SetCheckBoxInput(ID_CheckBox: string)
  {
    if(!this.CanSetServices) return;

    let ServiceInput = (document.getElementById("ServiceCB_" + ID_CheckBox) as HTMLInputElement);
    let ServicesInputs = Array.from(document.getElementsByName("ServicesCheckBox")) as HTMLInputElement[];
    for(let input of ServicesInputs) { input.checked = false; }
    //console.log(ServiceInput);
    ServiceInput.checked = true;
  }

}
