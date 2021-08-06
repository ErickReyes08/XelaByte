import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DHomeComponent } from './dash-board/d-home/d-home.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    SidebarComponent,
    DHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})

export class DashBoardModule { }
