import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

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
      viewRender: function(view, element) {
          if (view.name !== 'month') {
              $(element).find('.fc-scroller').perfectScrollbar();
          }
      },
      locale: 'es',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      buttonText: {
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Lista'
      },
      header: {
          left: 'title',
          right: 'prev,next,today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
          month: {
              titleFormat: 'MMMM YYYY'
          },
          week: {
              titleFormat: ' MMMM D YYYY'
          },
          day: {
              titleFormat: 'D MMM, YYYY'
          }
      },


      editable: true,
      eventLimit: true, // allow "more" link when too many events

  });
  }

}
