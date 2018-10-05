import { Component, OnInit } from '@angular/core';
import { Empresas } from '../../../../classes/empresas';
import { Router } from '@angular/router';
declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-empresas',
  templateUrl: './form-empresas.component.html',
  styles: []
})
export class FormEmpresasComponent implements OnInit {

  empresa = new Empresas('', '', '');
  tipos = [{valor: 1, nombre: 'Empresa'}, {valor: 2, nombre: 'Cliente'}];

  constructor(public router: Router) { }

  ngOnInit() {
    $('select').select2();
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
    this.empresa.tipo = tipo.val();
    console.log(this.empresa);
  }

}
