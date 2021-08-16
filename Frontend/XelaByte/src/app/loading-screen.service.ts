import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})

export class LoadingScreenService 
{
  public PageURL: string = "";
  public StartLoading = new Map<string, () => void>();
  public EndLoading = new Map<string, () => void>();

  constructor()
  {
  }

  getCurrentUrl()
  {
    this.PageURL = "";
    let SplittedURL = window.location.href.split("/");
    for(let x = 3; x < SplittedURL.length; x++) this.PageURL += "/" + SplittedURL[x];
    //console.log("LAST: '" + SplittedURL.slice(-1)[0] + "'" + " LENGTH: " + SplittedURL.slice(-1)[0].length);
    if(SplittedURL.slice(-1)[0].includes(" ")) SplittedURL.pop();
  }

  SendMessage(messageFrom: string)
  {
    console.log("MessageFrom: " + messageFrom);
  }

}
