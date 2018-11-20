import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/constantes/config';
import { HttpClient } from '@angular/common/http';
import { Propuesta } from '../../classes/propuesta';
import { Condicion } from '../../classes/condicion';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  propuesta_seleccionada: Propuesta;
  condicion_seleccionada: Condicion;

  constructor( public http: HttpClient ) { }

  traer_propuestas() {
    const url = `${URL_SERVICIOS}propuestas?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  guardar_propuesta(propuesta: Propuesta) {
    const url = `${URL_SERVICIOS}propuestas?token=${localStorage.getItem('token')}`;
    return this.http.post(url, propuesta);
  }

  guardar_condicion(condicion: Condicion) {
    const url = `${URL_SERVICIOS}propuestas/condicion/${this.propuesta_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, condicion);
  }

  traer_condiciones() {
    const url = `${URL_SERVICIOS}propuestas/condicion/${this.propuesta_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  actualizar_propuesta(propuesta: Propuesta) {
    const url = `${URL_SERVICIOS}propuestas/${this.propuesta_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, propuesta);
  }

  actualizar_condicion(condicion: Condicion) {
    const url = `${URL_SERVICIOS}propuestas/condicion/${this.condicion_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, condicion);
  }

  eliminar_condicion() {
    const url = `${URL_SERVICIOS}propuestas/condicion/${this.condicion_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.delete(url);
  }

  insertar_seguimiento_consultoria(seguimiento) {
    const url = `${URL_SERVICIOS}propuestas/consultoria/${this.condicion_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, seguimiento);
  }

  insertar_seguimiento_comercial(seguimiento) {
    const url = `${URL_SERVICIOS}propuestas/comercial/${this.condicion_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, seguimiento);
  }

  trar_consultoria() {
    const url = `${URL_SERVICIOS}propuestas/consultoria/${this.condicion_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  trar_comercial() {
    const url = `${URL_SERVICIOS}propuestas/comercial/${this.condicion_seleccionada.id}/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  actualizar_consultoria(seguimiento) {
    const url = `${URL_SERVICIOS}propuestas/consultoria/${seguimiento.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, seguimiento);
  }

  actualizar_comercial(seguimiento) {
    const url = `${URL_SERVICIOS}propuestas/comercial/${seguimiento.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, seguimiento);
  }

}
