export class Proyecto {

    id: string;
    nombre: string;
    codigo: string;
    inicio: string;
    inicio_app: string;
    fin_app: string;
    fin: string;
    empresa: string;
    tipo: string;
    linea: string;
    estado: string;
    alianza: string;
    habilitado: string;
    ticket: string;
    horas: number;
    facturable: string;
    nombre_empresa: string;

    constructor(
        id: string,
        nombre: string,
        codigo: string,
        inicio: string,
        fin: string,
        empresa: string,
        tipo: string,
        linea: string,
        estado: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.inicio = inicio;
        this.fin = fin;
        this.empresa = empresa;
        this.tipo = tipo;
        this.linea = linea;
        this.estado = estado;
    }

}
