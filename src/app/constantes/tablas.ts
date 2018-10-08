export const ADMIN_SOLICITUDES = [{
    id: 'pendientes',
    id_tabla: 'tabla_pendientes',
    datos: [],
    columnas: [{ title: 'Solicitante' }, { title: 'Tipo de Solicitud' },
                { title: 'Solicitada el' }, { title: 'Acciones' }]
}, {
    id: 'permisos',
    id_tabla: 'tabla_permisos',
    datos: [],
    columnas: [{ title: 'Solicitante' }, { title: 'Aprobador' }, { title: 'Estado' }, { title: 'Fecha' },
                { title: 'Horas' }, { title: 'Acciones' }]
}, {
    id: 'vacaciones',
    id_tabla: 'tabla_vacaciones',
    datos: [],
    columnas: [{ title: 'Solicitante' }, { title: 'Aprobador' }, { title: 'Estado' }, { title: 'Desde' },
                { title: 'Hasta' }, { title: 'Acciones' }]
}, {
    id: 'otros',
    id_tabla: 'tabla_otros',
    datos: [],
    columnas: [{ title: 'Solicitante' }, { title: 'Aprobador' }, { title: 'Estado' }, { title: 'Fecha' },
                { title: 'Motivo' }, { title: 'Acciones' }]
}];

export const ADMIN_EMPRESAS = [
    { title: 'Empresa' },
    { title: 'Código' },
    { title: 'Tipo' },
    { title: 'Acciones' },
];

export const ADMIN_ALIANZAS = [
    { title: 'Alianza' },
    { title: 'Condición de Pago' }
];

export const ADMIN_PROYECTOS = [
    { title: 'Proyecto' },
    { title: 'Código' },
    { title: 'Cliente' },
    { title: 'Acciones' },
];

export const ADMIN_USUARIOS = [
    { title: 'Nombre' },
    { title: 'Cargo' },
    { title: 'Rol' },
    { title: 'Acciones' },
];
