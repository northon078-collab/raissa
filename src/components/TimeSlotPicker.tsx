import React from 'react';
import { Sun, Sunset, Coffee, Check } from 'lucide-react';
import { formatDateToPortuguese, generateTimeSlots } from '../utils/formatters';

interface TimeSlotPickerProps {
  selectedDate: string;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  startHour: string;
  endHour: string;
  intervalMinutes: number;
  blockedSlotsForDate: string[];
  onProceedToClientData?: () => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  selectedTime,
  onSelectTime,
  startHour,
  endHour,
  intervalMinutes,
  blockedSlotsForDate,
}) => {
  const allSlots = generateTimeSlots(startHour, endHour, intervalMinutes);

  // Group slots into Raissa's two working shifts:
  // 1. Manhã: 09:30 às 11:30
  // 2. Tarde: 13:30 às 18:30
  const morningSlots = allSlots.filter((slot) => {
    const [h, m] = slot.split(':').map(Number);
    return h * 60 + m <= 11 * 60 + 30;
  });

  const afternoonSlots = allSlots.filter((slot) => {
    const [h, m] = slot.split(':').map(Number);
    return h * 60 + m >= 13 * 60 + 30;
  });

  // Check if slot has already passed if selectedDate is today
  const isPastSlotForToday = (slot: string) => {
    if (!selectedDate) return false;
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (selectedDate !== todayStr) return false;

    const [h, m] = slot.split(':').map(Number);
    return h < now.getHours() || (h === now.getHours() && m <= now.getMinutes());
  };

  const renderSlotGroup = (title: string, icon: React.ReactNode, slots: string[]) => {
    if (slots.length === 0) return null;

    return (
      <div className="mb-6 last:mb-0">
        <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-[#b32b50] font-bold">
          {icon}
          <span>{title}</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {slots.map((slot) => {
            const isBlocked = blockedSlotsForDate.includes(slot);
            const isPast = isPastSlotForToday(slot);
            const isUnavailable = isBlocked || isPast;
            const isSelected = selectedTime === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={isUnavailable}
                onClick={() => onSelectTime(slot)}
                className={`h-12 rounded-xl text-sm font-bold tracking-wider tabular-nums transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#e64980] to-[#c23a5b] text-white shadow-md scale-[1.02]'
                    : isUnavailable
                    ? 'bg-[#f8ebef] text-[#c9a7b0] border border-dashed border-[#e6c4cc] cursor-not-allowed line-through'
                    : 'bg-white text-[#2b1e22] border border-[#fbd2dc] hover:bg-[#ffe3eb] hover:border-[#e64980] active:scale-95 shadow-2xs'
                }`}
                title={
                  isPast
                    ? 'Horário já passou hoje'
                    : isBlocked
                    ? 'Horário já reservado ou indisponível'
                    : `Horário: ${slot}`
                }
              >
                <span>{slot}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4 pt-6 pb-12 relative">
      {/* Step Heading */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#e64980] uppercase">
          Etapa 3 de 5
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#c23a5b] mt-1 mb-2">
          Escolha o Horário
        </h2>
        <p className="text-xs sm:text-sm text-[#734b55] max-w-md mx-auto">
          Para o dia <strong className="text-[#c23a5b] font-bold">{formatDateToPortuguese(selectedDate)}</strong>.
        </p>
      </div>

      {/* Slots Card */}
      <div className="bg-white rounded-3xl border border-[#fbd2dc] p-5 sm:p-6 shadow-soft">
        {renderSlotGroup('Manhã • 09:30 às 11:30', <Sun className="w-4 h-4 text-[#d4af37]" />, morningSlots)}

        {/* Indicador elegante de intervalo de almoço */}
        <div className="my-5 py-2.5 px-3.5 rounded-2xl bg-[#fff0f4] border border-[#fcd2dd] flex items-center justify-between text-xs text-[#a61e4d]">
          <span className="font-semibold flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#e64980]" />
            Intervalo de almoço
          </span>
          <span className="text-[11px] font-bold text-[#b32b50] bg-white px-2.5 py-1 rounded-lg border border-[#fbd2dc]">
            11:30 às 13:30
          </span>
        </div>

        {renderSlotGroup('Tarde • 13:30 às 18:30', <Sunset className="w-4 h-4 text-[#e64980]" />, afternoonSlots)}

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-[#fdebf0] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#7d535e]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-white border border-[#fbd2dc]" />
            <span>Disponível</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#e64980]" />
            <span>Selecionado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#f8ebef] border border-dashed border-[#e6c4cc]" />
            <span className="line-through">Reservado / Ocupado</span>
          </div>
        </div>
      </div>
    </section>
  );
};
