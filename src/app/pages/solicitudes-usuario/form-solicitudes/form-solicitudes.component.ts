import { UsuarioService } from '../../../services/usuario.service';
import { VmcaService } from '../../../services/vmca/vmca.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GenericoService } from '../../../services/generico.service';
import { Solicitud } from '../../../classes/solicitud';
import { Vmca } from '../../../classes/vmca';
import { SolicitudesService } from '../../../services/solicitudes/solicitudes.service';

declare var $, md: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-solicitudes',
  templateUrl: './form-solicitudes.component.html',
  styles: []
})
export class FormSolicitudesComponent implements OnInit {

  cargando = true;
  solicitud = new Solicitud();
  tipo_seleccionado = '';
  aprobadores: Vmca[] = [];
  tipos_otros: Vmca[] = [];

  constructor( public _gs: GenericoService, public router: Router, public _vs: VmcaService,
              public _us: UsuarioService, public _ss: SolicitudesService ) {
    this._gs.nombre_pagina = 'Formulario de Solicitudes';
  }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    $('select').select2();

    $('#form_tipo_solicitud').on('change', (e) => {
      this.tipo_seleccionado = e.target.value;
    });

    this._us.traer_aprobadores().subscribe((resp: any) => {
      this.aprobadores = resp.aprobadores;
      this.cargando = false;
    });

    this._ss.traer_tipos_otros().subscribe((resp: any) => {
      this.tipos_otros = resp.tipos;
    });

  }

  onSubmit(e) {

    const aprobador = $('#form_tipo_aprobador');

    if (!aprobador.val()) {
      return this.alerta_error('Es necesario especificar un aprobaor');
    }

    this.solicitud.aprobador = aprobador.val();
    this.solicitud.solicitante = localStorage.getItem('id_usuario');

    switch (this.tipo_seleccionado) {
      case 'permiso':
        const fecha = $('#form_fecha_permiso');
        const horas = $('#form_horas_permiso');
        if (!fecha.val() || !horas.val() || !this.solicitud.descripcion) {
          return this.alerta_error();
        }
        this.solicitud.fecha_permiso = fecha.val();
        this.solicitud.horas_permiso = horas.val();
        this.cargando = true;
        this._ss.enviar_permiso(this.solicitud).subscribe(resp => {
          this.respuesta_servicio(resp);
        });
        break;
      case 'vacaciones':
        const desde = $('#form_fecha_desde');
        const hasta = $('#form_fecha_hasta');
        if (!desde.val() || !hasta.val() || !this.solicitud.dias_habiles) {
          return this.alerta_error();
        }
        this.solicitud.desde = desde.val();
        this.solicitud.hasta = hasta.val();
        this.cargando = true;
        this._ss.enviar_vacaciones(this.solicitud).subscribe(resp => {
          this.respuesta_servicio(resp);
        });
        break;
      case 'otros':
        const motivo = $('#form_motivo_otros');
        const fecha_otros = $('#form_fecha_otros');
        if (!motivo.val() || !fecha_otros.val()) {
          return this.alerta_error();
        }
        this.solicitud.motivo = motivo.val();
        this.solicitud.fecha_otros = fecha_otros.val();
        this.cargando = true;
        this._ss.enviar_otros(this.solicitud).subscribe(resp => {
          this.respuesta_servicio(resp);
        });
        break;
      default:
        break;
    }
  }

  alerta_error(mensaje = 'Parece que aún faltan algunos datos') {
    swal({
      type: 'error',
      title: 'Algo va mal...',
      text: mensaje,
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
