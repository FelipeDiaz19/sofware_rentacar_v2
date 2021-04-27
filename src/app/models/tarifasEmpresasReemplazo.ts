import { Sequelize } from "./sequelize";
export class TarifasEmpresasReemplazo extends Sequelize {
    id_tarifaEmpresaRemplazo: number;
    id_sucursal: number;
    codigo_empresaRemplazo: string;
    NombreEmpresaReemplazo: string;
    categoria: string;
    valor: number;
  NombreSucursal: any;
}
