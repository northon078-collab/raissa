export type ServiceCategory = 'maquiagem' | 'sobrancelhas' | 'penteados';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  formattedPrice: string;
  isStartingPrice?: boolean;
  priceNote?: string;
  durationMinutes?: number;
  description?: string;
}

export interface BookingState {
  services: ServiceItem[];
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientPhone: string;
  clientNotes?: string;
}

export interface BusinessSettings {
  whatsappNumber: string; // digits only: 5518996732692
  instagramHandle: string; // @raissa_makeup._
  instagramUrl: string; // https://www.instagram.com/raissa_makeup._/
  openDays: number[]; // 0 = Sunday, 1 = Monday, 2 = Tuesday, ... 6 = Saturday
  startHour: string; // "08:30"
  endHour: string; // "19:00"
  intervalMinutes: number; // 60
  blockedDates: string[]; // ['2026-11-20', ...]
  blockedSlots: { [date: string]: string[] }; // '2026-11-15': ['10:00', '14:00']
}

export interface AppointmentRecord {
  id: string;
  createdAt: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientNotes?: string;
  status: 'solicitado' | 'confirmado' | 'cancelado';
}
