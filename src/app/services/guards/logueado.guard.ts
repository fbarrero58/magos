import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate {

  constructor(public _ls: LoginService, public router: Router) {}

  canActivate() {

    if (this._ls.esta_logueado() ) {
      this.router.navigate(['/main']);
    }

    return true;
  }
}
