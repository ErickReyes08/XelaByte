import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//COMPONENTES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TalentFormComponent } from './talent-form/talent-form.component'; import { CancelButtonComponent } from './talent-form/CancelButton.component'; import { RemoveButtonComponent } from './talent-form/RemoveButton.component';
import { RequestServicesFormComponent } from './request-services-form/request-services-form.component';
import { MakeAppointmentFormComponent } from './make-appointment-form/make-appointment-form.component';
//DIRECTIVAS
import { DragNDropDirective } from './drag-ndrop.directive';
//SERVICIOS

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
