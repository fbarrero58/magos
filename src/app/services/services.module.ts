import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

// Servicios
import { CalendarioService } from './calendario.service';
import { UsuarioService } from './usuario.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginService } from './login/login.service';





@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        CalendarioService,
        UsuarioService,
        LoginGuardGuard,
        LoginService
    ]
})

export class ServiceModule {}
