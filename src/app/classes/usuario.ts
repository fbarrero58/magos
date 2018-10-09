export class Usuario {

    id: string;
    nombres: string;
    apellidos: string;
    correo: string;
    cargo: string;
    fecha_vinculacion: string;
    rol: string;
    rol_nombre: string;
    estado: string;

    constructor( id: string, nombres: string, apellidos: string, cargo: string, rol: string,
                rol_nombre ?: string, fecha_vinculacion?: string, correo?: string, estado?: string) {

        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.cargo = cargo;
        this.fecha_vinculacion = fecha_vinculacion;
        this.rol = rol;
        this.id = id;
        this.rol_nombre = rol_nombre;
        this.estado = estado;
    }
}
