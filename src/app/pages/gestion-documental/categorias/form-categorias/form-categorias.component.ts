import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Temas } from '../../../../classes/temas';
import { VmcaService } from '../../../../services/vmca/vmca.service';
import { DocumentosService } from '../../../../services/documentos/documentos.service';

declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styles: []
})
export class FormCategoriasComponent implements OnInit {

  id_tema;
  cargando = false;
  categoria = new Temas('T');
  modo_editar = false;

  constructor(public router: Router, public _vs: VmcaService, public _ds: DocumentosService, public ac: ActivatedRoute) {
    if ( window.location.href.includes('editar') && !this._ds.categoria_seleccionada ) {
      this.router.navigate(['/gestion-documental/']);
    } else if (window.location.href.includes('editar')) {
      this.modo_editar = true;
      this.categoria = this._ds.categoria_seleccionada;
    }

    this.ac.params.subscribe( resp => {
      this.id_tema = resp['tema'];
    });

  }

  ngOnInit() {
    $('select').select2();
  }

  onSubmit(e) {
    this.cargando = true;
    this.categoria.habilitado = $('#form_habilitado').val();
    this.categoria.ref_padre = +this.id_tema;
    if (this.modo_editar) {
      this._ds.actualizar_categoria(this.categoria).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._ds.crear_categoria(this.categoria).subscribe(resp => {
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

  volver() {
    this.router.navigate(['/gestion-documental/categorias/' + this.id_tema]);
  }

}
