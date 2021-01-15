import { Sequelize } from './sequelize';

export class EmpresaRemplazo extends Sequelize {
    codigo_empresaRemplazo: string;
    nombre_empresaRemplazo: string;
    rut_empresaRemplazo: string;
    direccion_empresaRemplazo: string;
    giro_empresaRemplazo: string;
}