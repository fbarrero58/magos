import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public router: Router, public _ls: LoginService ) {}

  canActivate() {

    if ( this._ls.rol_usuario === '3') {
      this.router.navigate(['/main']);
    }

    return true;
  }


}
