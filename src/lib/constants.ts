import { ShiftInfo } from '@/types';

export const SHIFT_INFO: Record<string, ShiftInfo> = {
  morning: {
    label: 'Mañana',
    hours: '8:00 a 16:00',
    color: 'bg-gradient-to-br from-blue-400/30 to-blue-600/30',
  },
  partial: {
    label: 'Parcial',
    hours: '9:00 a 18:00',
    color: 'bg-gradient-to-br from-emerald-400/30 to-emerald-600/30',
  },
  afternoon: {
    label: 'Tarde',
    hours: '16:00 a 20:00',
    color: 'bg-gradient-to-br from-orange-400/30 to-orange-600/30',
  },
  saturday: {
    label: 'Sábado',
    hours: '9:00 a 14:00',
    color: 'bg-gradient-to-br from-purple-400/30 to-purple-600/30',
  },
};