import { ReturnStatement } from '@angular/compiler';
import { Injectable, Component, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef, EventEmitter, ComponentRef } from '@angular/core';
import { MessageComponent } from './message.component';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class MessagesService 
{
  MessageContainer!: ViewContainerRef;
  private MessagesReferences = Array<ComponentRef<MessageComponent>>();
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {
  }

  SendMessage(Title: string, Message: string, TimeOutms?: number, Options?: any)
  {
    //VERIFICANDO SI EL ÚLTIMO MENSAJE SE MOSTRÓ CORRECTAMENTE
    let repeatedMesage = this.MessagesReferences.find(x => x.instance.Title === Title && x.instance.Message === Message)?.instance;
    if(this.MessagesReferences.length >= 1 && repeatedMesage)
    {
      //this.MessagesReferences.find();
      //let lastMesage = this.MessagesReferences.slice(-1)[0].instance;
      if(repeatedMesage.TimeOutms != -1) 
      { 
        clearTimeout(repeatedMesage.TimeOutVar!);
        repeatedMesage.CloseAsync();
      }
      repeatedMesage.Count++; 
      return;
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageComponent);
    //CREANDO Y MOSTRANDO EL MENSAJE
    let messageComponentRef = this.MessageContainer.createComponent(componentFactory);
    let messageComponent = messageComponentRef.instance;
    let messageContainer = Array.from(document.getElementsByClassName("Messages-content")[0].children) as HTMLElement[];

    //SE GENERA UNA ID ÚNICA PARA CADA MENSAJE NUEVO
    messageComponent.ID = uuidv4();
    //SE ESTABLECEN LOS DEMAS DATOS DEL MENSAJE
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
      messageComponent.CloseAsync();
    }

    //AÑADIENDO A LA LISTA DE MENSAJES
    this.MessagesReferences.push(messageComponentRef);
  }

  RemoveMessage(ID: string)
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
  }

}
