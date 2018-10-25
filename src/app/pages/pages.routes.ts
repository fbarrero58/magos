
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { FormUsuariosComponent } from './administracion/usuarios/form-usuarios/form-usuarios.component';
import { SolicitudesComponent } from './administracion/solicitudes/solicitudes.component';
import { ProyectosComponent } from './administracion/proyectos/proyectos.component';
import { EmpresasComponent } from './administracion/empresas/empresas.component';
import { AlianzasComponent } from './administracion/alianzas/alianzas.component';
import { FormEmpresasComponent } from './administracion/empresas/form-empresas/form-empresas.component';
import { FormProyectosComponent } from './administracion/proyectos/form-proyectos/form-proyectos.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { InfoPersonalComponent } from './perfil/info-personal/info-personal.component';
import { GestionDocumentalComponent } from './gestion-documental/gestion-documental.component';
import { CategoriasComponent } from './gestion-documental/categorias/categorias.component';
import { DocumentosComponent } from './gestion-documental/documentos/documentos.component';
import { FormGestionComponent } from './gestion-documental/form-gestion/form-gestion.component';
import { FormCategoriasComponent } from './gestion-documental/categorias/form-categorias/form-categorias.component';
import { FormDocumentosComponent } from './gestion-documental/documentos/form-documentos/form-documentos.component';
import { SolicitudesUsuarioComponent } from './solicitudes-usuario/solicitudes-usuario.component';
import { FormSolicitudesComponent } from './solicitudes-usuario/form-solicitudes/form-solicitudes.component';
import { DetalleSolicitudComponent } from './administracion/solicitudes/detalle-solicitud/detalle-solicitud.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {path: 'main', component: MainComponent},
            {path: 'registro-horas', component: RegistroHorasComponent},
            {path: 'solicitudes', component: SolicitudesUsuarioComponent},
            {path: 'solicitudes/nuevo', component: FormSolicitudesComponent},
            // Gestión Documental
            {path: 'gestion-documental', component: GestionDocumentalComponent},
            {path: 'gestion-documental/nuevo', component: FormGestionComponent},
            {path: 'gestion-documental/editar/:id', component: FormGestionComponent},
            {path: 'gestion-documental/categorias/:tema', component: CategoriasComponent},
            {path: 'gestion-documental/categorias/:tema/nuevo', component: FormCategoriasComponent},
            {path: 'gestion-documental/categorias/:tema/editar', component: FormCategoriasComponent},
            {path: 'gestion-documental/documentos/:tema/:categoria', component: DocumentosComponent},
            {path: 'gestion-documental/documentos/:tema/:categoria/nuevo', component: FormDocumentosComponent},
            {path: 'gestion-documental/documentos/:tema/:categoria/editar', component: FormDocumentosComponent},
            // Perfil
            {path: 'pefil/info-personal', component: InfoPersonalComponent},
            // Administración
            {path: 'admin/usuarios', component: UsuariosComponent},
            {path: 'admin/usuarios/form/:tipo', component: FormUsuariosComponent},
            {path: 'admin/usuarios/form/:tipo/:id', component: FormUsuariosComponent},
            {path: 'admin/solicitudes', component: SolicitudesComponent},
            {path: 'admin/solicitudes/detalle', component: DetalleSolicitudComponent},
            {path: 'admin/proyectos', component: ProyectosComponent},
            {path: 'admin/proyectos/form/:tipo', component: FormProyectosComponent},
            {path: 'admin/proyectos/form/:tipo/:id', component: FormProyectosComponent},
            {path: 'admin/empresas', component: EmpresasComponent},
            {path: 'admin/empresas/form/:tipo', component: FormEmpresasComponent},
            {path: 'admin/empresas/form/:tipo/:id', component: FormEmpresasComponent},
            {path: 'admin/alianzas', component: AlianzasComponent},
            {path: '', redirectTo: '/main', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
