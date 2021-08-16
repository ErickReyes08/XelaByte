import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DashboardService 
{

  private readonly adminDashboardInfo = 
  [
    { Option: "Inicio", IconClass: "house-fill", RouterLink: "inicio" },
    { Option: "Administradores", IconClass: "shield-lock-fill", RouterLink: "administradores" },
    { Option: "Mensajes", IconClass: "chat-left-fill", RouterLink: "mensajes" },
    { Option: "Servicios", IconClass: "tools", RouterLink: "servicios" },
    { Option: "Empleos", IconClass: "person-lines-fill", RouterLink: "empleos" },
    { Option: "Citas", IconClass: "journal-bookmark-fill", RouterLink: "citas" },
    { Option: "Inf. empresa", IconClass: "info-square-fill", RouterLink: "informacion_empresa" }
  ];

  public AdminInformation: { UserName: string, AccessLevels: string[] | number[] } = 
  {
    UserName: "SuperAdmin",
    AccessLevels: ['*']
  };

  public AdminDashboardInfo:
  {
    Option: string,
    IconClass: string,
    RouterLink: string
  }[] = [];

  constructor() { }

  public setAdminAccessInfo()
  {
    if(this.AdminInformation.AccessLevels[0] === "*") this.AdminDashboardInfo = this.adminDashboardInfo;
  }

}
