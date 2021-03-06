import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public router: Router, public _ls: LoginService ) {}

  canActivate() {

    if (!this._ls.esta_logueado() ) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
