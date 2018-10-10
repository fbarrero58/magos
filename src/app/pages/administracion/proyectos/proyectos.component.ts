// Configuracion
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ADMIN_PROYECTOS } from '../../../constantes/tablas';

// Servicios
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { CalendarioService } from '../../../services/calendario.service';

declare var $: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: []
})
export class ProyectosComponent implements OnInit {

  constructor(public router: Router, public _ps: ProyectoService, public _cs: CalendarioService) { }

  ngOnInit() {
    this.traer_datos();
  }

  traer_datos() {
    this._ps.traer_proyectos().subscribe((resp: any) => {
      this._ps.proyectos = resp.proyectos;
      this._ps.proyectos.forEach(e => {
        e.inicio = this._cs.from_DB_to_calendar(e.inicio);
        e.fin = this._cs.from_DB_to_calendar(e.fin);
      });
      let aux_datos = [];
      const datos_tabla = [];
      this._ps.proyectos.forEach(e => {
        aux_datos.push(e.nombre);
        aux_datos.push(e.codigo);
        aux_datos.push(e.nombre_empresa);
        aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
        datos_tabla.push(aux_datos);
        aux_datos = [];
      });
      this.inicializar_tabla(datos_tabla);
    });

    $('#datatables').on('click', '.detalles', (e) => {
      this.router.navigate([`admin/proyectos/form/detalle/${e.target.value}`]);
    });
  }

  inicializar_tabla(datos) {
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      language: {
          url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
          search: '_INPUT_',
      },
      responsive: true,
      data: datos,
      columns: ADMIN_PROYECTOS
  });
  }

}
