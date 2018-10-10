import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Configuración
import { ADMIN_EMPRESAS } from '../../../constantes/tablas';

// Servicios
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { Empresa } from '../../../classes/empresa';

declare var $: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {

  constructor(public router: Router, public _es: EmpresaService) { }

  ngOnInit() {
    this.traer_datos();
  }

  traer_datos() {
    this._es.traer_empresas().subscribe((resp: any) => {
      this._es.empresas = resp.empresas;
      this.armar_datos(this._es.empresas);
    });
  }

  armar_datos(datos: Empresa[]) {
    let aux_datos = [];
    const datos_tabla = [];
    datos.forEach(e => {
      aux_datos.push(e.nombre);
      aux_datos.push(e.codigo);
      aux_datos.push(e.nombre_tipo);
      aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });
    this.inicializar_tabla(datos_tabla);
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
      columns: ADMIN_EMPRESAS
    });
    $('#datatables').on('click', '.detalles', (e) => {
      this.router.navigate([`admin/empresas/form/detalle/${e.target.value}`]);
    });
  }


}
