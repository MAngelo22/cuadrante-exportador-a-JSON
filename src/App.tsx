import { useState } from 'react';
import { Worker, Schedule } from '@/types';
import { WorkerForm } from '@/components/workers/WorkerForm';
import { WorkerList } from '@/components/workers/WorkerList';
import { Calendar } from '@/components/schedule/Calendar';
import { ImportExportButtons } from '@/components/data/ImportExportButtons';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlusIcon } from 'lucide-react';

// Datos iniciales de ejemplo
const initialWorkers: Worker[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    position: 'Gerente',
    phone: '555-0123',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@ejemplo.com',
    position: 'Personal',
    phone: '555-0124',
  },
];

export default function App() {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editingWorker, setEditingWorker] = useState<Worker | undefined>();

  const handleWorkerSubmit = (workerData: Omit<Worker, 'id'>) => {
    if (editingWorker) {
      setWorkers(workers.map(w => 
        w.id === editingWorker.id ? { ...workerData, id: editingWorker.id } : w
      ));
      setEditingWorker(undefined);
    } else {
      setWorkers([...workers, { ...workerData, id: crypto.randomUUID() }]);
    }
  };

  const handleWorkerDelete = (workerId: string) => {
    setWorkers(workers.filter(w => w.id !== workerId));
    setSchedules(schedules.filter(s => !s.workerIds.includes(workerId)));
  };

  const handleScheduleUpdate = (schedule: Schedule) => {
    setSchedules(prev => {
      const existing = prev.find(s => 
        s.date === schedule.date && s.shift === schedule.shift
      );
      
      // If all workerIds are unassigned, remove the schedule
      if (schedule.workerIds.every(id => !id || id === 'unassigned')) {
        return prev.filter(s => s.id !== existing?.id);
      }
      
      if (existing) {
        return prev.map(s => 
          s.id === existing.id ? schedule : s
        );
      }
      return [...prev, schedule];
    });
  };

  const handleDataImport = (newWorkers: Worker[], newSchedules: Schedule[]) => {
    setWorkers(newWorkers);
    setSchedules(newSchedules);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          <PageHeader title="Planificador de Turnos">
            <ImportExportButtons
              workers={workers}
              schedules={schedules}
              onDataImport={handleDataImport}
            />
          </PageHeader>
          
          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="w-full justify-center bg-white/5 backdrop-blur-sm">
              <TabsTrigger value="schedule" className="flex-1 max-w-[200px] data-[state=active]:bg-white/10">
                Calendario
              </TabsTrigger>
              <TabsTrigger value="workers" className="flex-1 max-w-[200px] data-[state=active]:bg-white/10">
                Personal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-6">
              <Calendar
                workers={workers}
                schedules={schedules}
                onScheduleUpdate={handleScheduleUpdate}
              />
            </TabsContent>

            <TabsContent value="workers" className="space-y-6">
              <div className="flex justify-end mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <UserPlusIcon className="mr-2 h-4 w-4" />
                      Añadir Empleado
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800/95 backdrop-blur-sm border-gray-700">
                    <WorkerForm onSubmit={handleWorkerSubmit} />
                  </DialogContent>
                </Dialog>
              </div>

              <WorkerList
                workers={workers}
                onEdit={setEditingWorker}
                onDelete={handleWorkerDelete}
              />

              {editingWorker && (
                <Dialog open={!!editingWorker} onOpenChange={() => setEditingWorker(undefined)}>
                  <DialogContent className="bg-gray-800/95 backdrop-blur-sm border-gray-700">
                    <WorkerForm
                      worker={editingWorker}
                      onSubmit={handleWorkerSubmit}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}