import { Sequelize } from './sequelize';

export class Cliente extends Sequelize {
    rut_cliente: string;
    nombre_cliente: string;
    direccion_cliente: string;
    estadoCivil_cliente: string;
    ciudad_cliente: string;
    comuna_cliente: string;
    nacionalidad_cliente: string;
    telefono_cliente: string;
    correo_cliente: string;
    fechaNacimiento_cliente: Date;
}