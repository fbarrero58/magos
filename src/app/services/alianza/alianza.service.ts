import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Clases
import { Alianza } from '../../classes/alianza';

// Configuracion
import { URL_SERVICIOS } from '../../constantes/config';


@Injectable({
  providedIn: 'root'
})
export class AlianzaService {

  alianzas: Alianza[] = [];

  constructor(public http: HttpClient) { }

  traer_alianzas() {
    const url = `${URL_SERVICIOS}alianzas?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  crear_alianza(alianza: Alianza) {
    const url = `${URL_SERVICIOS}alianzas?token=${localStorage.getItem('token')}`;
    return this.http.post(url, alianza);
  }
}
