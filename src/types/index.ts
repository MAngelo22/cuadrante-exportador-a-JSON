export interface Worker {
  id: string;
  name: string;
  email: string;
  position: string;
  phone: string;
  avatar?: string;
}

export type ShiftType = 'morning' | 'afternoon' | 'partial' | 'saturday';

export interface ShiftInfo {
  label: string;
  hours: string;
  color: string;
}

export interface Schedule {
  id: string;
  workerIds: string[]; // Changed from workerId to workerIds array
  date: string;
  shift: ShiftType;
}