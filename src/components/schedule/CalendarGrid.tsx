import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Worker, Schedule, ShiftType, ShiftInfo } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface CalendarGridProps {
  weekDays: Date[];
  shifts: ShiftType[];
  workers: Worker[];
  shiftInfo: Record<string, ShiftInfo>;
  getScheduleForDateAndShift: (date: Date, shift: Schedule['shift']) => Schedule | undefined;
  onScheduleUpdate: (schedule: Schedule) => void;
}

export function CalendarGrid({ 
  weekDays, 
  shifts, 
  workers, 
  shiftInfo,
  getScheduleForDateAndShift,
  onScheduleUpdate 
}: CalendarGridProps) {
  const isSaturday = (date: Date) => date.getDay() === 6;

  const handleWorkerSelect = (
    workerId: string, 
    date: Date, 
    shift: ShiftType, 
    position: number,
    currentSchedule?: Schedule
  ) => {
    const otherWorkerId = currentSchedule?.workerIds?.[position === 0 ? 1 : 0] || '';
    const newWorkerIds = position === 0 
      ? [workerId, otherWorkerId]
      : [otherWorkerId, workerId];

    // Validate that the same worker is not selected twice
    if (workerId !== 'unassigned' && newWorkerIds[0] === newWorkerIds[1]) {
      toast.error('No se puede asignar el mismo trabajador dos veces');
      return;
    }

    onScheduleUpdate({
      id: currentSchedule?.id || crypto.randomUUID(),
      workerIds: newWorkerIds,
      date: date.toISOString(),
      shift,
    });
  };

  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-1"></div>
      {weekDays.map((day) => (
        <div key={day.toString()} className="text-center font-medium text-gray-200">
          {format(day, 'EEE', { locale: es })}<br />
          {format(day, "d MMM", { locale: es })}
        </div>
      ))}

      {shifts.map((shift) => (
        <div key={shift} className="contents">
          <div className="font-medium text-gray-200">
            {shiftInfo[shift].label}
          </div>
          {weekDays.map((day) => {
            const schedule = getScheduleForDateAndShift(day, shift);
            const isShiftAvailable = shift !== 'saturday' || isSaturday(day);

            return (
              <div 
                key={`${day.toISOString()}-${shift}`} 
                className={`flex flex-col gap-2 min-h-[100px] p-2 rounded-lg border border-gray-700/50 ${shiftInfo[shift].color} 
                  ${!isShiftAvailable ? 'opacity-50' : 'hover:shadow-md transition-shadow'}
                  ${schedule?.workerIds?.some(id => id) ? 'ring-2 ring-blue-500/20' : ''}`}
              >
                {isShiftAvailable && (
                  <>
                    <Select
                      value={schedule?.workerIds?.[0] || 'unassigned'}
                      onValueChange={(workerId) => handleWorkerSelect(workerId, day, shift, 0, schedule)}
                    >
                      <SelectTrigger className="w-full bg-white/10 border-0 text-gray-200">
                        <SelectValue placeholder="Trabajador 1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Sin asignar</SelectItem>
                        {workers.map((worker) => (
                          <SelectItem key={worker.id} value={worker.id}>
                            {worker.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={schedule?.workerIds?.[1] || 'unassigned'}
                      onValueChange={(workerId) => handleWorkerSelect(workerId, day, shift, 1, schedule)}
                    >
                      <SelectTrigger className="w-full bg-white/10 border-0 text-gray-200">
                        <SelectValue placeholder="Trabajador 2" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Sin asignar</SelectItem>
                        {workers.map((worker) => (
                          <SelectItem key={worker.id} value={worker.id}>
                            {worker.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}