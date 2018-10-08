export class Proyecto {

    nombre: string;
    codigo: string;
    inicio: string;
    fin: string;
    cliente: string;
    tipo: string;
    linea: string;
    estado: string;

    constructor(
        nombre: string,
        codigo: string,
        inicio: string,
        fin: string,
        cliente: string,
        tipo: string,
        linea: string,
        estado: string
    ) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.inicio = inicio;
        this.fin = fin;
        this.cliente = cliente;
        this.tipo = tipo;
        this.linea = linea;
        this.estado = estado;
    }

}
