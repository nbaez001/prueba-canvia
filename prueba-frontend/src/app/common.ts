export const LISTA_FUNCIONALIDAD: any[] = [
    {
        referencia: '/intranet/cliente',
        titulo: 'Clientes',
        selected: false
    },
    {
        referencia: '/intranet/factura',
        titulo: 'Facturas',
        selected: false
    }
];

export const ACTIVO_LISTA: any[] = [{ id: 1, nombre: 'ACTIVO' }, { id: 0, nombre: 'INACTIVO' }];

export const CONSTANTES = {
    FLG_ACTIVO: 1,
    FLG_INACTIVO: 0,
    R_COD_EXITO: 0,

    PERFIL_OMEP: 'OMEP',

    COD_CONFIRMADO: 1,
    COD_NO_CONFIRMADO: 0,
};

export const MENSAJES_PANEL = {
    INTRANET: {
        MANTENIMIENTO: {
            CLIENTE: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR CLIENTE'
                },
                MODIFICAR: {
                    TITLE: 'MODIFICAR CLIENTE'
                }
            },
            FACTURA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR FACTURA'
                },
                MODIFICAR: {
                    TITLE: 'MODIFICAR FACTURA'
                }
            }
        }
    }
};

export const MENSAJES = {
    EXITO_OPERACION: 'Operacion exitosa',
    MSG_EXITO_OPERACION: 'Operacion exitosa',
    MSG_CONFIRMACION: '¿Esta seguro de continuar?',
    MSG_CONFIRMACION_DELETE: '¿Esta seguro que desea eliminar el registro seleccionado?',
};

export const TABLA_MAESTRA = {
    TIPO_DOCUMENTO: 106
}