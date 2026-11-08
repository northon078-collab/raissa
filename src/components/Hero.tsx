import React from 'react';
import { Instagram, CalendarCheck, Clock, Heart, Award } from 'lucide-react';

interface HeroProps {
  onStartBooking: () => void;
  instagramUrl: string;
  instagramHandle: string;
}

export const Hero: React.FC<HeroProps> = ({
  onStartBooking,
  instagramUrl,
  instagramHandle,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 px-4">
      {/* Delicate background decorative pink glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-gradient-to-b from-[#fed7e2]/80 via-[#ffe4ec]/50 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Monogram Badge RM */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#ffffff] to-[#fff0f4] border-2 border-[#f7aab9] flex items-center justify-center shadow-soft relative">
            <div className="w-16 h-16 rounded-full border border-[#fbb6ce] flex items-center justify-center bg-white/70">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#c23a5b] ml-1">
                RM
              </span>
            </div>
          </div>
        </div>

        {/* Brand Name Title com tom de rosa vibrante */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.22em] text-[#c23a5b] uppercase mb-2">
          RAISSA MAKEUP
        </h1>

        {/* Delicate divider with champagne star */}
        <div className="flex items-center justify-center gap-3 w-48 my-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#f49db1]" />
          <span className="text-[#d4af37] text-xs">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#f49db1]" />
        </div>

        {/* Frase Principal */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#d6336c] font-semibold max-w-sm mb-3">
          &ldquo;Realçando sua beleza em cada detalhe!&rdquo;
        </p>

        {/* Breve chamada */}
        <p className="text-sm sm:text-base text-[#6f424c] max-w-md leading-relaxed mb-8 font-medium">
          Escolha seu serviço e agende seu horário de forma rápida e fácil.
        </p>

        {/* Botões de Ação Principais */}
        <div className="w-full max-w-sm flex flex-col gap-3.5 mb-10">
          {/* Botão Principal: AGENDAR MEU HORÁRIO */}
          <button
            onClick={onStartBooking}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#e64980] to-[#c23a5b] hover:from-[#f06595] hover:to-[#d6336c] text-white font-semibold text-base tracking-wide uppercase shadow-lg shadow-[#e64980]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5 text-white" />
            <span>AGENDAR MEU HORÁRIO</span>
          </button>

          {/* Botão Oficial: CONHEÇA MEU INSTAGRAM */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-2xl bg-[#ffffff] border-2 border-[#f7aab9] text-[#c23a5b] font-semibold text-sm tracking-wider uppercase hover:bg-[#fff0f4] hover:border-[#e64980] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Instagram className="w-4 h-4 text-[#e64980]" />
            <span>CONHEÇA MEU INSTAGRAM</span>
          </a>
        </div>

        {/* Destaques de Atendimento */}
        <div className="w-full grid grid-cols-3 gap-2.5 pt-4 border-t border-[#f8c9d4]">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/90 border border-[#fbd2dc] shadow-2xs">
            <Heart className="w-5 h-5 text-[#e64980] mb-1.5" />
            <span className="font-serif font-bold text-xs text-[#a61e4d] text-center">
              Atendimento Único
            </span>
            <span className="text-[10px] text-[#784c55] text-center mt-0.5">
              Cuidado em cada traço
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/90 border border-[#fbd2dc] shadow-2xs">
            <Award className="w-5 h-5 text-[#d4af37] mb-1.5" />
            <span className="font-serif font-bold text-xs text-[#a61e4d] text-center">
              Produtos Premium
            </span>
            <span className="text-[10px] text-[#784c55] text-center mt-0.5">
              Alta fixação & blindagem
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/90 border border-[#fbd2dc] shadow-2xs">
            <Clock className="w-5 h-5 text-[#e64980] mb-1.5" />
            <span className="font-serif font-bold text-xs text-[#a61e4d] text-center">
              Pontualidade
            </span>
            <span className="text-[10px] text-[#784c55] text-center mt-0.5">
              Horários organizados
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
