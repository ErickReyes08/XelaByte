import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'RemoveButton',
  template: `
    <div class="d-inline-flex flex-column align-items-center justify-content-center">
        <a id='RemoveFileButton' role='button' class='Montserrat-SemiBold DarkButton'>Eliminar<i class='bi bi-trash-fill'></i></a>
    </div>
  `,
  styleUrls: ['./talent-form.component.scss']
})

export class RemoveButtonComponent implements OnInit 
{
    constructor() { }

    ngOnInit(): void
    {

    }
}