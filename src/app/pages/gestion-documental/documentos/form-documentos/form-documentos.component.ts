import { Component, OnInit } from '@angular/core';
import { Temas } from '../../../../classes/temas';
import { DocumentosService } from '../../../../services/documentos/documentos.service';
import { ActivatedRoute, Router } from '@angular/router/';
declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-documentos',
  templateUrl: './form-documentos.component.html',
  styles: []
})
export class FormDocumentosComponent implements OnInit {

  cargando = false;
  documento = new Temas('T');
  id_tema;
  id_categoria;
  modo_editar = false;

  constructor(public _ds: DocumentosService, public ar: ActivatedRoute, public router: Router) {

    this.ar.params.subscribe( resp => {
      this.id_tema = resp['tema'];
      this.id_categoria = resp['categoria'];

      if ( window.location.href.includes('editar') && !this._ds.documento_seleccionado ) {
        this.volver();
      } else if (window.location.href.includes('editar')) {
        this.modo_editar = true;
        this.documento = this._ds.documento_seleccionado;
      }

    });
   }

  ngOnInit() {
  }

  onSubmit(e) {
    this.cargando = true;
    this.documento.habilitado = $('#form_habilitado').val();
    this.documento.ref_padre = +this.id_categoria;
    if (this.modo_editar) {
      this._ds.actualizar_documento(this.documento).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._ds.crear_documento(this.documento).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    }
  }

  volver() {
    this.router.navigate(['/gestion-documental/documentos/' + this.id_tema + '/' + this.id_categoria]);
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
