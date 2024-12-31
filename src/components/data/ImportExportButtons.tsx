import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Worker, Schedule } from '@/types';
import { exportData, importData } from '@/lib/storage';
import { SaveIcon, UploadIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImportExportButtonsProps {
  workers: Worker[];
  schedules: Schedule[];
  onDataImport: (workers: Worker[], schedules: Schedule[]) => void;
}

export function ImportExportButtons({
  workers,
  schedules,
  onDataImport,
}: ImportExportButtonsProps) {
  const [importing, setImporting] = useState(false);

  const handleExport = () => {
    const jsonData = exportData(workers, schedules);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planificador-turnos-${
      new Date().toISOString().split('T')[0]
    }.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Los datos se han guardado correctamente');
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const text = await file.text();
      const { workers, schedules } = importData(text);
      onDataImport(workers, schedules);
      toast.success('Los datos se han cargado correctamente');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleExport}
        className="flex items-center gap-2"
      >
        <SaveIcon className="h-4 w-4" />
        Exportar
      </Button>

      <label className="cursor-pointer">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          disabled={importing}
        >
          <UploadIcon className="h-4 w-4" />
          Importar
        </Button>
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
          disabled={importing}
        />
      </label>
    </div>
  );
}