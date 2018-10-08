import { Proyecto } from '../../../../classes/proyecto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var md, $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styles: []
})
export class FormProyectosComponent implements OnInit {

  proyecto = new Proyecto('Nombre', 'Codigo', '08/10/2017', 'fin', '1', '2', '1', '2');
  cargando = false;
  clientes = [{valor: '1', nombre: 'Cliente 1'}, {valor: '2', nombre: 'Cliente 2'}];
  tipos = [{valor: '1', nombre: 'Tipo 1'}, {valor: '2', nombre: 'Tipo 2'}];
  lineas = [{valor: '1', nombre: 'Linea 1'}, {valor: '2', nombre: 'Linea 2'}];
  estados = [{valor: '1', nombre: 'Estado 1'}, {valor: '2', nombre: 'Estado 2'}];

  constructor(public router: Router) { }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    $('select').select2();
  }

  onSubmit(e) {

  }

}
