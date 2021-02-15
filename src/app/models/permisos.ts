import { Sequelize } from './sequelize';

export class Permiso extends Sequelize {
    id_permiso: number;
    nombre_permiso: string;
    descripcion_permiso: string;
}