import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const pagesRoutes: Routes = [
    {
        path: 'admin', 
        component: AdminComponent,
        children: [
            {path: 'usuarios', component: UsuariosComponent},
            {path: '', redirectTo: '/main', pathMatch: 'full'},
        ]
    },
];

export const ADMIN_ROUTES = RouterModule.forChild(pagesRoutes);