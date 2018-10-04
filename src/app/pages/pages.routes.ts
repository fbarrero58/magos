
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './administracion/usuarios/nuevo-usuario/nuevo-usuario.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'main', component: MainComponent},
            {path: 'registro-horas', component: RegistroHorasComponent},
            // Administración
            {path: 'admin/usuarios', component: UsuariosComponent},
            {path: 'admin/usuarios/nuevo', component: NuevoUsuarioComponent},
            {path: '', redirectTo: '/admin', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
