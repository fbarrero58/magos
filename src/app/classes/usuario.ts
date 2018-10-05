export class Usuario {

    id: string;
    nombres: string;
    apellidos: string;
    correo: string;
    cargo: string;
    fecha_vinculacion: string;
    rol: string;

    constructor( id: string, nombres: string, apellidos: string, correo: string, cargo: string,
                fecha_vinculacion: string, rol: string) {

        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.cargo = cargo;
        this.fecha_vinculacion = fecha_vinculacion;
        this.rol = rol;
        this.id = id;
    }
}
