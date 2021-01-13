import { Sequelize } from './sequelize';

export class Arriendo extends Sequelize {
    id_arriendo: number;
    estado_arriendo: string;
    kilometrosEntrada_arriendo: number;
    kilometrosSalida_arriendo: number;
    ciudadEntrega_arriendo: string;
    fechaEntrega_arriendo: Date;
    ciudadRecepcion_arriendo: string;
    fechaRecepcion_arriendo: Date;
    diasActuales_arriendo: number;
    diasAcumulados_arriendo: number;
    tipo_arriendo: string;
    rut_cliente: string;
    id_remplazo: number;
    rut_empresa: string;
    patente_vehiculo: string;
    id_usuario: number;
    id_sucursal: number;
    rut_conductor: string;
    rut_conductor2: string;
    rut_conductor3: string;
}