import { Component, OnInit } from '@angular/core';
import { Condicion } from '../../../../classes/condicion';
import { Router, ActivatedRoute } from '@angular/router';
import { VmcaService } from 'src/app/services/vmca/vmca.service';
import { Vmca } from '../../../../classes/vmca';
import { PropuestasService } from 'src/app/services/propuestas/propuestas.service';
import { CalendarioService } from '../../../../services/calendario.service';
import { GenericoService } from '../../../../services/generico.service';

declare var $, md: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-condiciones',
  templateUrl: './form-condiciones.component.html',
  styles: []
})
export class FormCondicionesComponent implements OnInit {

  cargando = false;
  condicion = new Condicion();
  estados_facturacion: Vmca[] = [];
  estados_pago: Vmca[] = [];
  tipo = '';

  constructor( public router: Router, public _vs: VmcaService, public _ps: PropuestasService,
              public _cs: CalendarioService, public _ar: ActivatedRoute, public _gs: GenericoService) {

    if ( !this._ps.propuesta_seleccionada ) {
      this.router.navigate(['/propuestas']);
    }

    this._ar.params.subscribe(resp => {
      this.tipo = resp['tipo'];
      if (this.tipo === 'editar' && !this._ps.condicion_seleccionada) {
        this.router.navigate(['/propuestas/condiciones']);
      } else if (this.tipo === 'editar') {
        this.condicion = this._ps.condicion_seleccionada;
        this.condicion.fecha_facturacion_app = this._cs.from_DB_to_calendar(this.condicion.fecha_facturacion);
        this.condicion.fecha_hes_app = this._cs.from_DB_to_calendar(this.condicion.fecha_hes);
        this.condicion.fecha_orden_compra_app = this._cs.from_DB_to_calendar(this.condicion.fecha_orden_compra);
        this.condicion.fecha_pago_estimada_app = this._cs.from_DB_to_calendar(this.condicion.fecha_pago_estimada);
        this.condicion.fecha_pago_real_app = this._cs.from_DB_to_calendar(this.condicion.fecha_pago_real);
      } else {
        this.condicion.total_clp = 0;
        this.condicion.total_uf = 0;
        this.condicion.valor_uf = 0;
      }
    });
    this._gs.nombre_pagina = 'Formulario condiciones';
   }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    $('select').select2();
    this.traer_datos();
  }

  traer_datos() {
    this._vs.traer_estados_facturacion().subscribe((resp: any) => {
      this.estados_facturacion = resp.estados;
    });

    this._vs.traer_estados_pago().subscribe((resp: any) => {
      this.estados_pago = resp.estados;
    });
  }

  onSubmit(e) {
    const facturacion = $('#form_estado_facturacion');
    const pago = $('#form_estado_pago');
    const fecha_facturacion = $('#form_fecha_facturacion');
    const fecha_orden = $('#form_fecha_orden');
    const fecha_hes = $('#form_fecha_hes');
    const fecha_real = $('#form_fecha_real');
    const fecha_estimado = $('#form_fecha_estimada');
    if ( !facturacion.val() || !pago.val() ) {
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Es necesario especificar el estado de facturación y de pago',
      });
    }

    this.cargando = true;

    if ( !this.condicion.num_factura ) {this.condicion.num_factura = ''; }
    if ( !this.condicion.monto_pagado ) {this.condicion.monto_pagado = ''; }
    if ( !this.condicion.num_orden_compra ) {this.condicion.num_orden_compra = ''; }
    if ( !this.condicion.hes ) {this.condicion.hes = ''; }
    if ( !this.condicion.detalles_adicionales ) {this.condicion.detalles_adicionales = ''; }

    this.condicion.id_estado_facturacion = facturacion.val();
    this.condicion.id_estado_pago = pago.val();
    this.condicion.fecha_facturacion = this._cs.from_calendar_to_DB(fecha_facturacion.val());
    this.condicion.fecha_orden_compra = this._cs.from_calendar_to_DB(fecha_orden.val());
    this.condicion.fecha_hes = this._cs.from_calendar_to_DB(fecha_hes.val());
    this.condicion.fecha_pago_real = this._cs.from_calendar_to_DB(fecha_real.val());
    this.condicion.fecha_pago_estimada = this._cs.from_calendar_to_DB(fecha_estimado.val());

    if (this.tipo === 'nuevo') {
      this._ps.guardar_condicion(this.condicion).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._ps.actualizar_condicion(this.condicion).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    }

  }

  cambio_valor(valor, tipo) {

    switch (tipo) {
      case 'valor_uf':
          this.condicion.total_clp = this.condicion.total_uf * valor;
        break;
      case 'total_uf':
          this.condicion.total_clp = this.condicion.valor_uf * valor;
        break;

      // case 'total_clp':
      //   this.condicion.total_uf =  valor / this.condicion.valor_uf;
      //   break;

      default:
        break;
    }
  }

  respuesta_servicio(resp, regresar = false) {
    let tipo = 'success';
      if (resp.err) {tipo = 'error'; }
      swal({
        type: tipo,
        title: resp.mensaje,
        showConfirmButton: true
      });
      this.cargando = false;
      if (regresar) {
        this.router.navigate(['/propuestas/condiciones']);
      }
  }

  eliminar() {
    this._ps.eliminar_condicion().subscribe(resp => {
      this.respuesta_servicio(resp, true);
    });
  }

}
