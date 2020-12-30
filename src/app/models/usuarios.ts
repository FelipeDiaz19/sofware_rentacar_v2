import { Sequelize } from "./sequelize";
export class Usuario extends Sequelize {
  id_usuario: number;
  estado_usuario: number;
  nombre_usuario: string;
  email_usuario: string;
  clave_usuario: string;
  id_rol: number;
  id_sucursal: number;
}
