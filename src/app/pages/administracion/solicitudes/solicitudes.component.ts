// Configuración
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_SOLICITUDES } from '../../../constantes/tablas';

// Clases
import { Solicitud } from '../../../classes/solicitud';

// Servicios
import { SolicitudesService } from '../../../services/solicitudes/solicitudes.service';
import { CalendarioService } from '../../../services/calendario.service';
import { GenericoService } from '../../../services/generico.service';

declare var $: any;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styles: []
})
export class SolicitudesComponent implements OnInit {

  cargando = true;
  datos = ADMIN_SOLICITUDES;
  prueba = true;
  selected_view = 'pendientes';
  permisos: Solicitud[];
  vacaciones: Solicitud[];
  otros: Solicitud[];
  pendientes: Solicitud[] = [];

  constructor(public _ss: SolicitudesService, public _cs: CalendarioService, public router: Router,
              public _gs: GenericoService) {
                this._gs.nombre_pagina = 'Administración de Solicitudes';
              }

  ngOnInit() {

    this._ss.traer_solicitudes(localStorage.getItem('id_usuario')).subscribe((resp: any) => {
      this.permisos = resp.permisos;
      this.vacaciones = resp.vacaciones;
      this.otros = resp.otros;
      this._ss.traer_por_aprobar().subscribe((resp2: any) => {
        this.pendientes.push(resp2.permisos);
        this.pendientes.push(resp2.vacaciones);
        this.pendientes.push(resp2.otros);
        this.armar_datos();
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
      });
    });
  }

  armar_datos() {
    let aux_datos = [];
    let datos_tabla = [];
    this.permisos.forEach(e => {
      e.fecha_permiso = this._cs.format_to_nice(e.fecha_permiso_db);
      aux_datos.push(e.nombre_solicitante);
      aux_datos.push(e.nombre_aprobador);
      aux_datos.push(e.estado);
      aux_datos.push(e.fecha_permiso);
      aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[1].datos = datos_tabla;
    datos_tabla = [];
    this.vacaciones.forEach(e => {
      e.desde = this._cs.format_to_nice(e.desde_db);
      e.hasta = this._cs.format_to_nice(e.hasta_db);
      aux_datos.push(e.nombre_solicitante);
      aux_datos.push(e.nombre_aprobador);
      aux_datos.push(e.desde);
      aux_datos.push(e.hasta);
      aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[2].datos = datos_tabla;
    datos_tabla = [];
    this.otros.forEach(e => {
      e.fecha_otros = this._cs.format_to_nice(e.fecha_otros_db);
      aux_datos.push(e.nombre_solicitante);
      aux_datos.push(e.nombre_aprobador);
      aux_datos.push(e.fecha_otros);
      aux_datos.push(e.motivo);
      aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[3].datos = datos_tabla;
    datos_tabla = [];
    this.pendientes[0].forEach(e => {
      aux_datos.push(e.nombre_solicitante);
      aux_datos.push(e.tipo_solicitud);
      aux_datos.push(this._cs.format_to_nice(e.fecha_solicitud));
      aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.pendientes[1].forEach(e => {
      aux_datos.push(e.nombre_solicitante);
      aux_datos.push(e.tipo_solicitud);
      aux_datos.push(this._cs.format_to_nice(e.fecha_solicitud));
      aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.pendientes[2].forEach(e => {
      aux_datos.push(e.nombre_solicitante);
      aux_datos.push(e.tipo_solicitud);
      aux_datos.push(this._cs.format_to_nice(e.fecha_solicitud));
      aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.datos[0].datos = datos_tabla;
    this.inicializar_Tablas();
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

      $(`#${e.id_tabla}`).on('click', '.detalles', (evento) => {
        const ob = JSON.parse(evento.target.value);
        this.router.navigate([`admin/solicitudes/detalle`, ob]);
      });

    });

  }

  cambiar_vista(vista) {
    this.selected_view = vista;
  }

}
