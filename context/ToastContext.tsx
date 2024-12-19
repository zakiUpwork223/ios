// ToastContext.ts
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ToastCustom from '../screens/components/ToastCustom';
import { Portal } from 'react-native-paper';

type ToastType = 'info' | 'error';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = React.createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de un ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as ToastType });

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type }), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Portal>
        <ToastCustom visible={toast.visible} message={toast.message} type={toast.type} />
      </Portal>
    </ToastContext.Provider>
  );
};

export { ToastContext };
