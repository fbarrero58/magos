import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    this.inicializarTabla();
  }

  inicializarTabla() {
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      language: {
          url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
          search: '_INPUT_',
      },
      responsive: true,
      data: [],
      columns: [
          { title: 'Nombre' },
          { title: 'Cargo' },
          { title: 'Rol' },
          { title: 'Acciones' },
      ]
  });
  }

}
