export interface CalendarEvent {
  id: string;
  title: string;
  start: string;  // ISO string
  end: string;    // ISO string
  color?: string;
}

export interface EventFormData {
  title: string,
  duration: number,
}
