import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public router: Router, public _ls: LoginService ) {}

  canActivate() {

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this._ls.cargar_storage();
    }

    return true;
  }
}
