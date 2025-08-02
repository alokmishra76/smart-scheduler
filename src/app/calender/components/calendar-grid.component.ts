import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarEvent } from '../../core/models/calendar-event.model';
import { EventModalComponent } from '../../shared/event-modal/event-modal.component';
import { CdkDragDrop, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar-grid',
  imports: [CommonModule, EventModalComponent, DragDropModule],
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

onEventDragEnd(event: CdkDragEnd) {
  // Optionally highlight drop target while dragging
}

onEventDropped(event: CdkDragDrop<any>, newDayIndex: number) {
  const dragData = event.item.data; // { event, dayIndex }
  const draggedEvent = dragData.event;

  const dropY = event.dropPoint.y; // Y-offset of the drop
  const cellHeight = 60; // px per hour

  const droppedHour = Math.floor(dropY / cellHeight);
  const start = new Date(draggedEvent.start);
  const end = new Date(draggedEvent.end);

  const durationMinutes = (end.getTime() - start.getTime()) / 60000;

  // Calculate new start time
  const newStart = new Date();
  newStart.setHours(droppedHour, 0, 0, 0);
  newStart.setDate(newStart.getDate() - newStart.getDay() + newDayIndex);

  const newEnd = new Date(newStart.getTime() + durationMinutes * 60000);

  // Update event
  this.events = this.events.map((e) =>
    e.id === draggedEvent.id
      ? {
          ...e,
          start: newStart.toISOString(),
          end: newEnd.toISOString(),
        }
      : e
  );
}


}
