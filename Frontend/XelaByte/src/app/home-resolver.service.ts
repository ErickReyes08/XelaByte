import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class HomeResolverService implements Resolve<any>
{
  //LINK DEL VIDEO DE LA PÁGINA
  HomeVideoLink: SafeResourceUrl = "";
  //DATOS DEL APARTADO DE NUESTRO EQUIPO
  TeamData: { MemberName: string, MembersPosition: string, MemberImageURL: string }[] = 
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

  //HOME FOOTER DATA
  FooterInfo: { OfficeLocations: string[], TelephoneContacts: string[], ContactsEmails: string[] } =
  {
    OfficeLocations: 
    [
      "Diagonal 15 7-61 zona 5. Quetgo",
      "Diagonal 15 7-61 zona 5. Quetgo",
      "Diagonal 15 7-61 zona 5. Quetgo"
    ],
    TelephoneContacts: 
    [
      "+502 3511-5034",
      "+502 5563-8774",
      "+502 4183-9918"
    ],
    ContactsEmails: 
    [
      "info@XelaByte.com"
    ]
  };
  //----------------

  HomeData: Map<string, Observable<any>> = new Map<string, any>();

  constructor(private HttpClient: HttpClient) { }

  resolve(): Promise<any>
  {
    /*let TeamData = this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=1");
    let ServiceData = this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=2");
    let FooterData = this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=3");
    let HomeVideoLink = this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=4");*/
    //let HomeVideoLink = this.HttpClient.get("https://jsonplaceholder.typico/");

    //#region SIMULANDO LA ADQUISICIÓN DE DATOS EN EL BACKEND
    let TeamData = new Observable<any>(sub => {
      setTimeout(() => {
        sub.next([
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
        ]);
        sub.complete();
      }, 300);
    });
    let ServiceData = new Observable<any>(sub => {
      setTimeout(() => {
        sub.next(
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
        ]);
        sub.complete();
      }, 350);
    });
    let FooterData = new Observable<any>(sub => {
      setTimeout(() => {
        sub.next(
          {
          OfficeLocations: 
          [
            "Diagonal 15 7-61 zona 5. Quetgo",
            "Diagonal 15 7-61 zona 5. Quetgo",
            "Diagonal 15 7-61 zona 5. Quetgo"
          ],
          TelephoneContacts: 
          [
            "+502 3511-5034",
            "+502 5563-8774",
            "+502 4183-9918"
          ],
          ContactsEmails: 
          [
            "info@XelaByte.com"
          ]
        });
        sub.complete();
      }, 310);
    });
    let HomeVideoLink = new Observable<any>(sub => {
      setTimeout(() => {
        sub.next("https://www.youtube.com/embed/JIZLzhUFLvY");
        sub.complete();
      }, 315);
    });
    //#endregion
    /*-----------------------------------------------*/
    
    return new Promise<any>(resolve =>
    {
      forkJoin([TeamData, ServiceData, FooterData, HomeVideoLink]).subscribe((data: any) => 
      {
        this.HomeData.set("TeamData", data[0]);
        this.HomeData.set("ServicesData", data[1]);
        this.HomeData.set("FooterData", data[2]);
        this.HomeData.set("HomeVideoLink", data[3]);
        resolve(this.HomeData);
      }, (error: any) => { console.log("ERROR AL CARGAR LOS DATOS DEL SERVIDOR"); });
    });
  }
}
