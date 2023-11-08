import { sql } from '@vercel/postgres';
import { Contact } from './definitions';

export async function fetchContacts() {
  try {
    const data = await sql<Contact>`SELECT * FROM contacts`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch contacts data.');
  }
}

export async function fetchContactById(id: string) {
  try {
    const data =
      await sql<Contact>`SELECT * FROM contacts WHERE contacts.id = ${id}`;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch contact.');
  }
}
