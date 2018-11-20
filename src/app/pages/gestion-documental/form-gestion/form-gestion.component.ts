// Configuracion
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { VmcaService } from '../../../services/vmca/vmca.service';
import { DocumentosService } from '../../../services/documentos/documentos.service';
import { GenericoService } from '../../../services/generico.service';

// Clases
import { Temas } from '../../../classes/temas';

declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-gestion',
  templateUrl: './form-gestion.component.html',
  styles: []
})
export class FormGestionComponent implements OnInit {

  tema: Temas = new Temas('T');
  modo_editar = false;
  cargando = false;

  constructor( public router: Router, public _vs: VmcaService, public _ds: DocumentosService, public _gs: GenericoService) {
    if ( window.location.href.includes('editar') && !this._ds.tema_seleccionado ) {
      this.router.navigate(['/gestion-documental']);
    } else if (window.location.href.includes('editar')) {
      this.modo_editar = true;
      this.tema = this._ds.tema_seleccionado;
    }
    this._gs.nombre_pagina = 'Formulario de Temas';
  }

  ngOnInit() {
    $('select').select2();
  }

  onSubmit(e) {
    this.cargando = true;
    this.tema.habilitado = $('#form_habilitado').val();
    if (this.modo_editar) {
      this._ds.actualizar_tema(this.tema).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._ds.crear_tema(this.tema).subscribe(resp => {
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
      this.router.navigate(['/gestion-documental']);
  }

}
