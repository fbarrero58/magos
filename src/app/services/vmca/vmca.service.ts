import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vmca } from '../../classes/vmca';
import { URL_SERVICIOS } from '../../constantes/config';

@Injectable({
  providedIn: 'root'
})
export class VmcaService {

  roles: Vmca[] = [];
  public estados_activos: Vmca[] = [{id: 'T', nombre: 'Activo'}, {id: 'F', nombre: 'Inactivo'}];

  constructor( public http: HttpClient ) { }

  traer_roles() {
    const url = `${URL_SERVICIOS}vmca/roles/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

}
