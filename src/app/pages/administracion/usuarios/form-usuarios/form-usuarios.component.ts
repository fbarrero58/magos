import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servicios
import { VmcaService } from '../../../../services/vmca/vmca.service';
import { UsuarioService } from '../../../../services/usuario.service';

// Clases
import { Usuario } from '../../../../classes/usuario';
import { Vmca } from '../../../../classes/vmca';

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
  roles: Vmca[] = [];

  constructor(public router: Router, public activeRoute: ActivatedRoute, public _vs: VmcaService,
              public _us: UsuarioService) {

    if (this._us.usuarios.length === 0) {
      this.router.navigate(['/admin/usuarios']);
    }

    this.activeRoute.params.subscribe(params => {
      this.tipo_form = params['tipo'];
      if (this.tipo_form === 'detalle') {
        this.id_form = params['id'];
        this._us.usuarios.filter( (e) => {
          if (e.id === this.id_form) {
            this.usuario = e;
          }
        });
      }
    });

  }

  ngOnInit() {
    this.cargar_vmca();
    md.initFormExtendedDatetimepickers();
    $('select').select2();
  }

  cargar_vmca() {
    if (this._vs.roles.length > 0) {
      this.roles = this._vs.roles;
    } else {
      this._vs.traer_roles().subscribe((resp: any) => {
        this.roles = resp.roles;
      });
    }
  }

  onSubmit(e) {
    this.cargando = true;
    const fecha = $('#fecha_nuevo_usuario');
    const rol = $('#rol_nuevo_usuario');
    const estado = $('#estado_nuevo_usuario');
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
    this.usuario.estado = estado.val();
    if (this.tipo_form === 'nuevo') {
      this.crear_usuario();
    } else {
      this.modificar_usuario();
    }

  }

  crear_usuario() {
    this._us.crear_usuario(this.usuario).subscribe((resp: any) => {
      this.respuesta_servicio(resp);
    });
  }

  modificar_usuario() {
    this._us.modificar_usuario(this.usuario, 'administrador').subscribe((resp: any) => {
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
