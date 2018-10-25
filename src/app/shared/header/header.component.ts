
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { GenericoService } from '../../services/generico.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( public _ls: LoginService, public _gs: GenericoService ) { }

  ngOnInit() {
  }

}
