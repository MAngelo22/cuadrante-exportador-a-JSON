import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface CalendarHeaderProps {
  startDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export function CalendarHeader({ startDate, onPreviousWeek, onNextWeek }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" onClick={onPreviousWeek}>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <h2 className="text-xl font-semibold">
        Semana del {format(startDate, "d 'de' MMMM, yyyy", { locale: es })}
      </h2>
      <Button variant="outline" onClick={onNextWeek}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}