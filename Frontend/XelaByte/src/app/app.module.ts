//MODULOS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TalentFormComponent } from './talent-form/talent-form.component'; import { CancelButtonComponent } from './talent-form/CancelButton.component'; import { RemoveButtonComponent } from './talent-form/RemoveButton.component';
import { RequestServicesFormComponent } from './request-services-form/request-services-form.component';
import { MakeAppointmentFormComponent } from './make-appointment-form/make-appointment-form.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
//DIRECTIVAS
import { DragNDropDirective } from './drag-ndrop.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ServiceCardComponent,
    ContactFormComponent,
    TalentFormComponent, CancelButtonComponent, RemoveButtonComponent,
    DragNDropDirective,
    RequestServicesFormComponent,
    MakeAppointmentFormComponent,
    HomeFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
