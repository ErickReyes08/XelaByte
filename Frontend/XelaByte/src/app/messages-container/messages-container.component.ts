import { Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'MessagesContainer',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})

export class MessagesContainerComponent implements OnInit, AfterViewInit
{
  @ViewChild("Messages", { read: ViewContainerRef })
  MessagesContainer!: ViewContainerRef;
  public N: number = 0;
  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void
  {
  }

  //SE ESTABLECE LA VISTA DEL CONTENEDOR HASTA QUE SE HAYA CARGADO EL COMPONENTE
  ngAfterViewInit(): void
  {
    this.messagesService.MessageContainer = this.MessagesContainer;
    //CREACIÓN DE MENSAJE DE EJEMPLO
    /*setTimeout(() => 
    {
      this.messagesService.SendMessage("Título de un mensaje de prueba", "En este mensaje se le aclara al usuario que se ha enviado correctamente un formulario con los datos solicitados para la empresa", 2000, 
      {
        AcceptButton: () =>
        {
          this.N++;
          console.log("MENSAJE RECIBIDO, " + this.N);
        }
      });
      setTimeout(() => {
        this.messagesService.SendMessage("Título corto", "Mensaje corto para el usuario", 2000);
      }, 1000);
      for(let x = 1; x <= 11; x++)
      {
        setTimeout(() => {
          this.messagesService.SendMessage("Título de un mensaje de prueba", "En este mensaje se le aclara al usuario que se ha enviado correctamente un formulario con los datos solicitados para la empresa");
        }, 100*(x*5));
      }
      
    }, 2000);

    setTimeout(() => {
      this.messagesService.SendMessage("Mensaje tardío", "Un mensaje despúes de 10 segundos", 2500);
    }, 10000);*/
    
  }

}
