'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { redirect, useRouter } from 'next/navigation';

import { useToast } from '@/app/hooks/useToast';
import { State } from '@/app/lib/actions';
import { Contact } from '@/app/lib/definitions';
import Button from '@/app/ui/components/button';
import Input from '@/app/ui/components/input';
import Label from '@/app/ui/components/label';
import styles from './styles.module.css';

export default function Form({
  action,
  contact,
}: {
  action: any;
  contact?: Contact;
}) {
  const router = useRouter();
  const initialState = { message: '', errors: {} };
  const [state, dispatch]: [state: State, dispatch: () => void] = useFormState(
    action,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state.success && state.message) {
      toast({ message: state.message });
      redirect('/');
    }
  }, [state.message, state.success, toast]);

  return (
    <form action={dispatch} className={styles.form}>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          name="first_name"
          defaultValue={contact?.first_name}
        />
        {state.errors?.first_name && (
          <p className={styles.errorMessage}>{state.errors.first_name[0]}</p>
        )}
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          name="last_name"
          defaultValue={contact?.last_name}
        />
        {state.errors?.last_name && (
          <p className={styles.errorMessage}>{state.errors.last_name[0]}</p>
        )}
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="job">Job</Label>
        <Input id="job" name="job" defaultValue={contact?.job} />
        {state.errors?.job && (
          <p className={styles.errorMessage}>{state.errors.job[0]}</p>
        )}
      </div>
      <div className={styles.inputWithLabel}>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          defaultValue={contact?.description}
        />
        {state.errors?.description && (
          <p className={styles.errorMessage}>{state.errors.description[0]}</p>
        )}
      </div>
      <div className={styles.actions}>
        <SubmitButton />
        <Button type="button" onClick={() => router.push('/')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function SubmitButton() {
  const status = useFormStatus();

  return (
    <Button type="submit" disabled={status.pending}>
      Save
    </Button>
  );
}
