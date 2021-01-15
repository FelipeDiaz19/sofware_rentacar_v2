import { Sequelize } from './sequelize';

export class Empresa extends Sequelize {
    rut_empresa: string;
    nombre_empresa: string;
    rol_empresa: string;
    vigencia_empresa: string;
    direccion_empresa: string;
    ciudad_empresa: string;
    comuna_empresa: string;
    telefono_empresa: string;
    correo_empresa: string;
}