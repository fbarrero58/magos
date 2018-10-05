
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

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'main', component: MainComponent},
            {path: 'registro-horas', component: RegistroHorasComponent},
            // Administración
            {path: 'admin/usuarios', component: UsuariosComponent},
            {path: 'admin/usuarios/form/:tipo', component: FormUsuariosComponent},
            {path: 'admin/usuarios/form/:tipo/:id', component: FormUsuariosComponent},
            {path: 'admin/solicitudes', component: SolicitudesComponent},
            {path: 'admin/proyectos', component: ProyectosComponent},
            {path: 'admin/empresas', component: EmpresasComponent},
            {path: 'admin/empresas/form/:tipo', component: FormEmpresasComponent},
            {path: 'admin/alianzas', component: AlianzasComponent},
            {path: '', redirectTo: '/main', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
