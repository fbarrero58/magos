import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[] = [];

  constructor() {
    let usuario = new Usuario('1', 'Andrés Felipe', 'Barrero Chacón', 'felipe.barrero@valormaximo.com',
                              'Consultor SAP Ariba', '16/2/2018', '1');
    this.usuarios.push(usuario);
    usuario = new Usuario('2', 'Carlos Arturo', 'Forero Chacón', 'carlos.forero@valormaximo.com',
                          'Asistente de Gerencia', '16/2/2018', '1');
    this.usuarios.push(usuario);
  }


  traer_usuarios() {
    return this.usuarios;
  }

}
