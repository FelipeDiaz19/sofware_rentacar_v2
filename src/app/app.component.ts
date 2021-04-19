import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';

import { CalendarView } from 'angular-calendar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rentacar-v2';

  constructor() {
  }

  ngOnInit(): void {

  }
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
