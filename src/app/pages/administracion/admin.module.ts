import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormUsuariosComponent } from './usuarios/form-usuarios/form-usuarios.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AlianzasComponent } from './alianzas/alianzas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { FormEmpresasComponent } from './empresas/form-empresas/form-empresas.component';
import { FormProyectosComponent } from './proyectos/form-proyectos/form-proyectos.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        UsuariosComponent,
        FormUsuariosComponent,
        SolicitudesComponent,
        AlianzasComponent,
        EmpresasComponent,
        ProyectosComponent,
        FormEmpresasComponent,
        FormProyectosComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: [
        UsuariosComponent
    ]
})

export class AdminModule {}
