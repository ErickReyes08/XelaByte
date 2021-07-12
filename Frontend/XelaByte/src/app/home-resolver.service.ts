import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HomeResolverService implements Resolve<any>
{

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

  resolve(): Map<string, Observable<any>>
  {
    //ADQUIRIENDO LOS DATOS NECESARIOS PARA EL HOME
    this.HomeData.set("TeamData", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=1"));
    this.HomeData.set("ServicesData", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=2"));
    this.HomeData.set("FooterData", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=3"));
    this.HomeData.set("HomeVideoLink", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=4"));
    return this.HomeData;
  }
}
