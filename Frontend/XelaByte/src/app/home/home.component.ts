import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit 
{
  
  constructor() { }

  ngOnInit(): void 
  {
  }

  goToServices() 
  { 
    let IsMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;
    if(IsMobile) { window.scrollTo(0, 2116); }
    else { window.scrollTo(0, 2661); }
  }
}
