import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HomeResolverService implements Resolve<any>
{
  HomeData: Map<string, Observable<any>> = new Map<string, any>();

  constructor(private HttpClient: HttpClient) { }

  resolve(): Map<string, Observable<any>>
  {
    //ADQUIRIENDO LOS DATOS NECESARIOS PARA EL HOME
    this.HomeData.set("TeamData", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=1"));
    this.HomeData.set("ServicesData", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=2"));
    this.HomeData.set("FooterData", this.HttpClient.get("https://jsonplaceholder.typicode.com/comments?postId=3"));
    return this.HomeData;
  }
}
