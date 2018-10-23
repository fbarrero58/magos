import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styles: []
})
export class CargandoComponent implements OnInit {

  @Input() mostrar = true;

  constructor() { }

  ngOnInit() {
  }

}
