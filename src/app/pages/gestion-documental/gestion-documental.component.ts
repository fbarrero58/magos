// Configuracion
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Servicios
import { DocumentosService } from '../../services/documentos/documentos.service';
import { GenericoService } from '../../services/generico.service';

// Clases
import { Temas } from '../../classes/temas';


@Component({
  selector: 'app-gestion-documental',
  templateUrl: './gestion-documental.component.html',
  styles: []
})
export class GestionDocumentalComponent implements OnInit {

  titulo = 'Temas Registrados';
  columnas = [
    { title: 'Tema' },
    { title: 'Descripción' },
    { title: 'Categorias' },
    { title: 'Acciones' }
  ];
  datos = [];
  temas: Temas[];
  cargando = true;

  constructor( public _ds: DocumentosService, public router: Router, public _gs: GenericoService ) {
    this._gs.nombre_pagina = 'Temas';
  }

  ngOnInit() {
    this.cargar_datos();
  }

  cargar_datos() {

    this._ds.traer_lineas_servicio().subscribe((resp: any) => {
      this.temas = resp.temas;
      let aux_datos = [];
      const datos_tabla = [];
      this.temas.forEach(e => {
        aux_datos.push(e.nombre);
        aux_datos.push(e.descripcion);
        aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver categorias</button>`);
        aux_datos.push(`<button value="${e.id}" class="btn btn-warning btn-sm btn-link editar">Editar</button>`);
        datos_tabla.push(aux_datos);
        aux_datos = [];
      });

      this.datos = datos_tabla;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });

  }

  recibir_redireccion(evento) {
    this.temas.filter( (tema) => {
      if (tema.id === evento) {
        this._ds.tema_seleccionado = tema;
      }
    });
    this.router.navigate(['/gestion-documental/categorias/' + evento]);
  }

  edicion_redireccion(evento) {
    this.temas.filter( (tema) => {
      if (tema.id === evento) {
        this._ds.tema_seleccionado = tema;
      }
    });
    this.router.navigate(['gestion-documental/editar/' + evento]);
  }

}
