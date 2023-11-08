import Link from 'next/link';
import Button from '@/app/ui/components/button';
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <span>Contact List</span>
      </Link>
      <Button asLink href="/new">
        Add Contact
      </Button>
    </header>
  );
}
