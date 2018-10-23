import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { InfoPersonalComponent } from './info-personal/info-personal.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        InfoPersonalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: [
        InfoPersonalComponent
    ]
})

export class PerfilModule {}

