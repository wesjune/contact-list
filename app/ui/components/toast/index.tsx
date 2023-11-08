'use client';

import { useToastContext } from '@/app/contexts/toast-context';
import styles from './styles.module.css';

export default function Toast() {
  const { toast } = useToastContext();

  if (!toast.open) return null;

  return (
    <div role="alert" className={styles.toast}>
      <p>{toast.message}</p>
    </div>
  );
}
