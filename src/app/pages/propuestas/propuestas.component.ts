import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropuestasService } from 'src/app/services/propuestas/propuestas.service';
import { Propuesta } from 'src/app/classes/propuesta';
import { CalendarioService } from '../../services/calendario.service';
import { GenericoService } from 'src/app/services/generico.service';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styles: []
})
export class PropuestasComponent implements OnInit {

  cargando = true;
  titulo = 'Propuestas registradas';
  columnas = [
    { title: 'Nombre' },
    { title: 'Fecha de Entrega' },
    { title: 'Estado' },
    { title: 'Opciones' }
  ];
  datos = [];
  propuestas: Propuesta[];

  constructor( public router: Router, public _ps: PropuestasService, public _cs: CalendarioService,
                public _gs: GenericoService ) {
                  this._gs.nombre_pagina = 'Propuestas';
                }

  ngOnInit() {
    this._ps.propuesta_seleccionada = new Propuesta();
    this.traer_datos();
  }

  traer_datos() {
    this._ps.traer_propuestas().subscribe( (resp: any) => {
      this.propuestas = resp.propuestas;
      this.armar_datos();
    });
  }

  armar_datos() {
    let aux_datos = [];
    const datos_tabla = [];
    let contador = 0;
    this.propuestas.forEach(e => {
      e.fecha_entrega_app = this._cs.format_to_nice(e.fecha_entrega);
      e.fecha_vendida_app = this._cs.format_to_nice(e.fecha_vendida);
      aux_datos.push(e.nombre);
      aux_datos.push(e.fecha_entrega_app);
      aux_datos.push(e.estado);
      aux_datos.push(`<button value="${contador}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
      contador ++;
    });
    this.datos = datos_tabla;
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  recibir_redireccion($evento) {
    this._ps.propuesta_seleccionada = this.propuestas[$evento];
    this.router.navigate(['/propuestas/editar']);
  }

}
