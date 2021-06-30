import { Component, OnInit, AfterContentInit } from '@angular/core';
import { RequestServicesService } from './request-services.service';

@Component({
  selector: 'RequestServicesForm',
  templateUrl: './request-services-form.component.html',
  styleUrls: ['./request-services-form.component.scss']
})
export class RequestServicesFormComponent implements OnInit, AfterContentInit
{

  constructor(public RequestServices: RequestServicesService) { }

  ngOnInit(): void 
  {
  }

  ngAfterContentInit(): void
  {
    let OtherServiceCB = document.getElementById("ServiceCBOtherOption") as HTMLInputElement;
    let Label = document.getElementById("ServiceCBOtherOption") as HTMLElement;
    let TextArea = document.getElementById("OtherServiceArea") as HTMLTextAreaElement;

    TextArea.innerHTML = "";
    TextArea.readOnly = true;

    let OtherServiceClick = function()
    {
      if(OtherServiceCB.checked)
      {
        TextArea.value = "";
        TextArea.readOnly = false;
      }
      else
      {
        TextArea.value = "";
        TextArea.readOnly = true;
      }
    }

    OtherServiceCB.onclick = OtherServiceClick;
    Label.onload = OtherServiceClick;

    
  }

}
