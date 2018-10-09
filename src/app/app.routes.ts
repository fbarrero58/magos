import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogueadoGuard } from './services/guards/logueado.guard';


const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [ LogueadoGuard ]},
    {path: '**', redirectTo: '/main', pathMatch: 'full'},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
