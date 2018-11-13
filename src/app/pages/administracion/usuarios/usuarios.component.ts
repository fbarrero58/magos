import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Configuracion
import { ADMIN_USUARIOS } from '../../../constantes/tablas';

// Servicios
import { UsuarioService } from '../../../services/usuario.service';
import { VmcaService } from '../../../services/vmca/vmca.service';
import { CalendarioService } from '../../../services/calendario.service';
import { LoginService } from '../../../services/login/login.service';
import { GenericoService } from 'src/app/services/generico.service';


declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  cargando = true;

  constructor(public router: Router, public _us: UsuarioService, public _vs: VmcaService,
              public _cs: CalendarioService, public _ls: LoginService, public _gs: GenericoService) {
                this._gs.nombre_pagina = 'Administración de Usuarios';
              }

  ngOnInit() {
    this.traer_datos();
  }

  /**
   * Cargar los datos de los usuarios y cambiar la fecha al formato del plugin
   */
  traer_datos() {

    this._us.traer_usuarios().subscribe((resp: any) => {
      this._us.usuarios = resp.Usuarios;
      this._us.usuarios.forEach(e => {
        e.fecha_vinculacion = this._cs.from_DB_to_calendar(e.fecha_vinculacion);
      });
      this.armar_datos(this._us.usuarios);
    });

  }

  /**
   * Crea un arreglo con el formato necesario colocar los datos en el plugin de la tabla
   * @param resp_usuarios Arreglo con la información de los usuarios
   */
  armar_datos(resp_usuarios) {
    const datos_tabla = [];
    let aux_datos = [];

    resp_usuarios.forEach((e: any) => {
      aux_datos.push(`${e.nombres} ${e.apellidos}`);
      aux_datos.push(e.cargo);
      aux_datos.push(e.rol_nombre);
      aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
      datos_tabla.push(aux_datos);
      aux_datos = [];
    });

    this.inicializarTabla(datos_tabla);
    this.cargando = false;

  }

  /**
   * Inicialziar el plugin de la tabla
   * @param datos Arreglo listo en el formato solicitado por el plugin
   */
  inicializarTabla(datos) {
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      language: {
          url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
          search: '_INPUT_',
      },
      responsive: true,
      data: datos,
      columns: ADMIN_USUARIOS
    });

    $('#datatables').on('click', '.detalles', (e) => {
        this.router.navigate([`admin/usuarios/form/detalle/${e.target.value}`]);
    });

  }

}
