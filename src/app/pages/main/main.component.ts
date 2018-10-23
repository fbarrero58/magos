import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioService } from '../../services/usuario.service';
import { CONFIG_HORAS } from '../../constantes/calendarios';
import { CalendarioService } from '../../services/calendario.service';
import { VmcaService } from '../../services/vmca/vmca.service';

// Clases
import { Evento } from '../../classes/evento';

declare var $: any;
declare function swal(string): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

    cargando = true;
    modo_modal = 'nuevo';
    datos_calendario = [];
    fecha_enviar = '';
    fecha_mostrar = '';
    primerLlamado = true;
    evento = new Evento();

  constructor(public _us: UsuarioService, public _cs: CalendarioService, public _vs: VmcaService) { }

  ngOnInit() {
    this.traer_datos();
    $('select').select2();
  }

  traer_datos() {
    if (this._us.cumpleanos.length === 0) {
        this._us.cumpleanos_mes().subscribe((resp: any) => {
            this._us.cumpleanos = resp.Usuarios;
        });
    }

    if (this._vs.eventos.length === 0 || !this.primerLlamado) {
       this._vs.traer_eventos().subscribe((resp: any) => {
            this._vs.eventos = resp.eventos;
            this.armar_datos();
       });
    } else {
        this.armar_datos();
    }
  }

  armar_datos() {
    let obj_aux: any = {};
    this.datos_calendario = [];
    this._vs.eventos.forEach(e => {
        obj_aux.allDay = true;
        obj_aux.className = e.color;
        obj_aux.id = e.id;
        obj_aux.start = this._cs.sumarDias(new Date(e.fecha), 1);
        obj_aux.title = e.titulo;
        this.datos_calendario.push(obj_aux);
        obj_aux = {};
    });
    this.inicializar_calendario();
  }

  onSubmit(e) {
    this.cargando = true;
    const color = $('#color_form').val();
    this.evento.color = color;
    this.evento.fecha = this.fecha_enviar;
    if (this.modo_modal === 'nuevo') {
      this._vs.crear_evento(this.evento).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._vs.eliminar_evento(this.evento).subscribe( resp => {
        this.respuesta_servicio(resp);
      });
    }

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
      if (!resp.err) {
        this.traer_datos();
        $('#modal_detalle').modal('hide');
      }
  }

  inicializar_calendario() {
    const today = new Date();
    const calendar = $('#fullCalendar');
    if (!this.primerLlamado) {
      calendar.fullCalendar('removeEvents');
      calendar.fullCalendar('addEventSource', this.datos_calendario);
      calendar.fullCalendar('refetchEvents');
    }

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
        events: this.datos_calendario,
        select: (start) => {
            this.modo_modal = 'nuevo';
            this.fecha_enviar =  this._cs.format_to_yyyy_mm_dd(( this._cs.sumarDias(start._d, 1).toString()).split(' '));
            this.fecha_mostrar =  this._cs.format_to_nice(this.fecha_enviar);

            $('#modal_detalle').modal('show');

        },
        eventClick: (calEvent) => {
          this.modo_modal = 'detalle';
          this.evento.id = calEvent.id;
          this.evento.titulo = calEvent.title;
          $('#modal_detalle').modal('show');
        }
    });
    this.primerLlamado = false;
    this.cargando = false;
  }
}
