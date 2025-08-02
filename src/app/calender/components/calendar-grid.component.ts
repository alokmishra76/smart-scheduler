import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarEvent } from '../../core/models/calendar-event.model';
import { EventModalComponent } from '../../shared/event-modal/event-modal.component';

@Component({
  selector: 'app-calendar-grid',
  imports: [CommonModule, EventModalComponent],
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent {
  hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  showModal = false;
  selectedSlotTime = '';
  events: CalendarEvent[] = [];

  onSlotClick(dayIndex: number, hour: number) {
    const now = new Date();
    now.setHours(hour, 0, 0, 0);
    now.setDate(now.getDate() - now.getDay() + dayIndex);
    this.selectedSlotTime = now.toISOString();
    this.showModal = true;
  }

  handleSaveEvent(event: CalendarEvent) {
    this.events = [...this.events, event];
    this.showModal = false;
  }

  getEventsForDay(dayIndex: number): CalendarEvent[] {
  return this.events.filter((event) => {
    const date = new Date(event.start);
    return date.getDay() === dayIndex;
  });
}

getEventTopOffset(event: CalendarEvent): string {
  const start = new Date(event.start);
  const minutes = start.getHours() * 60 + start.getMinutes();
  const px = (minutes / 60) * 60; // 60px per hour
  return `${px}px`;
}

getEventHeight(event: CalendarEvent): string {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const diff = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes
  const px = (diff / 60) * 60;
  return `${px}px`;
}


}
