import { updateContact } from '@/app/lib/actions';
import { fetchContactById } from '@/app/lib/data';
import Form from '@/app/ui/form';
import styles from './page.module.css';

export default async function EditContactPage({
  params,
}: {
  params: { id: string };
}) {
  const contact = await fetchContactById(params.id);
  const updateContactWithId = updateContact.bind(null, contact.id);

  return (
    <main className={styles.main}>
      <h1>Edit Contact</h1>
      <div className={styles.container}>
        <Form action={updateContactWithId} contact={contact} />
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
