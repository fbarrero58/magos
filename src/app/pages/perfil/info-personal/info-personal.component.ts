// Configuracion
import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioService } from '../../../services/usuario.service';
import { CalendarioService } from '../../../services/calendario.service';
import { GenericoService } from '../../../services/generico.service';

// Clases
import { Usuario } from '../../../classes/usuario';

declare var md, $: any;
declare function swal(string): any;

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styles: []
})
export class InfoPersonalComponent implements OnInit {

  usuario = new Usuario('', '', '', '', '', '', '');
  cargando = true;

  constructor( public _us: UsuarioService, public _cs: CalendarioService, public _gs: GenericoService ) {
    this._gs.nombre_pagina = 'Información Personal';
   }

  ngOnInit() {
    this.traer_datos();
    md.initFormExtendedDatetimepickers();
  }

  traer_datos() {
    this._us.traer_usuario(localStorage.getItem('id_usuario'))
        .subscribe((resp: any) => {
          this.usuario = resp.Usuarios[0];
          if (this.usuario.fecha_nacimiento) {
            this.usuario.fecha_nacimiento = this._cs.from_DB_to_calendar(this.usuario.fecha_nacimiento);
          }
          this.cargando = false;
        });
  }

  onSubmit(e) {
    const fecha_nacimiento = $('#form_nacimiento');
    if (!fecha_nacimiento.val()) {
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Falta especificar la fecha de nacimiento',
      });
    }
    this.cargando = true;
    this.usuario.fecha_nacimiento = fecha_nacimiento.val();
    this._us.modificar_usuario(this.usuario).subscribe(resp => {
      this.respuesta_servicio(resp);
    });
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
