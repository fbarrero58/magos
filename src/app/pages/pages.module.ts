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



@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RegistroHorasComponent
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
