import { ServiceItem } from '../types';

/**
 * Format Brazilian phone number: (99) 99999-9999 or (99) 9999-9999
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Format date string (YYYY-MM-DD) into Portuguese friendly date:
 * "Sábado, 14 de novembro de 2026"
 */
export function formatDateToPortuguese(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;

  const date = new Date(year, month - 1, day, 12, 0, 0);

  const weekdayNames = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  const monthNames = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  const weekday = weekdayNames[date.getDay()];
  const monthName = monthNames[month - 1];

  return `${weekday}, ${day} de ${monthName} de ${year}`;
}

/**
 * Short date format: "14/11/2026"
 */
export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function calculateTotalServicesPrice(services: ServiceItem[]): {
  total: number;
  formatted: string;
  hasStartingPrice: boolean;
} {
  if (!services || services.length === 0) {
    return { total: 0, formatted: 'R$ 0,00', hasStartingPrice: false };
  }
  const total = services.reduce((acc, s) => acc + s.price, 0);
  const hasStartingPrice = services.some((s) => s.isStartingPrice);
  const formatted = hasStartingPrice ? `A partir de R$ ${total},00` : `R$ ${total},00`;
  return { total, formatted, hasStartingPrice };
}

/**
 * Build WhatsApp message strictly according to specifications:
 * Supports single or multiple services selection.
 */
export function buildWhatsAppMessage(params: {
  clientName: string;
  clientPhone: string;
  services: ServiceItem[];
  dateStr: string;
  timeStr: string;
  clientNotes?: string;
}): string {
  const formattedDate = formatDateToPortuguese(params.dateStr);
  const { formatted: totalFormatted } = calculateTotalServicesPrice(params.services);

  let servicesSection = '';
  if (params.services.length === 1) {
    const s = params.services[0];
    const sPrice = s.isStartingPrice ? `A partir de R$ ${s.price},00` : s.formattedPrice;
    servicesSection = `Serviço: ${s.name}\n\nValor: ${sPrice}`;
  } else {
    const list = params.services
      .map((s) => `• ${s.name} (${s.isStartingPrice ? `A partir de R$ ${s.price},00` : s.formattedPrice})`)
      .join('\n');
    servicesSection = `Serviços:\n${list}\n\nValor Total: ${totalFormatted}`;
  }

  const notesPart = params.clientNotes && params.clientNotes.trim()
    ? `\n\nObservações: ${params.clientNotes.trim()}`
    : '';

  return (
    `Olá, Raissa! Tudo bem? Gostaria de solicitar um agendamento.\n\n` +
    `Nome: ${params.clientName.trim()}\n\n` +
    `Telefone: ${params.clientPhone.trim()}\n\n` +
    `${servicesSection}\n\n` +
    `Data: ${formattedDate}\n\n` +
    `Horário: ${params.timeStr}` +
    notesPart +
    `\n\nGostaria de confirmar se esse dia e horário estão disponíveis. Aguardo sua confirmação!`
  );
}

/**
 * Generate official WhatsApp link: https://wa.me/5518996732692?text=...
 */
export function createWhatsAppUrl(whatsappNumber: string, messageText: string): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5518996732692';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Generate available time slots based on Raissa Makeup business schedule:
 * - Manhã: 09:30 às 11:30
 * - Pausa de almoço: 11:30 às 13:30 (sem agendamentos)
 * - Tarde: 13:30 às 18:30
 */
export function generateTimeSlots(
  startHour: string = '09:30',
  endHour: string = '18:30',
  intervalMinutes: number = 30
): string[] {
  const step = intervalMinutes > 0 ? intervalMinutes : 30;

  const generateRange = (fromStr: string, toStr: string): string[] => {
    const [startH, startM] = fromStr.split(':').map(Number);
    const [endH, endM] = toStr.split(':').map(Number);
    const startTotal = startH * 60 + (startM || 0);
    const endTotal = endH * 60 + (endM || 0);
    const result: string[] = [];
    for (let cur = startTotal; cur <= endTotal; cur += step) {
      const h = Math.floor(cur / 60);
      const m = cur % 60;
      result.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
    return result;
  };

  // Turno da Manhã: de startHour até 11:30
  const morningSlots = generateRange(startHour || '09:30', '11:30');
  // Turno da Tarde: de 13:30 até endHour
  const afternoonSlots = generateRange('13:30', endHour || '18:30');

  return [...morningSlots, ...afternoonSlots];
}
