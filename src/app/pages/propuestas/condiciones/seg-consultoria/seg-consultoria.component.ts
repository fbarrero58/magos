import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seguimiento } from '../../../../classes/seguimiento';
import { CalendarioService } from '../../../../services/calendario.service';
import { PropuestasService } from '../../../../services/propuestas/propuestas.service';

declare var $, md: any;
declare function swal(string): any;

@Component({
  selector: 'app-seg-consultoria',
  templateUrl: './seg-consultoria.component.html',
  styles: []
})
export class SegConsultoriaComponent implements OnInit {

  seguimiento: Seguimiento = new Seguimiento();
  seguimientos: Seguimiento[] = [];
  cargando = false;
  modo = 'nuevo';
  modo_visualizar = 'consultoria';

  constructor(public router: Router, public _cs: CalendarioService, public _ps: PropuestasService) {
    if ( !this._ps.condicion_seleccionada ) {
      this.router.navigate(['/propuestas']);
    } else {
      const url = this.router.url;
      const url_array = url.split('/');
      this.modo_visualizar = url_array[url_array.length - 1];
    }
  }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    this.traer_datos();
  }

  traer_datos() {
    if (this.modo_visualizar === 'consultoria') {
      this._ps.trar_consultoria().subscribe((resp: any) => {
        this.seguimientos = resp.seguimiento;
        this.seguimientos.forEach(e => {
          e.fecha_db = e.fecha;
          e.fecha_mostrar = this._cs.format_to_nice(e.fecha);
          e.fecha = this._cs.from_DB_to_calendar(e.fecha);
        });
      });
    } else {
      this._ps.trar_comercial().subscribe((resp: any) => {
        this.seguimientos = resp.seguimiento;
        this.seguimientos.forEach(e => {
          e.fecha_db = e.fecha;
          e.fecha_mostrar = this._cs.format_to_nice(e.fecha);
          e.fecha = this._cs.from_DB_to_calendar(e.fecha);
        });
      });
    }
  }

  onSubmit() {
    const fecha = $('#fecha');
    this.seguimiento.fecha_db = this._cs.from_calendar_to_DB(fecha.val());

    this.cargando = true;
    if (this.modo_visualizar === 'consultoria') {
      if (this.modo === 'nuevo') {
        this._ps.insertar_seguimiento_consultoria(this.seguimiento).subscribe(resp => {
          this.traer_datos();
          this.respuesta_servicio(resp);
        });
      } else {
        this._ps.actualizar_consultoria(this.seguimiento).subscribe(resp => {
          this.traer_datos();
          this.cancelar_edicion();
          this.respuesta_servicio(resp);
        });
      }
    } else {
      if (this.modo === 'nuevo') {
        this._ps.insertar_seguimiento_comercial(this.seguimiento).subscribe(resp => {
          this.traer_datos();
          this.respuesta_servicio(resp);
        });
      } else {
        this._ps.actualizar_comercial(this.seguimiento).subscribe(resp => {
          this.traer_datos();
          this.respuesta_servicio(resp);
        });
      }
    }
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

  seleccionar_seguimiento(segui) {
    this.seguimiento = segui;
    this.modo = 'editar';
  }

  cancelar_edicion() {
    this.modo = 'nuevo';
    this.seguimiento = new Seguimiento();
  }

}
