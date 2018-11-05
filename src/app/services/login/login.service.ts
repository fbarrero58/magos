import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { URL_SERVICIOS } from '../../constantes/config';
import { Login } from '../../classes/login';


@Injectable()
export class LoginService {

  token = '';
  id_usuario = '';
  usuario: any = '';
  rol_usuario = '';

  constructor(
    public http: HttpClient,
    public router: Router
  ) {}

  login(login: Login) {
    const url = URL_SERVICIOS + 'login';
    return this.http.post( url, login);
  }

  cargar_storage() {
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if (this.usuario) {
      this.rol_usuario = this.usuario.id_rol;
    }
  }

  cerrar_sesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  esta_logueado() {
    this.cargar_storage();
    if (!this.token || !this.id_usuario || !this.usuario) {return false; }
    return true;
  }

}
