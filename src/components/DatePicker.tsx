import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { formatDateToPortuguese } from '../utils/formatters';

interface DatePickerProps {
  selectedDate: string; // 'YYYY-MM-DD'
  onSelectDate: (date: string) => void;
  openDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  blockedDates: string[]; // ['YYYY-MM-DD']
  onProceedToTime?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate,
  openDays,
  blockedDates,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month state for navigation
  const initialDate = selectedDate ? new Date(selectedDate + 'T12:00:00') : today;
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth()); // 0-indexed

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPrevDisabled =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekdayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const formatCellDate = (day: number) => {
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4 pt-6 pb-12 relative">
      {/* Step Heading */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#e64980] uppercase">
          Etapa 2 de 5
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#c23a5b] mt-1 mb-2">
          Escolha a Data
        </h2>
        <p className="text-xs sm:text-sm text-[#734b55] max-w-md mx-auto">
          Selecione o dia desejado para verificar os horários de atendimento disponíveis.
        </p>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-3xl border border-[#fbd2dc] p-5 shadow-soft">
        {/* Month & Year Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#fdebf0]">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            aria-label="Mês anterior"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#c23a5b] hover:bg-[#ffe3eb] disabled:opacity-30 disabled:hover:bg-transparent active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-[#c23a5b] capitalize">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <span className="text-[11px] text-[#8e5c67]">
              Toque em uma data disponível
            </span>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Próximo mês"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#c23a5b] hover:bg-[#ffe3eb] active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekdayHeaders.map((header, idx) => {
            const isWeekend = idx === 0 || idx === 6;
            return (
              <span
                key={header}
                className={`text-[11px] font-bold uppercase tracking-wider py-1 ${
                  isWeekend ? 'text-[#e64980]' : 'text-[#8e5c67]'
                }`}
              >
                {header}
              </span>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarCells.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-11 sm:h-12" />;
            }

            const cellDateStr = formatCellDate(day);
            const cellDate = new Date(currentYear, currentMonth, day, 0, 0, 0);
            const isPast = cellDate < today;
            const dayOfWeek = cellDate.getDay();
            const isOpenDay = openDays.includes(dayOfWeek);
            const isBlocked = blockedDates.includes(cellDateStr);
            const isAvailable = !isPast && isOpenDay && !isBlocked;
            const isSelected = selectedDate === cellDateStr;
            const isToday = cellDate.getTime() === today.getTime();

            return (
              <button
                key={cellDateStr}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelectDate(cellDateStr)}
                className={`h-11 sm:h-12 rounded-2xl flex flex-col items-center justify-center relative text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#e64980] to-[#c23a5b] text-white shadow-md font-bold scale-[1.03] z-10'
                    : isAvailable
                    ? 'bg-[#fff5f7] text-[#2b1e22] hover:bg-[#ffe3eb] hover:border-[#f783ac] border border-[#fdebf0] active:scale-95'
                    : 'text-[#d8b5bd] bg-[#fffafb]/60 cursor-not-allowed'
                }`}
                title={
                  !isOpenDay
                    ? 'Sem atendimento neste dia da semana'
                    : isBlocked
                    ? 'Data indisponível/bloqueada'
                    : isPast
                    ? 'Data anterior à atual'
                    : `Disponível: ${day} de ${monthNames[currentMonth]}`
                }
              >
                <span className="tabular-nums">{day}</span>
                {isToday && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e64980] mt-0.5" />
                )}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 pt-4 border-t border-[#fdebf0] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#7d535e]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#fff5f7] border border-[#f8a5b8]" />
            <span>Disponível</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#e64980]" />
            <span>Selecionada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#fffafb] border border-dashed border-[#e6c2cb]" />
            <span>Indisponível</span>
          </div>
        </div>
      </div>

    </section>
  );
};
