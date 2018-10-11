// Configuracion
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../constantes/config';

// Clases
import { Proyecto } from '../../classes/proyecto';

// Servicios
import { CalendarioService } from '../calendario.service';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectos: Proyecto[] = [];

  constructor(public http: HttpClient, public _cs: CalendarioService) { }

  traer_proyectos() {
    const url = `${URL_SERVICIOS}proyectos?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  crear_proyecto(proyecto: Proyecto) {
    proyecto.inicio = this._cs.from_calendar_to_DB(proyecto.inicio);
    proyecto.fin = this._cs.from_calendar_to_DB(proyecto.fin);
    const url = `${URL_SERVICIOS}proyectos?token=${localStorage.getItem('token')}`;
    return this.http.post(url, proyecto);
  }

  modificar_proyecto(proyecto: Proyecto) {
    proyecto.inicio = this._cs.from_calendar_to_DB(proyecto.inicio);
    proyecto.fin = this._cs.from_calendar_to_DB(proyecto.fin);
    const url = `${URL_SERVICIOS}proyectos/${proyecto.id}?token=${localStorage.getItem('token')}`;
    return this.http.put(url, proyecto);
  }

}
