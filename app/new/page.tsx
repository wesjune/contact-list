import { addContact } from '@/app/lib/actions';
import Form from '@/app/ui/form';
import styles from './page.module.css';

export default function NewContactPage() {
  return (
    <main className={styles.main}>
      <h1>New Contact</h1>
      <div className={styles.container}>
        <Form action={addContact} />
      </div>
    </main>
  );
}
