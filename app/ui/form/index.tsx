'use client';

import { useRouter } from 'next/navigation';

import Button from '@/app/ui/components/button';
import Input from '@/app/ui/components/input';
import Label from '@/app/ui/components/label';
import styles from './styles.module.css';

export default function Form({
  action,
}: {
  action: string | ((formData: FormData) => void) | undefined;
}) {
  const router = useRouter();

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" name="first_name" />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" name="last_name" />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="job">Job</Label>
        <Input id="job" name="job" />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" />
      </div>
      <div className={styles.actions}>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={() => router.push('/')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
