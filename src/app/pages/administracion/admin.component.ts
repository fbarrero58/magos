import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      $('#colapse_administracion').collapse();
    }, 1000);
  }

}
