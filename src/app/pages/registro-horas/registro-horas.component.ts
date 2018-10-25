import { Component, OnInit } from '@angular/core';
import { CONFIG_HORAS } from '../../constantes/calendarios';

// Clases
import { RegistroHora } from '../../classes/registro-hora';
import { Vmca } from '../../classes/vmca';
import { Proyecto } from '../../classes/proyecto';

// Servicios
import { VmcaService } from '../../services/vmca/vmca.service';
import { HorasService } from '../../services/horas/horas.service';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { CalendarioService } from '../../services/calendario.service';
import { GenericoService } from '../../services/generico.service';

declare var md, $: any;
declare function swal(string): any;

@Component({
  selector: 'app-registro-horas',
  templateUrl: './registro-horas.component.html',
  styles: []
})
export class RegistroHorasComponent implements OnInit {

  fecha_seleccionada = '';
  modo = 'nuevo';
  proyectos: Proyecto[] = [];
  actividades: Vmca[] = [];
  tiene_ticket = false;
  registro = new RegistroHora(0, '', '', '', '');
  cargando = true;
  horas: RegistroHora[];
  primer_llamdo = true;

  constructor(public _cs: CalendarioService, public _ps: ProyectoService, public _vs: VmcaService,
              public _hs: HorasService, public _gs: GenericoService) {

      this._gs.nombre_pagina = 'Registro de Horas';
  }

  ngOnInit() {
      this.traer_datos();
      md.initFormExtendedDatetimepickers();
      $('select').select2();
  }

  traer_datos() {

    // Cargar Proyectos
    if (this.primer_llamdo) {

      this._ps.proyectos_por_usuario(localStorage.getItem('id_usuario')).subscribe((resp: any) => {
        this.proyectos = resp.proyecto;
        this.proyectos.forEach(e => {
          e.nombre = `${e.nombre} - ${e.empresa}`;
        });
      });

      // Listener de cambio de proyecto
      $('#proyecto_form').on('change', (e) => {
        this.cargando = true;
        const proyecto = this.buscar_proyecto(e.target.value);
        this.registro.servicio = proyecto.linea;
        this._vs.traer_actividades(proyecto.tipo).subscribe((resp: any) => {
          this.actividades = resp.actividades;
          this.cargando = false;
        });
        if (proyecto.ticket === 'T') { this.tiene_ticket = true;
        } else { this.tiene_ticket = false; }
      });

    }

    // Cargar las horas
    this._hs.traer_registros(localStorage.getItem('id_usuario')).subscribe((resp: any) => {
      this.horas = resp.horas;
      let obj_aux: any = {};
      const datos_calendario = [];
      this.horas.forEach(e => {
          obj_aux.allDay = true;
          obj_aux.id = e.id;
          obj_aux.className = 'event-red';
          obj_aux.start = this._cs.sumarDias(new Date(e.fecha_db), 1);
          obj_aux.title = e.horas;
          obj_aux.objeto = e;
          datos_calendario.push(obj_aux);
          obj_aux = {};
      });
      this.inicializar_calendario(datos_calendario);
    });

  }

  buscar_proyecto(id) {

    const aux = this.proyectos.filter(e => {
      if (e.id === id) {
        return e;
      }
    });
    return aux[0];
  }

  inicializar_calendario(datos_calendario) {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const calendar = $('#fullCalendar');

    if (!this.primer_llamdo) {
      calendar.fullCalendar('removeEvents');
      calendar.fullCalendar('addEventSource', datos_calendario);
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
      select: (start) => {
        this.modo = 'nuevo';
        this.registro.ticket = '';
        this.registro.descripcion = '';
        this.fecha_seleccionada =  this._cs.format_to_yyyy_mm_dd(( this._cs.sumarDias(start._d, 1).toString()).split(' '));
        this.registro.fecha_db = this.fecha_seleccionada;
        this.fecha_seleccionada = this._cs.format_to_nice(this.fecha_seleccionada);
        $('#horas_form').val('1:00');
        $('#modal_detalle').modal('show');

      },
      events: datos_calendario,
      eventClick: (calEvent) => {
        this.fecha_seleccionada =  this._cs.format_to_yyyy_mm_dd(( this._cs.sumarDias(calEvent.start._d, 1).toString()).split(' '));
        this.fecha_seleccionada = this._cs.format_to_nice(this.fecha_seleccionada);
        this.modo = 'editar';
        this.registro = calEvent.objeto;
        if (this.registro.tiene_ticket === 'T' ) { this.tiene_ticket = true;
        } else { this.tiene_ticket = false; }
        $('#modal_detalle').modal('show');
      }
    });
    this.cargando = false;
    this.primer_llamdo = false;
  }

  onSubmit(e) {
    const proyecto = $('#proyecto_form');
    const actividad = $('#actividad_form');
    const horas = $('#horas_form');
    if (this.modo === 'nuevo') {
      if (!proyecto.val() || !actividad.val() || !horas.val()) {
        return swal({
          type: 'error',
          title: 'Algo va mal...',
          text: 'Parece que aún faltan algunos datos',
        });
      }
    }

    if (!this.registro.ticket && this.tiene_ticket) {
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Este proyecto requiere que se especifique un número de ticket',
      });
    }
    this.cargando = true;
    if (!this.tiene_ticket) {
      this.registro.ticket = '';
    }
    this.registro.actividad = actividad.val();
    this.registro.proyecto = proyecto.val();
    this.registro.horas = horas.val();
    this.registro.usuario = localStorage.getItem('id_usuario');
    if (this.modo === 'nuevo') {
      this._hs.enviar_registro(this.registro).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._hs.actualizar_registro(this.registro.id, this.registro).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    }
  }

  eliminar_registro() {
    this._hs.eliminar_registro(this.registro.id).subscribe(resp => {
      this.respuesta_servicio(resp);
    });
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

}
