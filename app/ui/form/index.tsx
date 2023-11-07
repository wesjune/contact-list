'use client';

import { useRouter } from 'next/navigation';

import Button from '@/app/ui/components/button';
import Input from '@/app/ui/components/input';
import Label from '@/app/ui/components/label';
import styles from './styles.module.css';

export default function Form() {
  const router = useRouter();

  return (
    <form className={styles.form}>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="job">Job</Label>
        <Input id="job" />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="description">Description</Label>
        <Input id="description" />
      </div>
      <div className={styles.actions}>
        <Button type="button">Save</Button>
        <Button type="button" onClick={() => router.push('/')}>Cancel</Button>
      </div>
    </form>
  );
}
