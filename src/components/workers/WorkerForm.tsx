import { useState } from 'react';
import { Worker } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface WorkerFormProps {
  worker?: Worker;
  onSubmit: (worker: Omit<Worker, 'id'>) => void;
}

export function WorkerForm({ worker, onSubmit }: WorkerFormProps) {
  const [formData, setFormData] = useState({
    name: worker?.name || '',
    email: worker?.email || '',
    position: worker?.position || '',
    phone: worker?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 bg-gray-800/95 border-gray-700/50">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">
        {worker ? 'Editar Empleado' : 'Nuevo Empleado'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-200">Nombre</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position" className="text-gray-200">Cargo</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
            className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-200">Teléfono</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
          />
        </div>
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          {worker ? 'Actualizar' : 'Añadir'}
        </Button>
      </form>
    </Card>
  );
}