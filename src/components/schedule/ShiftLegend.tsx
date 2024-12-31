import { SHIFT_INFO } from '@/lib/constants';

export function ShiftLegend() {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
      {Object.entries(SHIFT_INFO).map(([key, info]) => (
        <div key={key} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${info.color} shadow-lg`} />
          <span className="font-medium text-gray-200">{info.label}</span>
          <span className="text-sm text-gray-400">({info.hours})</span>
        </div>
      ))}
    </div>
  );
}