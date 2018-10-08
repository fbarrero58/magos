import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../classes/usuario';
import { ADMIN_USUARIOS } from '../../../constantes/tablas';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando = true;

  constructor(public router: Router, public _us: UsuarioService) {

  }

  ngOnInit() {
    this.armar_datos();
  }

  armar_datos() {
    const datos_tabla = [];
    let aux_datos = [];
    this._us.traer_usuarios().subscribe((resp: any) => {

      resp.Usuarios.forEach(e => {
        const usuario = new Usuario(e.id, e.nombres, e.apellidos, e.cargo, '1');
        this.usuarios.push(usuario);
      });

      this.usuarios.forEach((e: any) => {
        aux_datos.push(`${e.nombres} ${e.apellidos}`);
        aux_datos.push(e.cargo);
        aux_datos.push(e.rol);
        aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver detalles</button>`);
        datos_tabla.push(aux_datos);
        aux_datos = [];
      });

      this.inicializarTabla(datos_tabla);
      this.cargando = false;
    });


  }

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
