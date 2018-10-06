import { Component, OnInit } from '@angular/core';
import { CONFIG_HORAS } from '../../constantes/calendarios';
import { CalendarioService } from '../../services/calendario.service';

declare var $: any;

@Component({
  selector: 'app-registro-horas',
  templateUrl: './registro-horas.component.html',
  styles: []
})
export class RegistroHorasComponent implements OnInit {

  fecha_seleccionada = '';

  constructor(public _cs: CalendarioService) { }

  ngOnInit() {
      this.inicializar_calendario();
  }

  inicializar_calendario() {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const calendar = $('#fullCalendar');
    calendar.fullCalendar({
      viewRender: CONFIG_HORAS.viewRender,
      locale: 'es',
      monthNames: CONFIG_HORAS.monthNames,
      monthNamesShort: CONFIG_HORAS.monthNamesShort,
      dayNames: CONFIG_HORAS.dayNames,
      dayNamesShort: CONFIG_HORAS.dayNamesShort,
      buttonText: CONFIG_HORAS.buttonText,
      header: CONFIG_HORAS.header,
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: CONFIG_HORAS.views,
      editable: true,
      eventLimit: true,
      select: (start, end) => {
        
        this.fecha_seleccionada =  this._cs.format_to_yyyy_mm_dd(( this._cs.sumarDias(start._d,1).toString()).split(" "));
        this.fecha_seleccionada = this._cs.format_to_nice(this.fecha_seleccionada);
        $('#exampleModal').modal('show');
        
      },
    });
  }

}
