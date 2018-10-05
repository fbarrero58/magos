import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ADMIN_EMPRESAS } from '../../../constantes/tablas';
declare var $: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    this.inicializar_tabla();
  }

  inicializar_tabla() {
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      language: {
          url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
          search: '_INPUT_',
      },
      responsive: true,
      data: [],
      columns: ADMIN_EMPRESAS
  });
  }

}
