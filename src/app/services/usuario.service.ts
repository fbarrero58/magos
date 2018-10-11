import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Servicios
import { URL_SERVICIOS } from '../constantes/config';
import { LoginService } from './login/login.service';
import { CalendarioService } from './calendario.service';

// Clases
import { Usuario } from '../classes/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[] = [];
  cumpleanos = [];

  constructor(
    public http: HttpClient,
    public _ls: LoginService,
    public _cs: CalendarioService
  ) {}


  traer_usuarios() {
    const url = URL_SERVICIOS + 'usuarios?token=' + this._ls.token;
    return this.http.get(url);
  }

  traer_usuario(id_usuario) {
    const url = `${URL_SERVICIOS}usuarios/${id_usuario}?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  crear_usuario(usuario: Usuario) {
    usuario.fecha_vinculacion = this._cs.from_calendar_to_DB(usuario.fecha_vinculacion);
    const url = `${URL_SERVICIOS}usuarios?token=${localStorage.getItem('token')}`;
    return this.http.post(url, usuario);
  }

  modificar_usuario(usuario: Usuario, modo = 'personal') {
    let url;
    if (modo === 'personal') {
      url = `${URL_SERVICIOS}usuarios/${usuario.id}/personal?token=${localStorage.getItem('token')}`;
      usuario.fecha_nacimiento = this._cs.from_calendar_to_DB(usuario.fecha_nacimiento);
    } else {
    url = `${URL_SERVICIOS}usuarios/${usuario.id}?token=${localStorage.getItem('token')}`;
    usuario.fecha_vinculacion = this._cs.from_calendar_to_DB(usuario.fecha_vinculacion);
    }
    return this.http.put(url, usuario);
  }

  cumpleanos_mes() {
    const mes = new Date().getMonth() + 1;
    const url = `${URL_SERVICIOS}usuarios/birthdays/${mes}?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

}
