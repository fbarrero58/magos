import { Component, OnInit } from '@angular/core';

// Configuracion
import { ADMIN_ALIANZAS } from '../../../constantes/tablas';

// Clases
import { Alianza } from '../../../classes/alianza';

// Servicios
import { AlianzaService } from '../../../services/alianza/alianza.service';

declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-alianzas',
  templateUrl: './alianzas.component.html',
  styles: []
})
export class AlianzasComponent implements OnInit {

  alianza = new Alianza('', '', '');
  cargando = false;

  constructor(public _al: AlianzaService) { }

  ngOnInit() {
    this.traer_datos();
  }

  traer_datos() {
    this._al.traer_alianzas().subscribe((resp: any) => {
      this._al.alianzas = resp.alianzas;
      let aux_datos = [];
      const datos_tabla = [];
      this._al.alianzas.forEach(e => {
        aux_datos.push(e.nombre);
        aux_datos.push(`${e.condicion} días`);
        datos_tabla.push(aux_datos);
        aux_datos = [];
      });
      this.inicializar_tabla(datos_tabla);
    });
  }

  inicializar_tabla(datos) {
    $('#datatables').DataTable({
      language: {
          url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
          search: '_INPUT_',
      },
      responsive: true,
      info: false,
      pageLength: 8,
      data: datos,
      columns: ADMIN_ALIANZAS
    });

  }

  onSubmit(e) {

    this._al.crear_alianza(this.alianza).subscribe(resp => {
      this.respuesta_servicio(resp);
    });
    this.cargando = true;
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
