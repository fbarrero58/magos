export class Temas {

    id: string;
    nombre: string;
    descripcion: string;
    link: string;
    habilitado: string;
    ref_padre?: number;
    url?: string;

    constructor(habilitado: string) {
        this.habilitado = habilitado;
    }
}
