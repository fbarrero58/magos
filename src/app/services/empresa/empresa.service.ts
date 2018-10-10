import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../classes/empresa';
import { URL_SERVICIOS } from '../../constantes/config';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresas: Empresa[] = [];

  constructor( public http: HttpClient ) { }

  traer_empresas() {
    const url = `${URL_SERVICIOS}empresas?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  crear_empresa(empresa: Empresa) {
    const url = `${URL_SERVICIOS}empresas?token=${localStorage.getItem('token')}`;
    return this.http.post(url, empresa);
  }

  modificar_empresa(empresa: Empresa) {
    const url = `${URL_SERVICIOS}empresas/${empresa.id}?token=${localStorage.getItem('token')}`;
    return this.http.put(url, empresa);
  }

}
