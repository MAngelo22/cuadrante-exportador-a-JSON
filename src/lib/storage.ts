import { Worker, Schedule } from '@/types';

export interface AppData {
  workers: Worker[];
  schedules: Schedule[];
}

export function exportData(workers: Worker[], schedules: Schedule[]): string {
  const data: AppData = { workers, schedules };
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): AppData {
  try {
    const data = JSON.parse(jsonString) as AppData;
    if (!isValidAppData(data)) {
      throw new Error('Formato de datos inválido');
    }
    return data;
  } catch (error) {
    throw new Error('Error al importar datos: ' + (error as Error).message);
  }
}

function isValidAppData(data: any): data is AppData {
  return (
    data &&
    Array.isArray(data.workers) &&
    Array.isArray(data.schedules) &&
    data.workers.every((w: any) =>
      ['id', 'name', 'email', 'position', 'phone'].every(key => key in w)
    ) &&
    data.schedules.every((s: any) =>
      ['id', 'workerId', 'date', 'shift'].every(key => key in s)
    )
  );
}