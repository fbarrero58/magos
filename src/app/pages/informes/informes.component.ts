// Configuraciones
import { Component, OnInit } from '@angular/core';
import { PATH_HERRAMIENTAS } from '../../constantes/config';
import { HttpClient } from '@angular/common/http';

// Clases
import { Vmca } from '../../classes/vmca';
import { Usuario } from 'src/app/classes/usuario';

// Servicios
import { CalendarioService } from '../../services/calendario.service';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { VmcaService } from 'src/app/services/vmca/vmca.service';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { UsuarioService } from '../../services/usuario.service';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';
import { GenericoService } from 'src/app/services/generico.service';

declare var $, md: any;

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styles: []
})
export class InformesComponent implements OnInit {

  url: string;
  // Horas
  proyectos: Vmca[] = [];
  consultores: Usuario[] = [];

  // Proyectos
  clientes: Vmca[] = [];
  servicios: Vmca[] = [];
  estados: Vmca[] = [];

  // Solicitudes
  tipos_solicitud: Vmca[] = [];

  constructor(public http: HttpClient, public _ps: ProyectoService, public _us: UsuarioService,
              public _cs: CalendarioService, public _es: EmpresaService, public _vs: VmcaService,
              public _ss: SolicitudesService, public _gs: GenericoService) {
                this._gs.nombre_pagina = 'Informes';
              }

  ngOnInit() {
    md.initFormExtendedDatetimepickers();
    $('select').select2();
    this.traer_datos_horas();
    this.traer_datos_proyectos();
    this.traer_datos_solicitudes();
  }

  traer_datos_horas() {
    this._ps.traer_proyectos().subscribe((resp: any) => {
      this.proyectos = resp.proyectos;
    });
    this._us.traer_usuarios().subscribe((resp: any) => {
      this.consultores = resp.Usuarios;
    });
  }

  traer_datos_proyectos() {
    this._es.traer_empresas().subscribe((resp: any) => {
      this.clientes = resp.empresas;
    });
    this._vs.traer_tipos_servicio().subscribe((resp: any) => {
      this.servicios = resp.servicios;
    });
    this._vs.traer_estados_proyectos().subscribe((resp: any) => {
      this.estados = resp.estados;
    });
  }

  traer_datos_solicitudes() {
    this.tipos_solicitud = this._vs.tipos_solicitudes;
  }

  reiniciar_url(path) {
    this.url = `${PATH_HERRAMIENTAS}${path}/`;
  }

  onSubmit(e) {
    this.reiniciar_url('informe_horas');
    const proyectos = $('#horas_proyectos').val();
    const consultores = $('#horas_consultores').val();
    const desde = this._cs.from_calendar_to_DB($('#horas_desde').val());
    const hasta = this._cs.from_calendar_to_DB($('#horas_hasta').val());

    this.url = `${this.url}?proyectos=${proyectos}&consultores=${consultores}&desde=${desde}&hasta=${hasta}`;
    window.open(this.url, '_blank');
  }

  onSubmitProyectos() {
    this.reiniciar_url('informe_proyectos');
    const clientes = $('#proyectos_clientes').val();
    const servicios = $('#proyectos_servicios').val();
    const estado = $('#proyectos_estados').val();

    this.url = `${this.url}?clientes=${clientes}&servicios=${servicios}&estados=${estado}`;
    window.open(this.url, '_blank');
  }

  onSubmitSolicitudes() {
    this.reiniciar_url('informe_solicitudes');
  }

}
