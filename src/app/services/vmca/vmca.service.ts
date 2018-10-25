import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vmca } from '../../classes/vmca';
import { URL_SERVICIOS } from '../../constantes/config';
import { Evento } from '../../classes/evento';

@Injectable({
  providedIn: 'root'
})
export class VmcaService {

  roles: Vmca[] = [];
  tipos_empresa: Vmca[] = [];
  tipos_servicio: Vmca[] = [];
  lineas_servicio: Vmca[] = [];
  estados_comerciales: Vmca[] = [];
  eventos: Evento[] = [];
  public estados_activos: Vmca[] = [{id: 'T', nombre: 'Activo'}, {id: 'F', nombre: 'Inactivo'}];
  public estados_si_no: Vmca[] = [{id: 'T', nombre: 'Si'}, {id: 'F', nombre: 'No'}];
  public tipos_solicitudes: Vmca[] = [{id: 'permiso', nombre: 'Permiso'}, {id: 'vacaciones', nombre: 'Vacaciones'}, {id: 'otros', nombre: 'Otros'}];

  constructor( public http: HttpClient ) { }

  traer_roles() {
    const url = `${URL_SERVICIOS}vmca/roles/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_tipos_empresa() {
    const url = `${URL_SERVICIOS}vmca/tipoempresa/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_tipos_servicio() {
    const url = `${URL_SERVICIOS}vmca/tiposervicio/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_lineas_servicio() {
    const url = `${URL_SERVICIOS}vmca/lineaservicio/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_estados_comerciales() {
    const url = `${URL_SERVICIOS}vmca/estadoscomerciales/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_eventos() {
    const url = `${URL_SERVICIOS}vmca/eventos/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  crear_evento(evento: Evento) {
    const url = `${URL_SERVICIOS}vmca/eventos/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, evento);
  }

  eliminar_evento(evento: Evento) {
    const url = `${URL_SERVICIOS}vmca/eventos/${evento.id}?token=${localStorage.getItem('token')}`;
    return this.http.delete(url);
  }

  traer_actividades(tipo) {
    const url = `${URL_SERVICIOS}vmca/actividades/${tipo}?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

}
