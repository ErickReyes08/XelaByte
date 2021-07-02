import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { CancelButtonComponent } from './CancelButton.component';
import { RemoveButtonComponent } from './RemoveButton.component';

@Component({
  selector: 'TalentForm',
  templateUrl: './talent-form.component.html',
  styleUrls: ['./talent-form.component.scss']
})

export class TalentFormComponent implements OnInit 
{
  @ViewChild("ActionButton", { read: ViewContainerRef })
  ActionButton!: ViewContainerRef;
  
  constructor(public FileUploader: FileUploadService , public componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void
  {
    if(this.FileUploader.IsMobile()) { this.FileUploader.FileSubTitle = ""; }

    this.FileUploader.fileTitle = this.FileUploader.FileTitle;
    this.FileUploader.fileSubTitle = this.FileUploader.FileSubTitle;
    this.FileUploader.FileButtons.set("CancelButton", () => { const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CancelButtonComponent); const componentRef = this.ActionButton.createComponent(dynamicComponentFactory); });
    this.FileUploader.FileButtons.set("RemoveButton", () => { const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(RemoveButtonComponent); const componentRef = this.ActionButton.createComponent(dynamicComponentFactory); });
    this.FileUploader.FileButtons.set("Remove", () => { this.ActionButton.remove(); });

  }

}
