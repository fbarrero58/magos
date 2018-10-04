import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario/nuevo-usuario.component';


@NgModule({
    declarations: [
        UsuariosComponent,
        NuevoUsuarioComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        UsuariosComponent,
        NuevoUsuarioComponent
    ]
})

export class AdminModule {}
