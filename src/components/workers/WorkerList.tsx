import { Worker } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit2Icon, Trash2Icon } from 'lucide-react';

interface WorkerListProps {
  workers: Worker[];
  onEdit: (worker: Worker) => void;
  onDelete: (workerId: string) => void;
}

export function WorkerList({ workers, onEdit, onDelete }: WorkerListProps) {
  return (
    <div className="rounded-lg border border-gray-700/50 bg-white/5 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700/50">
            <TableHead className="text-gray-300">Nombre</TableHead>
            <TableHead className="text-gray-300">Cargo</TableHead>
            <TableHead className="text-gray-300">Correo</TableHead>
            <TableHead className="text-gray-300">Teléfono</TableHead>
            <TableHead className="text-right text-gray-300">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.map((worker) => (
            <TableRow key={worker.id} className="border-gray-700/50">
              <TableCell className="font-medium text-gray-200">{worker.name}</TableCell>
              <TableCell className="text-gray-300">{worker.position}</TableCell>
              <TableCell className="text-gray-300">{worker.email}</TableCell>
              <TableCell className="text-gray-300">{worker.phone}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(worker)}
                  className="mr-2 hover:text-blue-400 text-gray-400"
                >
                  <Edit2Icon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(worker.id)}
                  className="hover:text-red-400 text-gray-400"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}