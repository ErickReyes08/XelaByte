import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'DashBoard',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})

export class DashBoardComponent implements OnInit 
{
  WorkingPage: string = "Inicio";

  constructor(private router: Router) 
  {
    /*router.events.forEach((e) => 
    {
      if(e instanceof NavigationStart) { console.log("Navigation start") }
      if(e instanceof NavigationEnd) { console.log("Navigation end") }
    });*/
  }

  ngOnInit(): void 
  {
    setTimeout(() => {
      this.WorkingPage = "Información de la empresa";
    }, 2000);
  }

}
