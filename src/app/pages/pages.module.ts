import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes de Paginas
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { AdminModule } from './administracion/admin.module';
import { PerfilModule } from './perfil/perfil.module';
import { PipesModule } from '../pipes/pipes.module';
import { GestionDocumentalComponent } from './gestion-documental/gestion-documental.component';
import { CategoriasComponent } from './gestion-documental/categorias/categorias.component';
import { DocumentosComponent } from './gestion-documental/documentos/documentos.component';
import { FormGestionComponent } from './gestion-documental/form-gestion/form-gestion.component';
import { FormCategoriasComponent } from './gestion-documental/categorias/form-categorias/form-categorias.component';
import { FormDocumentosComponent } from './gestion-documental/documentos/form-documentos/form-documentos.component';
import { SolicitudesUsuarioComponent } from './solicitudes-usuario/solicitudes-usuario.component';
import { FormSolicitudesComponent } from './solicitudes-usuario/form-solicitudes/form-solicitudes.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { FormPropuestasComponent } from './propuestas/form-propuestas/form-propuestas.component';
import { CondicionesComponent } from './propuestas/condiciones/condiciones.component';
import { FormCondicionesComponent } from './propuestas/condiciones/form-condiciones/form-condiciones.component';
import { InformesComponent } from './informes/informes.component';

@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RegistroHorasComponent,
        GestionDocumentalComponent,
        CategoriasComponent,
        DocumentosComponent,
        FormGestionComponent,
        FormCategoriasComponent,
        FormDocumentosComponent,
        SolicitudesUsuarioComponent,
        FormSolicitudesComponent,
        PropuestasComponent,
        FormPropuestasComponent,
        CondicionesComponent,
        FormCondicionesComponent,
        InformesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        AdminModule,
        PerfilModule,
        PAGES_ROUTES,
        PipesModule
    ],
    exports: [
        PagesComponent,
        MainComponent,
        RegistroHorasComponent
    ]
})

export class PagesModule {}
