import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home/home.component';
import { DHomeComponent } from './dash-board/dash-board/d-home/d-home.component';
import { CanActivateGuard } from './dash-board/Guards/can-activate.guard';
import { v4 as uuidv4 } from 'uuid';

const routes: Routes = 
[
  { path: "", component: HomeComponent, resolve: { HomeData: HomeResolverService } },
  { path: "home", component: HomeComponent, resolve: { HomeData: HomeResolverService } },
  { 
    path: "dashboard", component: DashBoardComponent,
    //canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateGuard],
    children: 
    [
      { path: "", pathMatch: "full", redirectTo: "inicio" },
      { path: "inicio", component: DHomeComponent, data: { AccessLevel: ["*"] } },
      { path: "administradores", component: DHomeComponent },
      { path: "mensajes", component: DHomeComponent },
      { path: "servicios", component: DHomeComponent },
      { path: "empleos", component: DHomeComponent },
      { path: "citas", component: DHomeComponent },
      { path: "informacion_empresa", component: DHomeComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
