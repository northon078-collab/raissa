import { ServiceItem, BusinessSettings, AppointmentRecord } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  // MAQUIAGEM
  {
    id: 'make-com-cilios',
    name: 'Maquiagem com cílios postiços',
    category: 'maquiagem',
    price: 85,
    formattedPrice: 'R$ 85,00',
    durationMinutes: 60,
    description: 'Preparação completa de pele blindada, esfumado elegante e aplicação de cílios postiços de alto impacto.',
  },
  {
    id: 'make-sem-cilios',
    name: 'Maquiagem sem cílios postiços',
    category: 'maquiagem',
    price: 75,
    formattedPrice: 'R$ 75,00',
    durationMinutes: 50,
    description: 'Pele impecável de longa duração, contorno suave, iluminação e realce natural do olhar.',
  },

  // SOBRANCELHAS
  {
    id: 'design-sobrancelha',
    name: 'Design de sobrancelha',
    category: 'sobrancelhas',
    price: 25,
    formattedPrice: 'R$ 25,00',
    durationMinutes: 30,
    description: 'Alinhamento e mapeamento facial personalizado para valorizar o desenho natural dos seus fios.',
  },
  {
    id: 'design-sobrancelha-henna',
    name: 'Design de sobrancelha com henna',
    category: 'sobrancelhas',
    price: 35,
    formattedPrice: 'R$ 35,00',
    durationMinutes: 45,
    description: 'Mapeamento facial com aplicação de henna para preenchimento de falhas e destaque do olhar.',
  },
  {
    id: 'design-sem-henna-buco',
    name: 'Design de sobrancelha sem henna + buço',
    category: 'sobrancelhas',
    price: 35,
    formattedPrice: 'R$ 35,00',
    durationMinutes: 40,
    description: 'Design detalhado das sobrancelhas combinado com a depilação suave da região do buço.',
  },
  {
    id: 'design-com-henna-buco',
    name: 'Design de sobrancelha com henna + buço',
    category: 'sobrancelhas',
    price: 45,
    formattedPrice: 'R$ 45,00',
    durationMinutes: 50,
    description: 'Combo completo de design com henna e depilação do buço com acabamento delicado.',
  },
  {
    id: 'depilacao-buco-queixo',
    name: 'Depilação de buço + queixo',
    category: 'sobrancelhas',
    price: 20,
    formattedPrice: 'R$ 20,00',
    durationMinutes: 25,
    description: 'Remoção delicada dos pelos faciais do buço e queixo com técnica suave para a pele.',
  },
  {
    id: 'depilacao-buco',
    name: 'Depilação de buço',
    category: 'sobrancelhas',
    price: 10,
    formattedPrice: 'R$ 10,00',
    durationMinutes: 15,
    description: 'Depilação rápida e precisa da região do buço para uma pele macia e uniforme.',
  },

  // PENTEADOS
  {
    id: 'trancas-nago',
    name: 'Tranças nagô',
    category: 'penteados',
    price: 25,
    formattedPrice: 'A partir de R$ 25,00',
    isStartingPrice: true,
    priceNote: 'O preço começa em R$ 25,00 e pode variar conforme o modelo e espessura desejados.',
    durationMinutes: 90,
    description: 'Trançado rente ao couro cabeludo com acabamento refinado e alta durabilidade.',
  },
  {
    id: 'cachos',
    name: 'Cachos',
    category: 'penteados',
    price: 50,
    formattedPrice: 'R$ 50,00',
    durationMinutes: 45,
    description: 'Definição elegante com modelagem térmica de ondas ou cachos brilhantes de alta fixação.',
  },
  {
    id: 'penteado',
    name: 'Penteado',
    category: 'penteados',
    price: 60,
    formattedPrice: 'R$ 60,00',
    durationMinutes: 60,
    description: 'Penteados presos, semi-presos ou modernos para ocasiões especiais, festas e eventos.',
  },
];

export const DEFAULT_SETTINGS: BusinessSettings = {
  whatsappNumber: '5518996732692',
  instagramHandle: '@raissa_makeup._',
  instagramUrl: 'https://www.instagram.com/raissa_makeup._/',
  openDays: [0, 1, 2, 3, 4, 5, 6], // Domingo (0) a Sábado (6) - Todos os dias
  startHour: '09:30',
  endHour: '18:30',
  intervalMinutes: 30,
  blockedDates: [],
  blockedSlots: {},
};

const STORAGE_KEYS = {
  SETTINGS: 'raissa_makeup_settings_v3',
  SERVICES: 'raissa_makeup_services_v1',
  APPOINTMENTS: 'raissa_makeup_appointments_v1',
};

export const loadStoredSettings = (): BusinessSettings => {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEYS.SETTINGS) ||
      localStorage.getItem('raissa_makeup_settings_v2');
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    const storedOpenDays = Array.isArray(parsed.openDays)
      ? parsed.openDays
      : DEFAULT_SETTINGS.openDays;
    // Garante que Domingo (0) e Segunda (1) estejam inclusos como solicitado
    const mergedOpenDays = Array.from(new Set([...storedOpenDays, 0, 1])).sort((a, b) => a - b);
    return { ...DEFAULT_SETTINGS, ...parsed, openDays: mergedOpenDays };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings: BusinessSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
};

export const loadStoredServices = (): ServiceItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) return INITIAL_SERVICES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SERVICES;
  } catch {
    return INITIAL_SERVICES;
  }
};

export const saveStoredServices = (services: ServiceItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  } catch (e) {
    console.error('Failed to save services to localStorage', e);
  }
};

export const loadStoredAppointments = (): AppointmentRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveNewAppointment = (record: AppointmentRecord): void => {
  try {
    const current = loadStoredAppointments();
    const updated = [record, ...current].slice(0, 100);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to record appointment', e);
  }
};
