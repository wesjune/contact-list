'use client';

import { useMemo, useState } from 'react';
import { Contact } from '@/app/lib/definitions';
import Button from '@/app/ui/components/button';
import ContactListItem from './contact-list-item';
import styles from './styles.module.css';

export default function List({ contacts }: { contacts: Contact[] }) {
  const [isAscending, setIsAscending] = useState(true);

  const sortedContacts = useMemo(() => {
    if (!isAscending) {
      return contacts.toSorted((a, b) =>
        b.first_name.localeCompare(a.first_name)
      );
    }

    return contacts.toSorted((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
  }, [contacts, isAscending]);

  return (
    <>
      <Button onClick={() => setIsAscending(!isAscending)}>
        {isAscending ? 'Asc' : 'Desc'}
      </Button>
      <ul className={styles.list}>
        {sortedContacts.map(contact => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </>
  );
}
