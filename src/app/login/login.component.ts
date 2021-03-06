import { LoginService } from '../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../classes/login';


declare var $: any;
declare function swal(string): any;
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  myLogin = new Login('', '');
  submitted = false;
  reiniciar_clave = false;

  constructor(
    public _ls: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.checkFullPageBackgroundImage();
  }

  checkFullPageBackgroundImage() {
    const page = $('.full-page');
    const image_src = page.data('image');

    if (image_src !== undefined) {
        const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
        page.append(image_container);
    }

    setTimeout(function() {
      $('.card').removeClass('card-hidden');
    }, 700);

  }

  onSubmit(e) {
    this.submitted = true;
    this._ls.login(this.myLogin).subscribe( (resp: any) => {
      if (resp.err) {
        this.submitted = false;
        return swal({
          type: 'error',
          title: 'Algo va mal...',
          text: resp.mensaje,
        });
      } else if ( resp.setear) {
        localStorage.setItem('id_usuario', resp.id_usuario);
        this.reiniciar_clave = true;
        this.submitted = false;
      } else {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('id_usuario', resp.id_usuario);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this._ls.token = resp.token;
        this._ls.id_usuario = resp.id_usuario;
        this._ls.rol_usuario = resp.usuario.id_rol;
        this._ls.usuario = resp.usuario;
        this.router.navigate(['/']);
      }
    });

  }

  submitPassword() {

    if (this.myLogin.nueva_pass !== this.myLogin.confirm_pass) {
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Las contraseñas deben coincidir',
      });
    }

    this.submitted = true;
    this._ls.reiniciar_pass(this.myLogin).subscribe( (resp: any) => {
      if (resp.err) {
        return swal({
          type: 'error',
          title: 'Algo va mal...',
          text: resp.mensaje,
        });
      }

      localStorage.setItem('token', resp.token);
      localStorage.setItem('id_usuario', resp.id_usuario);
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      this._ls.token = resp.token;
      this._ls.id_usuario = resp.id_usuario;
      this._ls.rol_usuario = resp.usuario.id_rol;
      this._ls.usuario = resp.usuario;
      this.router.navigate(['/']);

    });
  }

}
