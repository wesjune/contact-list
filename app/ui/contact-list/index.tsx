import { fetchContacts } from '@/app/lib/data';
import ContactListItem from './contact-list-item';
import styles from './styles.module.css';

export default async function ContactList() {
  const contacts = await fetchContacts();

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}
