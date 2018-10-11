import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { InfoPersonalComponent } from './info-personal/info-personal.component';



@NgModule({
    declarations: [
        InfoPersonalComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InfoPersonalComponent
    ]
})

export class PerfilModule {}

