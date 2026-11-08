import React, { useState } from 'react';
import { User, Phone, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { formatPhoneNumber } from '../utils/formatters';

interface ClientFormProps {
  clientName: string;
  clientPhone: string;
  clientNotes: string;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
  onChangeNotes: (notes: string) => void;
  onProceedToSummary?: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  clientName,
  clientPhone,
  clientNotes,
  onChangeName,
  onChangePhone,
  onChangeNotes,
  onProceedToSummary,
}) => {
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChangePhone(formatted);
  };

  const isNameValid = clientName.trim().length >= 3;
  const phoneDigits = clientPhone.replace(/\D/g, '');
  const isPhoneValid = phoneDigits.length >= 10;
  const isFormValid = isNameValid && isPhoneValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (isFormValid) {
      onProceedToSummary?.();
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4 pt-6 pb-12 relative">
      {/* Step Heading */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#e64980] uppercase">
          Etapa 4 de 5
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#c23a5b] mt-1 mb-2">
          Seus Dados de Contato
        </h2>
        <p className="text-xs sm:text-sm text-[#734b55] max-w-md mx-auto">
          Informe seu nome, WhatsApp e qualquer observação importante para personalizarmos seu atendimento.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-[#fbd2dc] p-5 sm:p-7 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nome Completo */}
          <div>
            <label
              htmlFor="clientName"
              className="block text-xs font-bold uppercase tracking-wider text-[#a61e4d] mb-1.5"
            >
              Nome Completo <span className="text-[#e64980]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#e64980]">
                <User className="w-5 h-5" />
              </div>
              <input
                id="clientName"
                type="text"
                autoComplete="name"
                value={clientName}
                onChange={(e) => onChangeName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                placeholder="Ex: Maria Eduarda Silva"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-[#fffafb] border text-base text-[#2b1e22] placeholder:text-[#bda0a8] focus:outline-none transition-all ${
                  touched.name && !isNameValid
                    ? 'border-red-400 bg-red-50/40 ring-2 ring-red-200'
                    : 'border-[#fbd2dc] focus:border-[#e64980] focus:bg-white focus:ring-2 focus:ring-[#e64980]/20'
                }`}
              />
            </div>
            {touched.name && !isNameValid && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Por favor, informe seu nome completo (mínimo 3 caracteres).</span>
              </p>
            )}
          </div>

          {/* Campo Telefone com DDD */}
          <div>
            <label
              htmlFor="clientPhone"
              className="block text-xs font-bold uppercase tracking-wider text-[#a61e4d] mb-1.5"
            >
              Telefone / WhatsApp com DDD <span className="text-[#e64980]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#e64980]">
                <Phone className="w-5 h-5" />
              </div>
              <input
                id="clientPhone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={clientPhone}
                onChange={handlePhoneChange}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                placeholder="(18) 99999-9999"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-[#fffafb] border text-base text-[#2b1e22] placeholder:text-[#bda0a8] focus:outline-none transition-all tabular-nums ${
                  touched.phone && !isPhoneValid
                    ? 'border-red-400 bg-red-50/40 ring-2 ring-red-200'
                    : 'border-[#fbd2dc] focus:border-[#e64980] focus:bg-white focus:ring-2 focus:ring-[#e64980]/20'
                }`}
              />
            </div>
            {touched.phone && !isPhoneValid && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Informe seu número com DDD (Ex: 18 99673-2692).</span>
              </p>
            )}
          </div>

          {/* Campo Observações (Opcional) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="clientNotes"
                className="block text-xs font-bold uppercase tracking-wider text-[#a61e4d]"
              >
                Observações
              </label>
              <span className="text-[11px] text-[#9c6a76] font-medium">Opcional</span>
            </div>
            <div className="relative">
              <div className="absolute top-3.5 left-4 pointer-events-none text-[#e64980]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="clientNotes"
                rows={3}
                value={clientNotes}
                onChange={(e) => onChangeNotes(e.target.value)}
                placeholder="Ex: Tenho alergia a algum produto, desejo um penteado para festa à noite, detalhes sobre espessura da trança nagô, etc."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#fffafb] border border-[#fbd2dc] text-sm text-[#2b1e22] placeholder:text-[#bda0a8] focus:outline-none focus:border-[#e64980] focus:bg-white focus:ring-2 focus:ring-[#e64980]/20 transition-all resize-none"
              />
            </div>
            <p className="mt-1 text-[11px] text-[#8e5c67]">
              Adicione qualquer detalhe ou preferência para a maquiadora já ficar ciente.
            </p>
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-2xl bg-[#fff0f4] border border-[#fcc2d7] flex items-center gap-2.5 text-xs text-[#a61e4d] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#e64980] shrink-0" />
            <span>
              Sem necessidade de cadastro. Seus dados são utilizados exclusivamente para preencher sua mensagem de agendamento.
            </span>
          </div>
        </form>
      </div>

    </section>
  );
};
