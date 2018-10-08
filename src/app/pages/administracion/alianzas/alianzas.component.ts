import { Component, OnInit } from '@angular/core';
import { ADMIN_ALIANZAS } from '../../../constantes/tablas';
import { Alianza } from '../../../classes/alianza';
declare var $: any;

@Component({
  selector: 'app-alianzas',
  templateUrl: './alianzas.component.html',
  styles: []
})
export class AlianzasComponent implements OnInit {

  alianza = new Alianza('', '');
  cargando = false;

  constructor() { }

  ngOnInit() {
    this.inicializar_tabbla();
  }

  inicializar_tabbla() {
    $('#datatables').DataTable({
      language: {
          url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
          search: '_INPUT_',
      },
      responsive: true,
      info: false,
      pageLength: 5,
      data: [],
      columns: ADMIN_ALIANZAS
    });
  }

  onSubmit(e) {
    console.log(e.form);
    this.cargando = true;
  }

}
