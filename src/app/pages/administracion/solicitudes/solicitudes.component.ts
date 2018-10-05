import { ADMIN_SOLICITUDES } from '../../../constantes/tablas';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styles: []
})
export class SolicitudesComponent implements OnInit {

  datos = ADMIN_SOLICITUDES;
  prueba = true;
  selected_view = 'pendientes';

  constructor() { }

  ngOnInit() {
    this.inicializar_Tablas();
  }

  inicializar_Tablas() {
    this.datos.forEach(e => {
      $(`#${e.id_tabla}`).DataTable({
          'language': {
              'url': 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
              search: '_INPUT_',
          },
          responsive: true,
          data: e.datos,
          columns: e.columnas,
          destroy: true
      });
    });

  }

  cambiar_vista(vista) {
    this.selected_view = vista;
  }

}
