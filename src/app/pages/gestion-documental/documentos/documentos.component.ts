// Configuracion
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servicios
import { DocumentosService } from '../../../services/documentos/documentos.service';
import { GenericoService } from '../../../services/generico.service';
import { LoginService } from '../../../services/login/login.service';

// Clases
import { Temas } from '../../../classes/temas';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: []
})
export class DocumentosComponent implements OnInit {

  id_tema;
  id_categoria;
  titulo = 'Gestión de Documentos';
  columnas = [
    { title: 'Documento' },
    { title: 'Descripción' },
    { title: 'Link' },
    { title: 'Acciones' },
  ];
  datos = [];
  documentos: Temas[];
  cargando = true;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public _ds: DocumentosService,
              public _gs: GenericoService, public _ls: LoginService) {

    if (!this._ds.categoria_seleccionada || !this._ds.tema_seleccionado) {
      this.router.navigate(['/gestion-documental']);
    } else {
       this.titulo = `Documentos para ${this._ds.categoria_seleccionada.nombre}`;
    }

    this._gs.nombre_pagina = 'Documentos';

  }

  ngOnInit() {
    if (this._ls.rol_usuario === '3') {
      this.columnas.splice(-1, 1);
    }
    this.activatedRoute.params.subscribe(resp => {
      this.id_tema = resp['tema'];
      this.id_categoria = resp['categoria'];
      this.cargar_datos();
    });

  }

  cargar_datos() {
    this._ds.traer_documentos(this.id_categoria).subscribe((resp: any) => {
      this.documentos = resp.documentos;
      let aux_datos = [];
      const datos_tabla = [];
      this.documentos.forEach(e => {
        aux_datos.push(e.nombre);
        aux_datos.push(e.descripcion);
        aux_datos.push(`<a href="${e.url}" target="_blank" class="btn btn-primary btn-link">Descargar</a>`);
        aux_datos.push(`<button value="${e.id}" class="btn btn-warning btn-link editar">Editar</button>`);
        datos_tabla.push(aux_datos);
        aux_datos = [];
      });
      this.datos = datos_tabla;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });
  }

  volver() {
    this.router.navigate(['/gestion-documental/categorias/' + this.id_tema]);
  }

  nuevo() {
    this.router.navigate([`/gestion-documental/documentos/${this.id_tema}/${this.id_categoria}/nuevo`]);
  }

  recibir_redireccion(evento) {
    this.documentos.filter( (documento) => {
      if (documento.id === evento) {
        this._ds.documento_seleccionado = documento;
      }
    });
    this.router.navigate([`/gestion-documental/documentos/${this.id_tema}/${this.id_categoria}/editar`]);
  }

}
