'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ToastContextInterface {
  toast: {
    message: string;
    open: boolean;
  };
  setToast: Dispatch<SetStateAction<{ message: string; open: boolean }>>;
}

export const ToastContext = createContext<ToastContextInterface>({
  toast: { message: '', open: false },
  setToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState({ message: '', open: false });

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useContext(ToastContext);
