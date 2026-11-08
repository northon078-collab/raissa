import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { BookingState } from '../types';
import { buildWhatsAppMessage, createWhatsAppUrl } from '../utils/formatters';

interface ConfirmationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingState;
  whatsappNumber: string;
  onNewBooking: () => void;
}

export const ConfirmationSuccessModal: React.FC<ConfirmationSuccessModalProps> = ({
  isOpen,
  onClose,
  booking,
  whatsappNumber,
  onNewBooking,
}) => {
  if (!isOpen || !booking.services || booking.services.length === 0) return null;

  const whatsappUrl = createWhatsAppUrl(
    whatsappNumber,
    buildWhatsAppMessage({
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      services: booking.services,
      dateStr: booking.date,
      timeStr: booking.time,
      clientNotes: booking.clientNotes,
    })
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#fbd2dc] relative">
        {/* Success Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-[#eafaf1] border border-[#b8eed0] text-[#1da652] flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#1da652] uppercase block">
            Solicitação Encaminhada
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#c23a5b] mt-1">
            Quase lá, {booking.clientName.split(' ')[0]}!
          </h3>
          <p className="text-xs sm:text-sm text-[#734b55] mt-2 leading-relaxed">
            Sua solicitação de agendamento foi direcionada para o WhatsApp de <strong>Raissa Makeup</strong>.
          </p>
        </div>

        {/* Quick reminder box */}
        <div className="p-4 rounded-2xl bg-[#fff5f7] border border-[#fbd2dc] mb-6 space-y-2.5 text-xs text-[#6e434e]">
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#ffe3eb] text-[#c23a5b] font-bold text-[11px] flex items-center justify-center shrink-0">
              1
            </span>
            <span>Envie a mensagem pronta na conversa do WhatsApp.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#ffe3eb] text-[#c23a5b] font-bold text-[11px] flex items-center justify-center shrink-0">
              2
            </span>
            <span>Aguarde a Raissa responder confirmando a data e o horário.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#ffe3eb] text-[#c23a5b] font-bold text-[11px] flex items-center justify-center shrink-0">
              3
            </span>
            <span>Seu momento de beleza estará oficialmente garantido!</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Reabrir WhatsApp da Raissa</span>
          </a>

          <button
            type="button"
            onClick={onNewBooking}
            className="w-full h-11 rounded-xl bg-[#fffafb] border border-[#f8a5b8] text-[#c23a5b] font-bold text-xs tracking-wider uppercase hover:bg-[#fff0f4] cursor-pointer transition-all"
          >
            Realizar Outro Agendamento
          </button>
        </div>
      </div>
    </div>
  );
};
