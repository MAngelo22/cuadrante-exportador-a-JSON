import { useState } from 'react';
import { startOfWeek, addDays, isSameDay } from 'date-fns';
import { Worker, Schedule, ShiftType } from '@/types';
import { Card } from '@/components/ui/card';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { ShiftLegend } from './ShiftLegend';
import { SHIFT_INFO } from '@/lib/constants';

interface CalendarProps {
  workers: Worker[];
  schedules: Schedule[];
  onScheduleUpdate: (schedule: Schedule) => void;
}

export function Calendar({ workers, schedules, onScheduleUpdate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate);
  const shifts: ShiftType[] = ['morning', 'partial', 'afternoon', 'saturday'];
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getScheduleForDateAndShift = (date: Date, shift: Schedule['shift']) => {
    return schedules.find(
      (s) => isSameDay(new Date(s.date), date) && s.shift === shift
    );
  };

  return (
    <Card className="p-6">
      <CalendarHeader
        startDate={startDate}
        onPreviousWeek={() => setCurrentDate(addDays(currentDate, -7))}
        onNextWeek={() => setCurrentDate(addDays(currentDate, 7))}
      />
      <ShiftLegend />
      <CalendarGrid
        weekDays={weekDays}
        shifts={shifts}
        workers={workers}
        getScheduleForDateAndShift={getScheduleForDateAndShift}
        onScheduleUpdate={onScheduleUpdate}
        shiftInfo={SHIFT_INFO}
      />
    </Card>
  );
}