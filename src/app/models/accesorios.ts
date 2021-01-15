import { Sequelize } from './sequelize';
export class Accesorio extends Sequelize {
  id_accesorio: number;
  nombre_accesorio: string;
  precio_accesorio: number;
  id_sucursal: number;
}
