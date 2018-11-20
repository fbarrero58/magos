import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../../../classes/solicitud';

// Servicios
import { CalendarioService } from '../../../../services/calendario.service';
import { SolicitudesService } from '../../../../services/solicitudes/solicitudes.service';
import { GenericoService } from '../../../../services/generico.service';

declare function swal(string): any;

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styles: []
})
export class DetalleSolicitudComponent implements OnInit {

  cargando = false;
  solicitud: Solicitud = new Solicitud();
  tipo_seleccionado = '';
  id_usuario = localStorage.getItem('id_usuario');
  nombre_aprobador: string;

  constructor( public router: Router, public ar: ActivatedRoute, public _cs: CalendarioService,
                public _ss: SolicitudesService, public _gs: GenericoService ) {
                  this._gs.nombre_pagina = 'Detalle de Solicitud';
                }

  ngOnInit() {
    this.armar_datos();
  }

  armar_datos() {
    const ref_url = this.ar.snapshot.paramMap;
    this.solicitud.tipo_solicitud = ref_url.get('tipo_solicitud');
    this.solicitud.id = ref_url.get('id');
    this.solicitud.estado = ref_url.get('estado');
    this.solicitud.aprobador = ref_url.get('id_usuario_aprobador');
    switch (this.solicitud.tipo_solicitud) {
      case 'Permiso':
        this.tipo_seleccionado = 'permiso';
        this.solicitud.nombre_aprobador = ref_url.get('nombre_aprobador');
        this.solicitud.fecha_permiso = this._cs.format_to_nice(ref_url.get('fecha_permiso_db'));
        this.solicitud.horas_permiso = ref_url.get('horas');
        this.solicitud.descripcion = ref_url.get('descripcion');
        break;
      case 'Vacaciones':
        this.tipo_seleccionado = 'vacaciones';
        this.solicitud.nombre_aprobador = ref_url.get('nombre_aprobador');
        this.solicitud.desde = this._cs.format_to_nice(ref_url.get('desde_db'));
        this.solicitud.hasta = this._cs.format_to_nice(ref_url.get('hasta_db'));
        this.solicitud.dias_habiles = ref_url.get('dias_habiles');
        break;
      case 'Otros':
        this.tipo_seleccionado = 'otros';
        this.solicitud.nombre_aprobador = ref_url.get('nombre_aprobador');
        this.solicitud.motivo = ref_url.get('motivo');
        this.solicitud.fecha_otros = this._cs.format_to_nice(ref_url.get('fecha_otros_db'));
        break;
      default:
        break;
    }
    const usuario_temp: any = JSON.parse(localStorage.getItem('usuario'));
    this.nombre_aprobador = `${usuario_temp.nombres} ${usuario_temp.apellidos}`;
  }

  onSubmit(e) {}

  aprobar() {
    this._ss.aprobar_solicitud(this.solicitud.id).subscribe(resp => {
      this.cargando = true;
      this.respuesta_servicio(resp);
      this.solicitud.estado = 'Aprobada';
    });
  }

  rechazar() {
    this._ss.rechazar_solicitud(this.solicitud.id).subscribe(resp => {
      this.cargando = true;
      this.respuesta_servicio(resp);
      this.solicitud.estado = 'Rechazada';
    });
  }

  respuesta_servicio(resp) {
    let tipo = 'success';
      if (resp.err) {tipo = 'error'; }
      swal({
        type: tipo,
        title: resp.mensaje,
        showConfirmButton: true
      });
      this.cargando = false;
  }

}
