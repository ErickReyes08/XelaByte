import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = 
[
  { path: "", component: HomeComponent, resolve: { HomeData: HomeResolverService } },
  { path: "Home", component: HomeComponent, resolve: { HomeData: HomeResolverService } },
  { path: "DashBoard", component: DashBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
