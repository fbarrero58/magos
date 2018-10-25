export class Solicitud {
  [x: string]: any;

    id: string;
    tipo_solicitud: string;
    estado: string;
    fecha_solicitud: string;
    aprobador: string;
    nombre_aprobador: string;
    solicitante: string;
    nombre_solicitante: string;

    // Permiso
    fecha_permiso: string;
    fecha_permiso_db: string;
    horas_permiso: string;
    descripcion: string;

    // Vacaciones
    desde: string;
    desde_db: string;
    hasta: string;
    hasta_db: string;
    dias_habiles: string;

    // Otros
    motivo: string;
    fecha_otros: string;
    fecha_otros_db: string;

    constructor() {}

}
