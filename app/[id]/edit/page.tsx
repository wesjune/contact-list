import Form from '@/app/ui/form';
import styles from './page.module.css';

export default function EditContactPage() {
  return (
    <main className={styles.main}>
      <h1>Edit Contact</h1>
      <div className={styles.container}>
        <Form />
      </div>
    </main>
  );
}
