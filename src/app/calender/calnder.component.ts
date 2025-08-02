import { Component } from "@angular/core";
import { CalendarGridComponent } from "./components/calendar-grid.component";

@Component({
    selector: 'app-calender',
    template: `<app-calendar-grid></app-calendar-grid>`, 
    standalone: true,
    imports: [CalendarGridComponent]
})

export class CalenderComponent {}