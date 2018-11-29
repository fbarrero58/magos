import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _ls: LoginService ) { }

  nombre = '';
  foto = '';

  ngOnInit() {
    this.nombre = this._ls.usuario.nombres;
    this.foto = `assets/img/faces/${this._ls.usuario.foto}`;
  }

}
