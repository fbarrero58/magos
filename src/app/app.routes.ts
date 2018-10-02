import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children: [
            {path: 'main', component: MainComponent},
            {path: '', redirectTo: '/main', pathMatch: 'full'},
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '/main', pathMatch: 'full'},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash:true });