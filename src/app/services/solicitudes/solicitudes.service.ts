import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../constantes/config';
import { Solicitud } from '../../classes/solicitud';
import { CalendarioService } from '../calendario.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(public http: HttpClient, public _cs: CalendarioService) { }

  traer_tipos_otros() {
    const url = `${URL_SERVICIOS}solicitudes/tiposOtros?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  enviar_permiso(permiso: Solicitud) {
    permiso.fecha_permiso_db = this._cs.from_calendar_to_DB(permiso.fecha_permiso);
    const url = `${URL_SERVICIOS}solicitudes/permiso?token=${localStorage.getItem('token')}`;
    return this.http.post(url, permiso);
  }

  enviar_vacaciones(vacaciones: Solicitud) {
    vacaciones.desde_db = this._cs.from_calendar_to_DB(vacaciones.desde);
    vacaciones.hasta_db = this._cs.from_calendar_to_DB(vacaciones.hasta);
    const url = `${URL_SERVICIOS}solicitudes/vacaciones?token=${localStorage.getItem('token')}`;
    return this.http.post(url, vacaciones);
  }

  enviar_otros(otros: Solicitud) {
    otros.fecha_otros_db = this._cs.from_calendar_to_DB(otros.fecha_otros);
    const url = `${URL_SERVICIOS}solicitudes/otros?token=${localStorage.getItem('token')}`;
    return this.http.post(url, otros);
  }

  traer_solicitudes(id_usuario = '0') {
    if (id_usuario === '0') {
      const url = `${URL_SERVICIOS}solicitudes?token=${localStorage.getItem('token')}`;
      return this.http.get(url);
    } else {
      const url = `${URL_SERVICIOS}solicitudes/${id_usuario}?token=${localStorage.getItem('token')}`;
      return this.http.get(url);
    }
  }

  traer_por_aprobar(id_aprobador = localStorage.getItem('id_usuario')) {
      const url = `${URL_SERVICIOS}solicitudes/aprobacion/${id_aprobador}?token=${localStorage.getItem('token')}`;
      return this.http.get(url);
  }

  aprobar_solicitud(id) {
    const url = `${URL_SERVICIOS}solicitudes/aprobar/${id}?token=${localStorage.getItem('token')}`;
    return this.http.put(url, {});
  }

  rechazar_solicitud(id) {
    const url = `${URL_SERVICIOS}solicitudes/rechazar/${id}?token=${localStorage.getItem('token')}`;
    return this.http.put(url, {});
  }

}
