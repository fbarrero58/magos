import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

// Componentes
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from './loading/loading.component';
import { CargandoComponent } from './cargando/cargando.component';
import { TablaComponent } from './tabla/tabla.component';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        LoadingComponent,
        CargandoComponent,
        TablaComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        CargandoComponent,
        TablaComponent
    ]
})

export class SharedModule {}
