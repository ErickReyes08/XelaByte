import { Component, OnInit, Output } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'Message',
  template: `
    <div id="MSGid__{{ID}}" class="Message d-inline-flex flex-column justify-content-center align-items-center">
        <div class="Message-header d-inline-flex flex-row justify-content-center align-items-center">
            <!--i class="Montserrat-SemiBold Message-counter d-flex flex-column justify-content-center align-items-center">{{Count}}</i-->
            <ng-template [ngIf]="Count >= 2">
                <i class="Montserrat-SemiBold Message-counter d-flex flex-column justify-content-center align-items-center">
                    {{Count >= 10 ? "+9" : Count}}
                </i>
            </ng-template>
            <p class="Montserrat-Bold my-2">{{Title}}</p>
            <a role="button" class="Message-exit d-flex flex-column justify-content-center align-items-center" (click)="OnCloseManually()"><i class="bi bi-x-lg"></i></a>
        </div>
        <div class="Message-body">
            <p class="Montserrat-Medium my-2">{{Message}}</p>
        </div>
        <!--FOOTER DEL MESSAGE POR SI SE NECESITA INTERACCIÓN DEL USUARIO POR MEDIO DE BOTONES-->
        <ng-template [ngIf]="Options!">
            <div class="Message-footer d-inline-flex flex-row justify-content-center align-items-center container">
                <div class="Button-container d-inline-flex flex-column justify-content-center align-items-center" *ngIf="Options.AcceptButton!">
                    <a role="button" class="Montserrat-SemiBold DarkButton" (click)="Options.AcceptButton(); OnCloseManually()">Aceptar<i class="bi bi-check-lg"></i></a>
                </div>

                <div class="Button-container d-inline-flex flex-column justify-content-center align-items-center" *ngIf="Options.YesButton!">
                    <a role="button" class="Montserrat-SemiBold DarkButton" (click)="Options.YesButton(); OnCloseManually()">Sí<i class="bi bi-check-lg"></i></a>
                </div>

                <div class="Button-container d-inline-flex flex-column justify-content-center align-items-center" *ngIf="Options.NoButton!">
                    <a role="button" class="Montserrat-SemiBold DarkButton" (click)="Options.NoButton(); OnCloseManually()">No<i class="bi bi-x-lg"></i></a>
                </div>
            </div>
        </ng-template>
    </div>
  `,
  styleUrls: ['./messages-container.component.scss']
})

export class MessageComponent implements OnInit
{
    ID: number = -1;
    Count: number = 0;
    public Title: string = "";
    public Message: string = "";
    public TimeOutms: number = -1;
    public Options:
    {
        AcceptButton?: () => void
        YesButton?: () => void,
        NoButton?: () => void
    } = {};
    public ShowSuccesfully: boolean = false;

    constructor(private messageService: MessagesService) { /*console.log("MESSAGE INSTANTIATED");*/ }

    ngOnInit(): void
    {
        /*let messageInfo = [ this.ID, this.Title, this.TimeOutms ];
        console.log("MESSAGE DATA: " + messageInfo);*/
    }

    OnCloseManually(): void
    {
        let messages = Array.from(document.getElementsByClassName("Message")) as HTMLElement[];
        messages.forEach((x) =>
        {
            if(x.id == "MSGid__"+this.ID){ x.classList.replace("show-message", "hide-message"); }
        });
        setTimeout(() => { this.messageService.RemoveMessage(this.ID); }, 150);
    }
}