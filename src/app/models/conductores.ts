import { Sequelize } from './sequelize';

export class Conductor extends Sequelize {
    rut_conductor: string;
    nombre_conductor: string;
    telefono_conductor: string;
    clase_conductor: string;
    numero_conductor: string;
    nacionalidad_conductor: string;
    vcto_conductor: Date;
    municipalidad_conductor: string;
    direccion_conductor: string;
}