'use client';

import Link from 'next/link';
import Button from '@/app/ui/components/button';
import styles from './page.module.css';

export default function Error() {
  return (
    <main className={styles.error}>
      <h2>404 Not Found</h2>
      <p>Could not find the contact.</p>
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
    </main>
  );
}
