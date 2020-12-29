import { Rol } from './roles';
import { Sucursal } from './sucursales';

export class Usuario {
  id_usuario: number;
  estado_usuario: number;
  nombre_usuario: string;
  email_usuario: string;
  clave_usuario: string;
  id_rol: number;
  id_sucursal: number;
  role: Rol;
  sucursale: Sucursal;
  userAt: string;
}
