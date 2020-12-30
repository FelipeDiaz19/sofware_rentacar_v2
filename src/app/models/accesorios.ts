import { Sequelize } from './sequelize';
export class Accesorio extends Sequelize {
  id_accesorio: Number;
  nombre_accesorio: String;
  precio_accesorio: Number;
  id_sucursal: Number;
}
