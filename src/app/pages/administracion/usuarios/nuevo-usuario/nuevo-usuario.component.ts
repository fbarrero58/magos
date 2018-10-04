import { Component, OnInit } from '@angular/core';
declare var md, $: any;

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: []
})
export class NuevoUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    $('select').select2();
  }

}
