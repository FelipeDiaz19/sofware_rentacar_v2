import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestResponse } from './../models/requestResponse';
import { Vehiculo } from 'src/app/models';
import { TarifaVehiculo } from './../models/tarifasVehiculos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarifasVehiculosService {

  formatter = new Intl.NumberFormat("CL");
  tarifasVehiculos: TarifaVehiculo[];

  constructor(private http: HttpClient) { }



  createList(TARIFASVEHICULOS: TarifaVehiculo[]): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}vehiculos/registrarTarifa`, { TARIFASVEHICULOS });
  }

  getAll(): Observable<TarifaVehiculo[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}vehiculos/cargarTarifasVehiculos`).pipe(map((response: RequestResponse) => {
      response.data.map((tarifasVehiculos: any) => {

        tarifasVehiculos.valor_iva_diario = "$ " + this.formatter.format(this.cacularIva(tarifasVehiculos.valor_neto_diario));
        tarifasVehiculos.valor_iva_semanal = "$ " + this.formatter.format(this.cacularIva(tarifasVehiculos.valor_neto_semanal));
        tarifasVehiculos.valor_iva_quincenal = "$ " + this.formatter.format(this.cacularIva(tarifasVehiculos.valor_neto_quincenal));
        tarifasVehiculos.valor_iva_mensual = "$ " + this.formatter.format(this.cacularIva(tarifasVehiculos.valor_neto_mensual));

        tarifasVehiculos.valor_total_diario = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_diario + this.cacularIva(tarifasVehiculos.valor_neto_diario));
        tarifasVehiculos.valor_total_semanal = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_semanal + this.cacularIva(tarifasVehiculos.valor_neto_semanal));
        tarifasVehiculos.valor_total_quincenal = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_quincenal + this.cacularIva(tarifasVehiculos.valor_neto_quincenal));
        tarifasVehiculos.valor_total_mensual = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_mensual + this.cacularIva(tarifasVehiculos.valor_neto_mensual));

        tarifasVehiculos.valor_neto_diario = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_diario);
        tarifasVehiculos.valor_neto_semanal = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_semanal);
        tarifasVehiculos.valor_neto_quincenal = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_quincenal);
        tarifasVehiculos.valor_neto_mensual = "$ " + this.formatter.format(tarifasVehiculos.valor_neto_mensual);
      })

      return this.tarifasVehiculos = response.data;
    }))
  }

  private cacularIva(NETO: number): number {
    return NETO * 0.19;
  }




}
