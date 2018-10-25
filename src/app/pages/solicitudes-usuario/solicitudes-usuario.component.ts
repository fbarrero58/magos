// Configuracion
import { CalendarioService } from '../../services/calendario.service';
import { Component, OnInit } from '@angular/core';
import { USUARIO_SOLICITUDES } from '../../constantes/tablas';
import { Router } from '@angular/router/';
import { GenericoService } from '../../services/generico.service';
import { SolicitudesService } from '../../services/solicitudes/solicitudes.service';
import { Solicitud } from '../../classes/solicitud';

declare var $: any;

@Component({
  selector: 'app-solicitudes-usuario',
  templateUrl: './solicitudes-usuario.component.html',
  styles: []
})
export class SolicitudesUsuarioComponent implements OnInit {

  datos = USUARIO_SOLICITUDES;
  cargando = true;
  selected_view = 'permisos';
  permisos: Solicitud[];
  vacaciones: Solicitud[];
  otros: Solicitud[];

  constructor( public router: Router, public _gs: GenericoService, public _ss: SolicitudesService,
              public _cs: CalendarioService ) {
    this._gs.nombre_pagina = 'Solicitudes Realizadas';
  }

  ngOnInit() {
    this._ss.traer_solicitudes(localStorage.getItem('id_usuario')).subscribe((resp: any) => {
      this.permisos = resp.permisos;
      this.vacaciones = resp.vacaciones;
      this.otros = resp.otros;
      this.armar_datos();
      setTimeout(() => {
        this.cargando = false;
      }, 2000);
    });
  }

  armar_datos() {
    let aux_datos = [];
    let datos_tabla = [];
    this.permisos.forEach(e => {
      e.fecha_permiso = this._cs.format_to_nice(e.fecha_permiso_db);
      aux_datos.push(e.nombre_aprobador);
      aux_datos.push(e.estado);
      aux_datos.push(e.fecha_permiso);
      aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[0].datos = datos_tabla;
    datos_tabla = [];
    this.vacaciones.forEach(e => {
      e.desde = this._cs.format_to_nice(e.desde_db);
      e.hasta = this._cs.format_to_nice(e.hasta_db);
      aux_datos.push(e.nombre_aprobador);
      aux_datos.push(e.estado);
      aux_datos.push(e.desde);
      aux_datos.push(e.hasta);
      aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[1].datos = datos_tabla;
    datos_tabla = [];
    this.otros.forEach(e => {
      e.fecha_otros = this._cs.format_to_nice(e.fecha_otros_db);
      aux_datos.push(e.nombre_aprobador);
      aux_datos.push(e.estado);
      aux_datos.push(e.fecha_otros);
      aux_datos.push(e.motivo);
      aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[2].datos = datos_tabla;
    this.inicializar_Tablas();
  }

  cambiar_vista(vista) {
    this.selected_view = vista;
  }

  inicializar_Tablas() {
    this.datos.forEach(e => {
      $(`#${e.id_tabla}`).DataTable({
          'language': {
              'url': 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
              search: '_INPUT_',
          },
          responsive: true,
          data: e.datos,
          columns: e.columnas,
          destroy: true
      });
    });

  }

}
