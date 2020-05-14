import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthService } from './userauth.service';



@Injectable({
  providedIn: 'root'
})
export class UserconnectedGuard implements CanActivate {
  constructor(private userAuth: UserauthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userAuth.userLoginwithGoogle()) {
      if (this.userAuth.userStatus()) {
        return true;
      }
    }
    return new Promise((resolve, reject) => {
      this.userAuth.getCurrntUser().then(user => {
        if (user) {
          return resolve(true);
        }
        else {
          this.router.navigate(['login']);
          return resolve(false);
        }
      })
    })
  }
}


