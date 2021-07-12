import { Component, OnInit, AfterContentInit} from '@angular/core';
import { RequestServicesService } from '../request-services-form/request-services.service';

@Component({
  selector: 'ServiceCard',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})

export class ServiceCardComponent implements OnInit, AfterContentInit
{
  
  constructor(public RequestServices: RequestServicesService) { }

  ngOnInit(): void
  {
  }

  ngAfterContentInit(): void
  {
    
  }
}