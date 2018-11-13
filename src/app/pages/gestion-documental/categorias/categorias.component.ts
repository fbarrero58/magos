// Configuracion
import { ActivatedRoute, Router } from '@angular/router/';
import { Component, OnInit } from '@angular/core';

// Servicios
import { DocumentosService } from '../../../services/documentos/documentos.service';
import { GenericoService } from '../../../services/generico.service';
import { LoginService } from 'src/app/services/login/login.service';

// Clases
import { Temas } from '../../../classes/temas';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  id_tema;
  titulo = 'Gestión de Categorias';
  columnas = [
    { title: 'Categoria' },
    { title: 'Descripción' },
    { title: 'Documentos' },
    { title: 'Acciones' },
  ];
  datos = [];
  categorias: Temas[];
  cargando = true;


  constructor(public activatedRoute: ActivatedRoute, public _ds: DocumentosService, public router: Router,
              public _gs: GenericoService, public _ls: LoginService) {
    if (!this._ds.tema_seleccionado) {
      this.router.navigate(['/gestion-documental']);
    } else {
      this.titulo = `Categorias para ${this._ds.tema_seleccionado.nombre}`;
      this._gs.nombre_pagina = 'Categorias de ' + this._ds.tema_seleccionado.nombre;
    }
  }

  ngOnInit() {

    if (this._ls.rol_usuario === '3') {
      this.columnas.splice(-1, 1);
    }

    this.activatedRoute.params.subscribe(resp => {
      this.id_tema = resp['tema'];
      this.cargar_datos();
    });

  }

  cargar_datos() {
    this._ds.traer_categorias(this.id_tema).subscribe((resp: any) => {
      this.categorias = resp.categorias;
      let aux_datos = [];
      const datos_tabla = [];
      this.categorias.forEach(e => {
        aux_datos.push(e.nombre);
        aux_datos.push(e.descripcion);
        aux_datos.push(`<button value="${e.id}" class="btn btn-primary btn-sm btn-link detalles">Ver Documentos</button>`);
        if (this._ls.rol_usuario !== '3') {
          aux_datos.push(`<button value="${e.id}" class="btn btn-warning btn-sm btn-link editar">Editar</div></button>`);
        }
        datos_tabla.push(aux_datos);
        aux_datos = [];
      });
      this.datos = datos_tabla;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });
  }

  direccionar_nuevo_editar(tipo, evento = '') {
    if (tipo === 'nuevo') {
      this.router.navigate([`/gestion-documental/categorias/${this.id_tema}/nuevo`]);
    } else {
      this.router.navigate([`/gestion-documental/categorias/${this.id_tema}/editar/`]);
    }
  }

  recibir_redireccion(event) {

    this.categorias.filter( (categoria) => {
      if (categoria.id === event) {
        this._ds.categoria_seleccionada = categoria;
      }
    });

    this.router.navigate([`/gestion-documental/documentos/${this.id_tema}/${event}`]);
  }

  edicion_redireccion(evento) {
    this.categorias.filter( (categoria) => {
      if (categoria.id === evento) {
        this._ds.categoria_seleccionada = categoria;
      }
    });
    this.direccionar_nuevo_editar('editar', evento);
  }

}
