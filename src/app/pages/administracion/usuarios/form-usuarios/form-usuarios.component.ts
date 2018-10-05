import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../../classes/usuario';
declare var md, $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styles: []
})
export class FormUsuariosComponent implements OnInit {

  tipo_form = '';
  id_form = '';
  cargando = false;

  usuario = new Usuario('', '', '', '', '', '', '');
  roles = [{valor: '1', nombre: 'Administrador'}, {valor: '2', nombre: 'Lider de linea'}];

  constructor(public router: Router, public activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.tipo_form = params['tipo'];
      if (this.tipo_form === 'detalle') {
        this.id_form = params['id'];
        // TODO: Aca se debería traer el usuario con el id_form
      }
    });
  }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    $('select').select2();
  }

  onSubmit() {
    this.cargando = true;
    const fecha = $('#fecha_nuevo_usuario');
    const rol = $('#rol_nuevo_usuario');
    if (!fecha.val() || !rol.val()) {
      this.cargando = false;
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Parece que aún faltan algunos datos',
      });
    }
    this.usuario.fecha_vinculacion = fecha.val();
    this.usuario.rol = rol.val();
    this.cargando = false;
    console.log(this.usuario);
  }

}
