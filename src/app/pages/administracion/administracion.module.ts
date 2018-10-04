import { NgModule } from '@angular/core';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminComponent } from './admin.component';
import { ADMIN_ROUTES } from './administracion.routes';


@NgModule({
    declarations: [
        UsuariosComponent, 
        AdminComponent
    ],
    imports: [
        ADMIN_ROUTES
    ],
    exports: [
        AdminComponent,
        UsuariosComponent
    ]
})

export class AdministracionModule {}