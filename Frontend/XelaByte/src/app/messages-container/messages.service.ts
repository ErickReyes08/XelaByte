import { ReturnStatement } from '@angular/compiler';
import { Injectable, Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, EventEmitter, ComponentRef } from '@angular/core';
import { MessageComponent } from './message.component';

@Injectable({
  providedIn: 'root'
})

export class MessagesService 
{
  ID_Counter: number = 0;
  MessageContainer!: ViewContainerRef;
  private MessagesReferences = Array<ComponentRef<MessageComponent>>();
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {
  }

  SendMessage(Title: string, Message: string, TimeOutms?: number, Options?: any)
  {
    //VERIFICANDO SI EL ÚLTIMO MENSAJE SE MOSTRÓ CORRECTAMENTE
    if(this.MessagesReferences.length >= 1)
    {
      let lastMessage = this.MessagesReferences.slice(-1)[0].instance;
      if(lastMessage.Title === Title && lastMessage.Message === Message){ lastMessage.Count++; return; } 
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageComponent);
    //CREANDO Y MOSTRANDO EL MENSAJE
    let messageComponentRef = this.MessageContainer.createComponent(componentFactory);
    let messageComponent = messageComponentRef.instance;
    let messageContainer = Array.from(document.getElementsByClassName("Messages-content")[0].children) as HTMLElement[];

    messageComponent.ID = ++this.ID_Counter;
    messageComponent.Title = Title;
    messageComponent.Message = Message;
    messageComponent.Count++;
    messageComponent.Options = Options;

    //MOSTRANDO EL MENSAJE
    messageContainer.slice(-1)[0].children[0].classList.add("show-message");
    
    if(TimeOutms)
    {
      messageComponent.TimeOutms = TimeOutms;
      //EJECUTAR LA ANIMACIÓN DE ELIMINACIÓN Y AL TÉRMINO ELMINAR EL COMPONENTE
      setTimeout(() => 
      {
        messageContainer.slice(-1)[0].children[0].classList.replace("show-message", "hide-message");
        setTimeout(() => { this.RemoveMessage(messageComponent.ID); }, 150);
      }, TimeOutms);
    }

    //AÑADIENDO A LA LISTA DE MENSAJES
    this.MessagesReferences.push(messageComponentRef);
  }

  RemoveMessage(ID: number)
  {
    if(this.MessageContainer.length == 0) return;

    //ADQUIRIENDO EL ÍNDICE DEL MENSAJE SEGÚN EL ID
    let messageRef = this.MessagesReferences.filter(x => x.instance.ID == ID)[0];
    if(messageRef === undefined) return;
    let messageContainerIndex: number = this.MessageContainer.indexOf(messageRef.hostView);
    //ELIMINANDO EL MENSAJE DEL CONTENEDOR
    this.MessageContainer.remove(messageContainerIndex);
    //ELIMINANDO DE LA LISTA DE MENSAJES
    this.MessagesReferences = this.MessagesReferences.filter(x => x.instance.ID !== ID);
    this.ID_Counter--;
  }

}
