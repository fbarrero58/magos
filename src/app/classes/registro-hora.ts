export class RegistroHora {

    id: number;
    proyecto: string;
    actividad: string;
    horas: string;
    descripcion: string;

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
