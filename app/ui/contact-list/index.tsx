import { fetchContacts } from '@/app/lib/data';
import List from './list';

export default async function ContactList() {
  const contacts = await fetchContacts();

  return <List contacts={contacts} />;
}
