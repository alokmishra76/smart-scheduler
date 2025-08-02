import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent, EventFormData } from '../../core/models/calendar-event.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypedFormGroup } from '../utils/event-modal-form.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: true
})
export class EventModalComponent implements OnInit {
  @Input() visible = false;
  @Input() defaultStartTime = '';
  @Output() save = new EventEmitter<CalendarEvent>();
  @Output() close = new EventEmitter();

  eventForm: FormGroup<TypedFormGroup<EventFormData>>;

  constructor() {
    this.eventForm = new FormGroup<TypedFormGroup<EventFormData>>({
      title: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      duration: new FormControl(0, { nonNullable: true, validators: [Validators.required] })
    });
  }

  ngOnInit(): void {
    this.eventForm.reset({
      title: '',
      duration: 0
    });
  }

   onSave() {
    if (this.eventForm.invalid) return;

    const { title, duration } = this.eventForm.value;
    const start = new Date(this.defaultStartTime);
    const end = new Date(start);
    end.setHours(end.getHours() + duration!);

    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      title: title!,
      start: start.toISOString(),
      end: end.toISOString(),
      color: '#2196f3',
    };

    this.save.emit(event);
    this.eventForm.reset();
  }
}
