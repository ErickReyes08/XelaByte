import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'CancelButton',
  template: `
    <div class="d-inline-flex flex-column align-items-center justify-content-center">
        <a (click)="FileUploader.fileRemove()" role='button' class='Montserrat-SemiBold DarkButton'>Cancelar<i class='bi bi-x'></i></a>
    </div>
    `,
  styleUrls: ['./talent-form.component.scss']
})

export class CancelButtonComponent implements OnInit 
{
    constructor(public FileUploader: FileUploadService) { }

    ngOnInit(): void
    {

    }
}