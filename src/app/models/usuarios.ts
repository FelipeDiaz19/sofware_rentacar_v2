import { Rol } from './rol';
import { Sucursal } from './sucursal';

export class Usuario {
  id_usuario: number;
  estado_usuario: number;
  nombre_usuario: string;
  email_usuario: string;
  clave_usuario: string;
  userAt: string;
  id_rol: number;
  id_sucursal: number;
  role: Rol;
  sucursale: Sucursal;
}
