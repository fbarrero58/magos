import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../constantes/config';
import { Temas } from '../../classes/temas';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  tema_seleccionado: Temas;
  categoria_seleccionada: Temas;
  documento_seleccionado: Temas;

  constructor( public http: HttpClient ) { }

  traer_lineas_servicio() {
    const url = `${URL_SERVICIOS}documentos?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_categorias(id_tema) {
    const url = `${URL_SERVICIOS}documentos/categorias/${id_tema}/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  traer_documentos(id_categoria) {
    const url = `${URL_SERVICIOS}documentos/documentos/${id_categoria}/?token=${localStorage.getItem('token')}`;
    return this.http.get(url);
  }

  crear_tema(tema: Temas) {
    const url = `${URL_SERVICIOS}documentos/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, tema);
  }

  actualizar_tema(tema: Temas) {
    const url = `${URL_SERVICIOS}documentos/${tema.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, tema);
  }

  crear_categoria(categoria: Temas) {
    const url = `${URL_SERVICIOS}documentos/categoria/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, categoria);
  }

  actualizar_categoria(categoria: Temas) {
    const url = `${URL_SERVICIOS}documentos/categoria/${categoria.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, categoria);
  }

  crear_documento(documento: Temas) {
    const url = `${URL_SERVICIOS}documentos/documento/?token=${localStorage.getItem('token')}`;
    return this.http.post(url, documento);
  }

  actualizar_documento(documento: Temas) {
    const url = `${URL_SERVICIOS}documentos/documento/${documento.id}/?token=${localStorage.getItem('token')}`;
    return this.http.put(url, documento);
  }

}
