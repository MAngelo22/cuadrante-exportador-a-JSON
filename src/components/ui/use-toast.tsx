import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definimos el tipo de las notificaciones
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}

// Creamos un contexto para manejar los toasts
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Proveedor de contexto para envolver la aplicación
interface ToastProviderProps {
  children: ReactNode; // Definimos el tipo de children como ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Función para agregar un toast
  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  };

  // Función para eliminar un toast
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <p>{toast.message}</p>
            <button onClick={() => removeToast(toast.id)}>X</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook para usar los toasts en otros componentes
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
