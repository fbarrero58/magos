import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        LoadingComponent
    ],
    imports: [
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]
})

export class SharedModule {}
