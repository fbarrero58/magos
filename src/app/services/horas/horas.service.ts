import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroHora } from '../../classes/registro-hora';
import { URL_SERVICIOS } from '../../constantes/config';

@Injectable({
  providedIn: 'root'
})
export class HorasService {

  constructor(public http: HttpClient) { }

  enviar_registro(registro: RegistroHora) {
    const url = `${URL_SERVICIOS}registroHoras?token=${localStorage.getItem('token')}`;
    return this.http.post(url, registro);
  }

  traer_registros(id_usuario) {
    const url = `${URL_SERVICIOS}registroHoras/${id_usuario}?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  actualizar_registro(id, registro: RegistroHora) {
    const url = `${URL_SERVICIOS}registroHoras/${id}?token=${localStorage.getItem('token')}`;
    return this.http.put(url, registro);
  }

  eliminar_registro(id) {
    const url = `${URL_SERVICIOS}registroHoras/${id}?token=${localStorage.getItem('token')}`;
    return this.http.delete(url);
  }

}
