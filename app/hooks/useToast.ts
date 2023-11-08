import { useToastContext } from '@/app/contexts/toast-context';

export function useToast() {
  const { setToast } = useToastContext();

  const toast = ({ message }: { message: string }) => {
    setToast({ message, open: true });

    setTimeout(() => {
      setToast({ message: '', open: false });
    }, 3000);
  };

  return { toast };
}
