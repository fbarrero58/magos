import { Component, OnInit } from '@angular/core';
import { CONFIG_HORAS } from '../../constantes/calendarios';
import { CalendarioService } from '../../services/calendario.service';
import { RegistroHora } from '../../classes/registro-hora';

declare var md, $: any;
declare function swal(string): any;

@Component({
  selector: 'app-registro-horas',
  templateUrl: './registro-horas.component.html',
  styles: []
})
export class RegistroHorasComponent implements OnInit {

  fecha_seleccionada = '';
  modo = 'new';
  proyectos = [{valor: '1', nombre: 'Proyecto 1'}, {valor: '2', nombre: 'Proyecto 2'}];
  actividades = [{valor: '1', nombre: 'Actividad 1'}, {valor: '2', nombre: 'Actividad 2'}];
  registro = new RegistroHora(0, '', '', '', '');

  constructor(public _cs: CalendarioService) { }

  ngOnInit() {
      this.inicializar_calendario();
      md.initFormExtendedDatetimepickers();
      $('select').select2();
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

        this.fecha_seleccionada =  this._cs.format_to_yyyy_mm_dd(( this._cs.sumarDias(start._d, 1).toString()).split(' '));
        this.fecha_seleccionada = this._cs.format_to_nice(this.fecha_seleccionada);
        $('#modal_detalle').modal('show');

      },
      events: [{
          title: 'All Day Event',
          allDay: true,
          _id: 'lo que yo quiera',
          start: new Date(y, m, 1),
          className: 'event-green'
        }],
      eventClick: (calEvent) => {
        console.log(calEvent);
      }
    });
  }

  onSubmit(e) {
    const proyecto = $('#proyecto_form');
    const actividad = $('#actividad_form');
    const horas = $('#horas_form');
    if (!proyecto.val() || !actividad.val() || !horas.val()) {
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Parece que aún faltan algunos datos',
      });
    }
    this.registro.actividad = actividad.val();
    this.registro.proyecto = proyecto.val();
    this.registro.horas = horas.val();
    console.log(this.registro);
  }

}
