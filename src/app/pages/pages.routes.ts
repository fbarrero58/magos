
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
import { PropuestasComponent } from './propuestas/propuestas.component';
import { AdminComponent } from './administracion/admin.component';
import { FormPropuestasComponent } from './propuestas/form-propuestas/form-propuestas.component';
import { CondicionesComponent } from './propuestas/condiciones/condiciones.component';
import { FormCondicionesComponent } from './propuestas/condiciones/form-condiciones/form-condiciones.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { GerenteGuard } from '../services/guards/gerente.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {path: 'main', component: MainComponent},
            {path: 'registro-horas', component: RegistroHorasComponent},
            {path: 'solicitudes', component: SolicitudesUsuarioComponent},
            {path: 'solicitudes/:tipo', component: FormSolicitudesComponent},
            {path: 'propuestas', canActivate: [ AdminGuard ], component: PropuestasComponent},
            {path: 'propuestas/condiciones', canActivate: [ AdminGuard ], component: CondicionesComponent},
            {path: 'propuestas/condiciones/:tipo', canActivate: [ AdminGuard ], component: FormCondicionesComponent},
            {path: 'propuestas/:tipo', canActivate: [ AdminGuard ], component: FormPropuestasComponent},
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
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [ AdminGuard ],
                children: [
                    {path: 'usuarios', component: UsuariosComponent},
                    {path: 'usuarios/form/:tipo', canActivate: [ GerenteGuard ], component: FormUsuariosComponent},
                    {path: 'usuarios/form/:tipo/:id', component: FormUsuariosComponent},
                    {path: 'solicitudes', component: SolicitudesComponent},
                    {path: 'solicitudes/detalle', component: DetalleSolicitudComponent},
                    {path: 'proyectos', component: ProyectosComponent},
                    {path: 'proyectos/form/:tipo', component: FormProyectosComponent},
                    {path: 'proyectos/form/:tipo/:id', component: FormProyectosComponent},
                    {path: 'empresas', component: EmpresasComponent},
                    {path: 'empresas/form/:tipo', component: FormEmpresasComponent},
                    {path: 'empresas/form/:tipo/:id', component: FormEmpresasComponent},
                    {path: 'alianzas', component: AlianzasComponent},
                ]
            },
            {path: '', redirectTo: '/main', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
