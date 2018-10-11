// Configuracion
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Clases
import { Proyecto } from '../../../../classes/proyecto';
import { Vmca } from '../../../../classes/vmca';
import { Alianza } from '../../../../classes/alianza';

// Servicios
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { VmcaService } from '../../../../services/vmca/vmca.service';
import { AlianzaService } from '../../../../services/alianza/alianza.service';
import { ProyectoService } from '../../../../services/proyecto/proyecto.service';

declare var md, $: any;
declare function swal(string): any;

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styles: []
})
export class FormProyectosComponent implements OnInit {

  proyecto = new Proyecto('', '', '', '', '', '', '', '', '');
  cargando = true;
  empresas = [];
  tipos: Vmca[] = [];
  lineas = [];
  estados = [];
  alianzas: Alianza[] = [];

  tipo_form = '';
  id_form = '';

  constructor(public router: Router, public _es: EmpresaService, public _vs: VmcaService,
              public _as: AlianzaService, public _ps: ProyectoService, public activeRoute: ActivatedRoute) {

        if (this._ps.proyectos.length === 0) {
          this.router.navigate(['/admin/proyectos']);
        }

        this.activeRoute.params.subscribe(params => {
          this.tipo_form = params['tipo'];
          if (this.tipo_form === 'detalle') {
            this.id_form = params['id'];
            this._ps.proyectos.filter( (e) => {
              if (e.id === this.id_form) {
                this.proyecto = e;
              }
            });
          }
        });

  }

  ngOnInit() {
    this.cargar_datos();
    md.initFormExtendedDatetimepickers();
    $('select').select2();
  }

  cargar_datos() {
    // Cargar Clientes
    if (this._es.empresas.length === 0) {
      this._es.traer_empresas().subscribe((resp: any) => {
        this._es.empresas = resp.empresas;
        this.empresas = this._es.empresas;
      });
    } else { this.empresas = this._es.empresas; }

    // Cargar Alianzas
    if (this._as.alianzas.length === 0) {
      this._as.traer_alianzas().subscribe((resp: any) => {
        this._as.alianzas = resp.alianzas;
        this.alianzas = this._as.alianzas;
      });
    } else { this.alianzas = this._as.alianzas; }

    // Cargar Tipos de servicio
    if (this._vs.tipos_servicio.length === 0) {
      this._vs.traer_tipos_servicio().subscribe((resp: any) => {
        this._vs.tipos_servicio = resp.servicios;
        this.tipos = this._vs.tipos_servicio;
      });
    } else { this.tipos = this._vs.tipos_servicio; }

    // Cargar Lineas de servicio
    if (this._vs.lineas_servicio.length === 0) {
      this._vs.traer_lineas_servicio().subscribe((resp: any) => {
        this._vs.lineas_servicio = resp.lineas;
        this.lineas = this._vs.lineas_servicio;
      });
    } else { this.lineas = this._vs.lineas_servicio; }

    // Cargar Estados Comerciales
    if (this._vs.estados_comerciales.length === 0) {
      this._vs.traer_estados_comerciales().subscribe((resp: any) => {
        this._vs.estados_comerciales = resp.estados;
        this.estados = this._vs.estados_comerciales;
        this.cargando = false;
      });
    } else { this.estados = this._vs.estados_comerciales; this.cargando = false; }

  }

  onSubmit(e) {
    const empresa = $('#form_cliente');
    const estado = $('#form_estado');
    const fin = $('#form_fin');
    const inicio = $('#form_inicio');
    const linea = $('#form_linea');
    const tipo = $('#form_tipo');
    const alianza = $('#form_alianza');
    const habilitado = $('#form_habilitado');
    const ticket = $('#form_ticket');
    const facturable = $('#form_facturable');

    if (!empresa.val() || !estado.val() || !fin.val() || !inicio.val() || !linea.val() || !tipo.val()
        || !alianza.val() || !habilitado.val() || !ticket.val() || !facturable.val()) {
      this.cargando = false;
      return swal({
        type: 'error',
        title: 'Algo va mal...',
        text: 'Todos los campos con * deben ser especificados',
      });
    }

    this.cargando = true;

    if (!this.proyecto.horas) {
      this.proyecto.horas = 0;
    }

    this.proyecto.empresa = $('#form_cliente').val();
    this.proyecto.estado = $('#form_estado').val();
    this.proyecto.fin = $('#form_fin').val();
    this.proyecto.inicio = $('#form_inicio').val();
    this.proyecto.linea = $('#form_linea').val();
    this.proyecto.tipo = $('#form_tipo').val();
    this.proyecto.alianza = $('#form_alianza').val();
    this.proyecto.habilitado = $('#form_habilitado').val();
    this.proyecto.ticket = $('#form_ticket').val();
    this.proyecto.facturable = $('#form_facturable').val();

    if (this.tipo_form === 'detalle') {
      this._ps.modificar_proyecto(this.proyecto).subscribe(resp => {
        this.respuesta_servicio(resp);
      });
    } else {
      this._ps.crear_proyecto(this.proyecto).subscribe(resp => {
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
  }

}
