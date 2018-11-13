import { Component, OnInit } from '@angular/core';
import { Propuesta } from '../../../classes/propuesta';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { Vmca } from '../../../classes/vmca';
import { VmcaService } from '../../../services/vmca/vmca.service';
import { Router, ActivatedRoute } from '@angular/router/';
import { PropuestasService } from '../../../services/propuestas/propuestas.service';
import { CalendarioService } from '../../../services/calendario.service';
import { GenericoService } from 'src/app/services/generico.service';

declare var $, md: any;
declare function swal(string, algo?: any): any;

@Component({
  selector: 'app-form-propuestas',
  templateUrl: './form-propuestas.component.html',
  styles: []
})
export class FormPropuestasComponent implements OnInit {

  cargando = false;
  tipo = 'nuevo';
  propuesta = new Propuesta();
  proyectos: Vmca[];
  estados_comerciales: Vmca[];

  constructor( public _ps: ProyectoService, public _vs: VmcaService, public router: Router, public _prs: PropuestasService,
                public _cs: CalendarioService, public _ar: ActivatedRoute, public _gs: GenericoService ) {

          this._ar.params.subscribe(resp => {
            this.tipo = resp['tipo'];
            if (this.tipo === 'editar' && !this._prs.propuesta_seleccionada) {
              return this.router.navigate(['/propuestas']);
            } else if (this.tipo === 'editar') {
              this.propuesta = this._prs.propuesta_seleccionada;
              this.propuesta.fecha_entrega_app = this._cs.from_DB_to_calendar(this.propuesta.fecha_entrega);
              this.propuesta.fecha_vendida_app = this._cs.from_DB_to_calendar(this.propuesta.fecha_vendida);
            }
          });

          this._gs.nombre_pagina = 'Formulario propuestas';
    }

  ngOnInit() {
    this.traer_datos();
    md.initFormExtendedDatetimepickers();
    $('select').select2();
  }

  traer_datos() {
    this._ps.traer_proyectos().subscribe( (resp: any) => {
      resp.proyectos.forEach(e => {
        e.nombre = `${e.nombre} - ${e.codigo}`;
      });
      this.proyectos = resp.proyectos;
    });

    this._vs.traer_estados_comerciales().subscribe( (resp: any) => {
      this.estados_comerciales = resp.estados;
    });


  }

  onSubmit(e) {
    const proyecto = $('#form_proyecto');
    const fecha_vendida = $('#form_fecha_vendida');
    const fecha_entrega = $('#form_fecha_entrega');
    const tipo_moneda = $('#tipo_moneda');
    if (!proyecto.val() || !tipo_moneda.val()) {
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Todos los campos deben ser especificados',
      });
    }

    this.propuesta.id_proyecto = proyecto.val();
    this.propuesta.fecha_vendida = this._cs.from_calendar_to_DB(fecha_vendida.val());
    this.propuesta.fecha_entrega = this._cs.from_calendar_to_DB(fecha_entrega.val());
    this.propuesta.tipo_moneda = tipo_moneda.val();
    this.cargando = true;
    if (this.tipo === 'nuevo') {
      this._prs.guardar_propuesta(this.propuesta).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      console.log('Actualizar');
      this._prs.actualizar_propuesta(this.propuesta).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
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

  eliminar() {

  }

}
