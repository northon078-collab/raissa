import React from 'react';
import { BookingState } from '../types';
import {
  formatDateToPortuguese,
  calculateTotalServicesPrice,
} from '../utils/formatters';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Edit3,
  MessageCircle,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

interface BookingSummaryProps {
  booking: BookingState;
  whatsappNumber: string;
  onEditStep: (stepNumber: number) => void;
  onConfirmSuccess?: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  booking,
  whatsappNumber,
  onEditStep,
}) => {
  if (!booking.services || booking.services.length === 0) return null;

  const { formatted: totalFormatted } = calculateTotalServicesPrice(booking.services);

  return (
    <section className="w-full max-w-xl mx-auto px-4 pt-6 pb-12 relative">
      {/* Step Heading */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#e64980] uppercase">
          Etapa 5 de 5
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#c23a5b] mt-1 mb-2">
          Resumo do Agendamento
        </h2>
        <p className="text-xs sm:text-sm text-[#734b55] max-w-md mx-auto">
          Confira todos os detalhes antes de ser encaminhada para o WhatsApp oficial da Raissa.
        </p>
      </div>

      {/* Ticket / Luxury Summary Card */}
      <div className="bg-white rounded-3xl border border-[#fbd2dc] p-5 sm:p-7 shadow-soft relative overflow-hidden">
        {/* Subtle decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e64980] via-[#d4af37] to-[#c23a5b]" />

        {/* Brand Watermark header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#fdebf0]">
          <div>
            <span className="font-serif font-bold text-base tracking-[0.2em] text-[#c23a5b] uppercase">
              RAISSA MAKEUP
            </span>
            <span className="text-[10px] text-[#d6336c] block tracking-wider uppercase font-semibold">
              Solicitação de Horário
            </span>
          </div>
          <span className="text-xs text-[#d4af37] font-serif italic">✦ Exclusivo</span>
        </div>

        {/* Detailed Rows with Edit Buttons */}
        <div className="space-y-3.5">
          {/* 1. Cliente */}
          <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#fffafb] border border-[#fdebf0]">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#ffe3eb] text-[#c23a5b] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6336c] block">
                  Cliente
                </span>
                <p className="font-serif font-bold text-base text-[#b32b50] truncate">
                  {booking.clientName}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-xs text-[#c23a5b] hover:text-[#e64980] font-bold flex items-center gap-1 p-1 hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Alterar</span>
            </button>
          </div>

          {/* 2. Telefone */}
          <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#fffafb] border border-[#fdebf0]">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#ffe3eb] text-[#c23a5b] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6336c] block">
                  Telefone / WhatsApp
                </span>
                <p className="font-sans font-bold text-base text-[#2b1e22] tabular-nums">
                  {booking.clientPhone}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-xs text-[#c23a5b] hover:text-[#e64980] font-bold flex items-center gap-1 p-1 hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Alterar</span>
            </button>
          </div>

          {/* 3. Serviços Escolhidos (Multi-serviço) */}
          <div className="p-3.5 rounded-2xl bg-[#fffafb] border border-[#fdebf0]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6336c] block">
                {booking.services.length === 1 ? 'Serviço Escolhido' : `Serviços Escolhidos (${booking.services.length})`}
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs text-[#c23a5b] hover:text-[#e64980] font-bold flex items-center gap-1 p-1 hover:underline cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Alterar</span>
              </button>
            </div>

            <div className="space-y-2">
              {booking.services.map((s) => (
                <div key={s.id} className="flex items-start justify-between gap-2 py-1 border-b border-[#fdebf0] last:border-b-0">
                  <div className="min-w-0">
                    <p className="font-serif font-bold text-sm text-[#b32b50]">
                      {s.name}
                    </p>
                    {s.priceNote && (
                      <p className="text-[10px] text-[#a61e4d] font-medium">
                        {s.priceNote}
                      </p>
                    )}
                  </div>
                  <span className="font-sans font-bold text-xs text-[#c23a5b] tabular-nums shrink-0">
                    {s.isStartingPrice ? `A partir de R$ ${s.price},00` : s.formattedPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="mt-3 pt-2.5 border-t border-[#f7aab9] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a61e4d]">
                Valor Total Previsto:
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-[#c23a5b] tabular-nums">
                {totalFormatted}
              </span>
            </div>
          </div>

          {/* 4. Data e Horário */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Data */}
            <div className="flex items-start justify-between gap-2 p-3 rounded-2xl bg-[#fffafb] border border-[#fdebf0]">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#ffe3eb] text-[#c23a5b] flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6336c] block">
                    Data
                  </span>
                  <p className="font-serif font-bold text-xs text-[#b32b50]">
                    {formatDateToPortuguese(booking.date)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-[11px] text-[#c23a5b] hover:text-[#e64980] font-bold flex items-center gap-0.5 p-1 hover:underline cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>Alterar</span>
              </button>
            </div>

            {/* Horário */}
            <div className="flex items-start justify-between gap-2 p-3 rounded-2xl bg-[#fffafb] border border-[#fdebf0]">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#ffe3eb] text-[#c23a5b] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6336c] block">
                    Horário
                  </span>
                  <p className="font-sans font-bold text-sm text-[#2b1e22] tabular-nums">
                    {booking.time}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-[11px] text-[#c23a5b] hover:text-[#e64980] font-bold flex items-center gap-0.5 p-1 hover:underline cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>Alterar</span>
              </button>
            </div>
          </div>

          {/* 5. Observações */}
          {booking.clientNotes && booking.clientNotes.trim() && (
            <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#fffafb] border border-[#fdebf0]">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#ffe3eb] text-[#c23a5b] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6336c] block">
                    Observações
                  </span>
                  <p className="text-xs text-[#6e434e] mt-0.5 leading-relaxed">
                    {booking.clientNotes.trim()}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="text-[11px] text-[#c23a5b] hover:text-[#e64980] font-bold flex items-center gap-0.5 p-1 hover:underline cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>Alterar</span>
              </button>
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="mt-5 p-4 rounded-2xl bg-[#fff0f4] border border-[#fcc2d7] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#e64980] shrink-0 mt-0.5" />
          <div className="text-xs text-[#733e4b] leading-relaxed">
            <strong className="font-bold text-[#c23a5b] block mb-0.5">
              Como funciona a confirmação:
            </strong>
            Ao clicar no botão fixo no topo da tela, sua conversa no WhatsApp com a Raissa será aberta automaticamente com todos esses dados preenchidos. O horário será <strong>confirmado após a resposta e aprovação da maquiadora</strong>.
          </div>
        </div>

        {/* WhatsApp Contact Note */}
        <div className="mt-5 pt-3 border-t border-[#fdebf0] flex items-center justify-center gap-2 text-xs text-[#8e5c67]">
          <MessageCircle className="w-4 h-4 text-[#25d366]" />
          <span>Atendimento oficial: <strong className="text-[#a61e4d]">+55 18 99673-2692</strong></span>
        </div>
      </div>

    </section>
  );
};
