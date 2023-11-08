'use client';

import { useRouter } from 'next/navigation';

import { Contact } from '@/app/lib/definitions';
import Button from '@/app/ui/components/button';
import Input from '@/app/ui/components/input';
import Label from '@/app/ui/components/label';
import styles from './styles.module.css';

export default function Form({
  action,
  contact,
}: {
  action: string | ((formData: FormData) => void) | undefined;
  contact?: Contact;
}) {
  const router = useRouter();

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          name="first_name"
          defaultValue={contact?.first_name}
        />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          name="last_name"
          defaultValue={contact?.last_name}
        />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="job">Job</Label>
        <Input id="job" name="job" defaultValue={contact?.job} />
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          defaultValue={contact?.description}
        />
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
