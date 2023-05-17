import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate {

    public constructor( private router: Router ){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if( !this.auth.isLoggedIn() ){
    //   return true;
    // }

    // this.router.navigateByUrl('/products');
    return true;
  }
  
}
