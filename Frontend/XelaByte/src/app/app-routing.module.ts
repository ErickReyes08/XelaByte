import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home/home.component';
import { DHomeComponent } from './dash-board/dash-board/d-home/d-home.component';

const routes: Routes = 
[
  { path: "", component: HomeComponent, resolve: { HomeData: HomeResolverService } },
  { path: "Home", component: HomeComponent, resolve: { HomeData: HomeResolverService } },
  { 
    path: "Dashboard", component: DashBoardComponent, 
    children: 
    [
      { path: "", component: DHomeComponent },
      { path: "home", component: DHomeComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
