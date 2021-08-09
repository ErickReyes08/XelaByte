import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'Sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit 
{

  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void
  {
    let sideBar = document.getElementsByClassName("sidebar")[0];
    let content = document.getElementsByClassName("content")[0];
    let menuButton = document.getElementById("MenuButton")!;
    menuButton.onclick = function()
    {
      if(!sideBar.classList.contains("active"))
      {
        sideBar.classList.toggle("p-none");
        setTimeout(() => { sideBar.classList.toggle("active"); }, 5);
      }
      else
      {
        setTimeout(() => { sideBar.classList.toggle("p-none"); }, 30);
        sideBar.classList.toggle("active");
      } 
      
      content.classList.toggle("active");
    }
  }

}
