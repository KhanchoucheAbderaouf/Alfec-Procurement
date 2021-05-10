import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // check if route is restricted by role
          if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
              if(currentUser.role === "admin"){
                this.router.navigate(['/admin/procurement/produits']);
                return false; 
              } else if (currentUser.role === "procurement"){
                this.router.navigate(['/procurement/produits/index']);
                return false;
              } else if(currentUser.role === "estimation"){
                this.router.navigate(['/estimation/prix/index']);
                return false;
              } else {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
              }
          } 
          // authorised so return true
          return true;
      } else {
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
      }
   
  }
}