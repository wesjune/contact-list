import contacts from '@/app/lib/dummy-contacts.json';
import ContactListItem from './contact-list-item';
import styles from './styles.module.css';

export default function ContactList() {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}
