import { Sequelize } from './sequelize';

export class Contacto extends Sequelize {
    id_contacto: number;
    nombre_contacto: string;
    domicilio_contacto: string;
    numeroCasa_contacto: string;
    ciudad_contacto: string;
    telefono_contacto: string;
    id_arriendo: string;
}