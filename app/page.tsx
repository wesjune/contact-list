import ContactList from '@/app/ui/contact-list';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Contacts</h1>
      <ContactList />
    </main>
  );
}

export const dynamic = 'force-dynamic';
