import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

// Paginas
import { MainComponent } from './main/main.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { AdminModule } from './administracion/admin.module';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RegistroHorasComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdminModule,
        PAGES_ROUTES
    ],
    exports: [
        PagesComponent,
        MainComponent,
        RegistroHorasComponent
    ]
})

export class PagesModule {}
