import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

// Servicios
import { CalendarioService } from './calendario.service';
import { UsuarioService } from './usuario.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginService } from './login/login.service';
import { LogueadoGuard } from './guards/logueado.guard';
import { VmcaService } from './vmca/vmca.service';
import { EmpresaService } from './empresa/empresa.service';
import { AlianzaService } from './alianza/alianza.service';
import { ProyectoService } from './proyecto/proyecto.service';
import { HorasService } from './horas/horas.service';
import { DocumentosService } from './documentos/documentos.service';
import { GenericoService } from './generico.service';
import { SolicitudesService } from './solicitudes/solicitudes.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        CalendarioService,
        UsuarioService,
        VmcaService,
        LoginGuardGuard,
        LogueadoGuard,
        LoginService,
        EmpresaService,
        AlianzaService,
        ProyectoService,
        HorasService,
        DocumentosService,
        GenericoService,
        SolicitudesService
    ]
})

export class ServiceModule {}
