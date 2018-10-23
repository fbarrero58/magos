import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_EMPRESAS } from '../../constantes/tablas';
declare var $;

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: []
})
export class TablaComponent implements OnInit {

  @Input() titulo: string;
  @Input() columnas;
  @Input() datos;

  @Output() id_redireccion: EventEmitter<number> = new EventEmitter();
  @Output() id_editar: EventEmitter<number> = new EventEmitter();

  constructor( public router: Router ) { }

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
      data: this.datos,
      columns: this.columnas
    });
    $('#datatables').on('click', '.detalles', (e) => {
      this.id_redireccion.emit(e.target.value);
    });

    $('#datatables').on('click', '.editar', (e) => {
      this.id_editar.emit(e.target.value);
    });

  }


}
