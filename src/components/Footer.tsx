import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  instagramUrl: string;
  instagramHandle: string;
  whatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({
  instagramUrl,
  instagramHandle,
  whatsappNumber,
}) => {
  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5518996732692';

  return (
    <footer className="w-full bg-[#fdebf0] border-t border-[#f7c2ce] pt-10 pb-8 px-4 mt-12 text-[#68414b]">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Monogram Badge */}
        <div className="w-12 h-12 rounded-full border border-[#f5b3c2] bg-white flex items-center justify-center text-[#c23a5b] font-serif font-bold text-base mb-3 shadow-2xs">
          RM
        </div>

        {/* Brand Name */}
        <h3 className="font-serif text-lg font-bold tracking-[0.25em] text-[#c23a5b] uppercase">
          RAISSA MAKEUP
        </h3>

        {/* Slogan */}
        <p className="font-serif italic text-sm text-[#d6336c] mt-1 mb-5">
          Realçando sua beleza em cada detalhe!
        </p>

        {/* Social and Direct Links */}
        <div className="flex items-center gap-3 mb-6">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#f3bac7] text-[#a61e4d] text-xs font-medium hover:border-[#d6336c] hover:bg-[#fff5f7] shadow-2xs transition-all"
          >
            <Instagram className="w-4 h-4 text-[#d6336c]" />
            <span>{instagramHandle}</span>
          </a>

          <a
            href={`https://wa.me/${cleanNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#f3bac7] text-[#2a6d48] text-xs font-medium hover:border-[#25d366] hover:bg-[#fff5f7] shadow-2xs transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25d366]" />
            <span>(18) 99673-2692</span>
          </a>
        </div>

        {/* Subtle separator */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#e6758e] to-transparent my-2" />

        {/* Copyright */}
        <div className="pt-3 text-[11px] text-[#8e606c]">
          <p>© {new Date().getFullYear()} Raissa Makeup. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
