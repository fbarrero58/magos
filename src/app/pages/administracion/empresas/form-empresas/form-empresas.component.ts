import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Clases
import { Empresa } from '../../../../classes/empresa';

// Servicios
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { VmcaService } from '../../../../services/vmca/vmca.service';
import { GenericoService } from 'src/app/services/generico.service';

declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-empresas',
  templateUrl: './form-empresas.component.html',
  styles: []
})
export class FormEmpresasComponent implements OnInit {

  tipo_form = '';
  id_form = '';
  empresa = new Empresa('', '', '', '');
  cargando = true;

  constructor(public router: Router, public _es: EmpresaService, public _vs: VmcaService,
              public activeRoute: ActivatedRoute, public _gs: GenericoService) {

      if (this._es.empresas.length === 0) {
        this.router.navigate(['/admin/empresas']);
      }

      this.activeRoute.params.subscribe(params => {
        this.tipo_form = params['tipo'];
        if (this.tipo_form === 'detalle') {
          this.id_form = params['id'];
          this._es.empresas.filter( (e) => {
            if (e.id === this.id_form) {
              this.empresa = e;
            }
          });
        }
      });

      this._gs.nombre_pagina = 'Formulario de Empresas';

    }

  ngOnInit() {
    this.traer_datos();
    $('select').select2();
  }

  traer_datos() {
    this._vs.traer_tipos_empresa().subscribe((resp: any) => {
      this._vs.tipos_empresa = resp.tipos;
      this.cargando = false;
    });
  }

  onSubmit(e) {
    const tipo = $('#tipo_empresa');
    if (!tipo.val()) {
      return swal({
              type: 'error',
              title: 'Algo va mal...',
              text: 'Parece que falta especificar el tipo de Empresa',
            });
    }
    this.cargando = true;
    this.empresa.tipo = tipo.val();
    if (this.tipo_form === 'detalle') {
      this._es.modificar_empresa(this.empresa).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._es.crear_empresa(this.empresa).subscribe(resp => {
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

}
