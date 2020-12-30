import { Sequelize } from "./sequelize";

export class TarifaVehiculo extends Sequelize {
  id_tarifaVehiculo: number;
  valor_neto_diario: number;
  valor_net_semanal: number;
  valor_neto_quincenal: number;
  valor_neto_mensual: number;
  patente_vehiculo: string;
}
