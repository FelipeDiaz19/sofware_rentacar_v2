import { Sequelize } from "./sequelize";

export class Vehiculo extends Sequelize {
  patente_vehiculo: string;
  estado_vehiculo: string;
  chasis_vehiculo: string;
  transmision_vehiculo: string;
  numeroMotor_vehiculo: string;
  marca_vehiculo: string;
  modelo_vehiculo: string;
  tipo_vehiculo: string;
  color_vehiculo: string;
  compra_vehiculo: string;
  fechaCompra_vehiculo: string;
  año_vehiculo: number;
  foto_vehiculo: string;
  Tmantencion_vehiculo: number;
  kilometraje_vehiculo: number;
  kilometrosMantencion_vehiculo: number;
  rut_propietario: string;
  id_region: number;
}
