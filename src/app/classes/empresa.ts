export class Empresa {

    id: string;
    tipo: string;
    codigo: string;
    nombre: string;
    habilitado?: string;
    nombre_tipo?: string;

    constructor(id: string,
        tipo: string,
        codigo: string,
        nombre: string,
        habilitado?: string
    ) {
        this.id = id;
        this.tipo = tipo;
        this.codigo = codigo;
        this.nombre = nombre;
        this.habilitado = habilitado;
    }
}
