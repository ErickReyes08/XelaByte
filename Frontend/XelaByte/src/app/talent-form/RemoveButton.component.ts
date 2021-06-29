import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'RemoveButton',
  template: `
    <div class="d-inline-flex flex-column align-items-center justify-content-center">
        <a (click)="this.FileUploader.RemoveFile()" id='RemoveFileButton' role='button' class='Montserrat-SemiBold DarkButton'>Eliminar<i class='bi bi-trash-fill'></i></a>
    </div>
  `,
  styleUrls: ['./talent-form.component.scss']
})

export class RemoveButtonComponent implements OnInit 
{
  constructor(public FileUploader: FileUploadService) { }

  ngOnInit(): void
  {

  }
}