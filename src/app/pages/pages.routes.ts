import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './administracion/admin.component';

const pagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children: [
            {path: 'main', component: MainComponent},
            {path: '', redirectTo: '/main', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);