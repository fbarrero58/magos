import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';
import { PropuestasService } from '../../../services/propuestas/propuestas.service';
import { Condicion } from '../../../classes/condicion';
import { VmcaService } from 'src/app/services/vmca/vmca.service';
import { Vmca } from '../../../classes/vmca';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styles: []
})
export class CondicionesComponent implements OnInit {

  cargando = true;
  titulo = 'Condiciones de pago - ';
  columnas = [
    { title: 'Facturación' },
    { title: 'Pago' },
    { title: 'Orden de compra' },
    { title: 'Hes' },
    { title: 'Detalle' },
  ];
  datos = [];
  condiciones: Condicion[];
  estados_facturacion: Vmca[] = [];
  estados_pago: Vmca[] = [];

  constructor( public router: Router, public _ps: PropuestasService, public _vs: VmcaService ) {
    if (!this._ps.propuesta_seleccionada) { this.router.navigate(['/propuestas']);
    } else {this.titulo = this.titulo + this._ps.propuesta_seleccionada.nombre; }
  }

  ngOnInit() {
    this.traer_datos();
  }

  traer_datos() {

    this._vs.traer_estados_facturacion().subscribe((resp: any) => {
      this.estados_facturacion = resp.estados;
      this._vs.traer_estados_pago().subscribe((resp2: any) => {
        this.estados_pago = resp2.estados;

        this._ps.traer_condiciones().subscribe((resp3: any) => {
          this.condiciones = resp3.condiciones;
          let aux_datos = [];
          const datos_tabla = [];
          this.condiciones.forEach(e => {
            aux_datos.push(this.buscar_facturacion(e.id_estado_facturacion));
            aux_datos.push(this.buscar_pago(e.id_estado_pago));
            aux_datos.push(this.verificar_vacio(e.num_orden_compra));
            aux_datos.push(this.verificar_vacio(e.hes));
            aux_datos.push(`<button value='${JSON.stringify(e)}' class="btn btn-primary btn-sm btn-link detalles">Ver Detalle</button>`);
            datos_tabla.push(aux_datos);
            aux_datos = [];
          });
          this.datos = datos_tabla;
          this.cargando = false;

        });
      });
    });

  }

  recibir_redireccion($evento) {
    this._ps.condicion_seleccionada = JSON.parse($evento);
    this.router.navigate(['/propuestas/condiciones/editar']);
  }

  verificar_vacio(texto) {
    if (texto.length === 0) {
      return 'No especificado';
    } else { return texto; }
  }

  buscar_facturacion(id) {
    let resultado;
    this.estados_facturacion.filter( (e) => {
      if (e.id === id) { return resultado = e.nombre; }
    });
    return resultado;
  }

  buscar_pago(id) {
    let resultado;
    this.estados_pago.filter( (e) => {
      if (e.id === id) { return resultado = e.nombre; }
    });
    return resultado;
  }

}
