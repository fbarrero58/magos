import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../constantes/config';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[] = [];

  constructor(
    public http: HttpClient,
    public _ls: LoginService
  ) {}


  traer_usuarios() {
    const url = URL_SERVICIOS + 'usuarios?token=' + this._ls.token;
    return this.http.get(url);
  }

}
