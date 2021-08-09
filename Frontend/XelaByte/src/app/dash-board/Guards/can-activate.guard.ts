import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard implements CanActivate, CanActivateChild 
{
  constructor(private  router: Router, private dashboardService: DashboardService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    console.log("CAN ACTIVATE - " + route.data["AccessLevel"]);
    //this.router.navigate(['/']);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    console.log("CAN ACTIVATE CHILD");
    this.dashboardService.setAdminAccessInfo();
    return true;
  }
  
}
