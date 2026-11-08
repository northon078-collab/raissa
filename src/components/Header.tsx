import React from 'react';
import { ArrowLeft, Instagram } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  onBack?: () => void;
  onGoHome?: () => void;
  instagramUrl: string;
  instagramHandle: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onBack,
  onGoHome,
  instagramUrl,
  instagramHandle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fff8fa]/95 backdrop-blur-md border-b border-[#f8c9d4] transition-all">
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Back button or decorative icon */}
        <div className="w-10 flex items-center">
          {currentStep > 0 && onBack ? (
            <button
              onClick={onBack}
              aria-label="Voltar etapa"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#c23a5b] hover:bg-[#ffe3eb] active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onGoHome}
              aria-label="Início"
              className="w-8 h-8 rounded-full border border-[#f5b3c2] flex items-center justify-center bg-[#fff0f4] text-[#c23a5b] text-xs font-serif font-bold tracking-wider hover:border-[#c23a5b] transition-colors"
            >
              RM
            </button>
          )}
        </div>

        {/* Center: Brand Name */}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center group cursor-pointer"
        >
          <span className="font-serif text-lg tracking-[0.25em] text-[#c23a5b] font-bold uppercase group-hover:text-[#e64980] transition-colors">
            RAISSA MAKEUP
          </span>
          <span className="text-[9px] tracking-[0.28em] text-[#d6336c] font-semibold uppercase -mt-0.5">
            Beleza & Agendamento
          </span>
        </button>

        {/* Right: Instagram link */}
        <div className="w-10 flex items-center justify-end">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar Instagram ${instagramHandle}`}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#c23a5b] hover:text-[#e64980] hover:bg-[#ffe3eb] active:scale-95 transition-all"
            title={instagramHandle}
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
