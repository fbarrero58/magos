export class RegistroHora {

    id: number;
    proyecto: string;
    actividad: string;
    horas: string;
    descripcion: string;
    fecha_mostrar: string;
    fecha_db: string;
    servicio: string;
    usuario: string = localStorage.getItem('id_usuario');
    ticket: string;
    nombre_proyecto: string;
    nombre_actividad: string;
    tiene_ticket: string;

    constructor(
        id: number,
        proyecto: string,
        actividad: string,
        horas: string,
        descripcion: string
    ) {
        this.id = id;
        this.proyecto = proyecto;
        this.actividad = actividad;
        this.horas = horas;
        this.descripcion = descripcion;
    }

}
