import {
  Component,OnInit,
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
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);


import { Sucursal } from 'src/app/models';
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
export class SucursalModalComponent implements OnInit{

  sucursales: Sucursal[] = [];
  listThead: string[] = [];
  
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
            if(arriendo.id_sucursal == sucursal.id_sucursal){
              idarriFinalizado.push(arriendo.id_arriendo);
            }
            
          }
          if (arriendo.estado_arriendo == 'ANULADO') {
            anulados++;        
            if(arriendo.id_sucursal == sucursal.id_sucursal){
              idarriAnulado.push(arriendo.id_arriendo);
            }
          }
          if (
            arriendo.estado_arriendo == 'ACTIVO' ||
            arriendo.estado_arriendo == 'EXTENDIDO' ||
            arriendo.estado_arriendo == 'E-CONFIRMADO'
          ) {
            if(arriendo.id_sucursal == sucursal.id_sucursal){
              idarriActivo.push(arriendo.id_arriendo);
            }            
            activos++;
          }   
          

        });
        sucursal['idarriFinalizado'] = idarriFinalizado;
        sucursal['idarriAnulado'] = idarriAnulado;
        sucursal['idarriActivo'] = idarriActivo;
        sucursal['fechaarri'] = fechaArriendos;

        
        console.log(idarriFinalizado);
        console.log(idarriAnulado);
        console.log(idarriActivo);



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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = false;

  constructor(private _sucursal: SucursalesService,private modal: NgbModal) {}

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

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
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
