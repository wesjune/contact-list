import { deleteContact } from '@/app/lib/actions';
import { Contact } from '@/app/lib/definitions';
import Button from '@/app/ui/components/button';
import styles from './styles.module.css';

export default function ContactListItem({ contact }: { contact: Contact }) {
  const deleteContactWithId = deleteContact.bind(null, contact.id);

  return (
    <li>
      <div className={styles.listItem}>
        <p
          className={styles.name}
        >{`${contact.first_name} ${contact.last_name}`}</p>
        <p>Job: {contact.job}</p>
        <p>Description: {contact.description}</p>
        <div className={styles.actions}>
          <Button asLink href={`/${contact.id}/edit`}>
            Edit
          </Button>
          <form action={deleteContactWithId}>
            <Button className={styles.deleteButton}>Delete</Button>
          </form>
        </div>
      </div>
    </li>
  );
}
