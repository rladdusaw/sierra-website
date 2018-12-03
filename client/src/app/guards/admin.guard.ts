import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (JSON.parse(localStorage.getItem('currentUser')).admin) {
            console.log(JSON.parse(localStorage.getItem('currentUser')))
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}