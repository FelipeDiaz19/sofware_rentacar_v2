import { ArriendoService } from './../../../services/arriendo.service';
import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
//importacion idioma español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

import * as moment from 'moment';
import { Arriendo, Sucursal } from 'src/app/models';
import { SucursalesService } from 'src/app/services/sucursales.service';






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

@Component({
  selector: 'app-sucursal-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sucursal-modal.component.html',
  styleUrls: ['./sucursal-modal.component.css']
})
export class SucursalModalComponent implements OnInit {


  constructor(
    private _sucursal: SucursalesService,
    private modal: NgbModal,
    private arriendoServicio: ArriendoService) { }

  sucursales: Sucursal[] = [];
  listThead: string[] = [];
  arriendos: Arriendo[] = [];
  events: CalendarEvent[] = [];

  fecha: Date;
  fecha2: Date;



  ngOnInit(): void {
    this.cargarSucursal();
  }




  cargarSucursal(): void {
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

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = "es";

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(arriendo: Arriendo): void {
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
