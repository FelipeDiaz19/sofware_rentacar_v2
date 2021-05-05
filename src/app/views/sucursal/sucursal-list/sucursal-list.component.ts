import { Subject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sucursal, Arriendo } from 'src/app/models';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
import * as moment from 'moment';

import { SucursalModalComponent } from '../sucursal-modal/sucursal-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ArriendoService } from 'src/app/services/arriendo.service';
@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.component.html',
  styleUrls: ['./sucursal-list.component.css']
})

export class SucursalListComponent implements OnInit {

  sucursales: Sucursal[] = [];
  listThead: string[] = [];

  arriendos: Arriendo[] = [];
  events: CalendarEvent[] = [];
  id: any;
  mostrar: boolean = false;
  fecha: Date;
  fecha2: Date;
  datos: any;
  sucursalUsuario: any;
  RolUsuario: any;
  today: number = Date.now();

  constructor(private _sucursal: SucursalesService, public dialog: MatDialog, private arriendoServicio: ArriendoService) {
    this.listThead = ['Sucursal', 'Region', 'Arriendos totales', 'Arriendos Finalizados',
      'Arriendos Activos', 'Arriendos Anulados', 'fecha de registro', 'Calendario'];


  }



  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('usuario'));

    this.sucursalUsuario = this.datos.id_sucursal;
    this.RolUsuario = this.datos.id_rol;

    this.cargarSucursal();

  }




  cargarSucursal(): void {
    this._sucursal.getAll().subscribe((sucursales: Sucursal[]) => {
      sucursales.map(sucursal => {
        let finalizados = 0;
        let activos = 0;
        let anulados = 0;
        sucursal["arriendos"].forEach(arriendo => {
          if (arriendo.estado_arriendo == "FINALIZADO") {
            finalizados++;
          }
          if (arriendo.estado_arriendo == "ANULADO") {
            anulados++
          }
          if (arriendo.estado_arriendo == "ACTIVO" || arriendo.estado_arriendo == "RECEPCIONADO" || arriendo.estado_arriendo == "EXTENDIDO" || arriendo.estado_arriendo == "E-CONFIRMADO") {
            activos++
          }
        })
        sucursal["cant_finalizados"] = finalizados;
        sucursal["cant_activos"] = activos;
        sucursal["cant_anulados"] = anulados;
      })
      this.sucursales = sucursales;

    })
  }


  mandarS(suc): void {

    this.events = [];
    this.arriendoServicio.finndAllArriendosPorSucursal(suc).subscribe(res => {



      this.arriendos = res.data;
      this.arriendos.forEach(arr => {

        console.log(arr.fechaEntrega_arriendo);
        this.fecha = moment(arr.fechaEntrega_arriendo, 'YYYY-MM-DD').toDate();
        this.fecha2 = moment(arr.fechaRecepcion_arriendo, 'YYYY-MM-DD').toDate();
        //console.log(this.fecha);

        const colors: any = {
          red: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
          },
          blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
          },
          yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA',
          },
        };

        this.events.push(
          {
            start: subDays(startOfDay(arr.fechaEntrega_arriendo), 2),
            title: 'PATENTE:  ' + arr.patente_vehiculo,
            color: this.colo(arr.tipo_arriendo),
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          });


      });
    });
  }

  colo(tipo: string): any {

    const colors: any = {
      red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      }, yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
      }
    }

    if (tipo == "REEMPLAZO") {
      return colors.blue;
    } else if (tipo == "PARTICULAR") {
      return colors.yellow;
    } else if (tipo == "EMPRESA") {
      return colors.red;
    }
  }







  cargarSucursals(): void {
    this._sucursal.getAll().subscribe((sucursales: Sucursal[]) => {
      sucursales.map((sucursal) => {
        let finalizados = 0;
        let activos = 0;
        let anulados = 0;

        let idarriFinalizado = [];
        let idarriAnulado = [];
        let idarriActivo = [];
        let fechaArriendos = [];

        sucursal['arriendos'].forEach((arriendo) => {

          fechaArriendos.push(arriendo.fechaRecepcion_arriendo);

          if (arriendo.estado_arriendo == 'FINALIZADO') {
            finalizados++;
            if (arriendo.id_sucursal == sucursal.id_sucursal) {
              idarriFinalizado.push(arriendo.id_arriendo);
            }

          }
          if (arriendo.estado_arriendo == 'ANULADO') {
            anulados++;
            if (arriendo.id_sucursal == sucursal.id_sucursal) {
              idarriAnulado.push(arriendo.id_arriendo);
            }
          }
          if (
            arriendo.estado_arriendo == 'ACTIVO' ||
            arriendo.estado_arriendo == 'EXTENDIDO' ||
            arriendo.estado_arriendo == 'E-CONFIRMADO'
          ) {
            if (arriendo.id_sucursal == sucursal.id_sucursal) {
              idarriActivo.push(arriendo.id_arriendo);
            }
            activos++;
          }


        });
        sucursal['idarriFinalizado'] = idarriFinalizado;
        sucursal['idarriAnulado'] = idarriAnulado;
        sucursal['idarriActivo'] = idarriActivo;
        sucursal['fechaarri'] = fechaArriendos;






        sucursal['cant_finalizados'] = finalizados;
        sucursal['cant_activos'] = activos;
        sucursal['cant_anulados'] = anulados;

      });
      this.sucursales = sucursales;
    });
  }


  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }


  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;



  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = "es";

  modalData: {
    action: string;
    event: CalendarEvent;
  };



  refresh: Subject<any> = new Subject();



  activeDayIsOpen: boolean = false;



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  addEvent(arriendo: Arriendo): void {
    const colors: any = {
      red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
      yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
      },
    };

    this.events = [
      ...this.events,
      {
        title: arriendo.ciudadEntrega_arriendo,
        start: startOfDay(arriendo.fechaEntrega_arriendo),
        end: endOfDay(arriendo.fechaRecepcion_arriendo),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }






}









