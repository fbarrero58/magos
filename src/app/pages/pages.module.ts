import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';



@NgModule({
    declarations: [
        PagesComponent,
        MainComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ],
    exports: [
        PagesComponent,
        MainComponent
    ]
})

export class PagesModule {}