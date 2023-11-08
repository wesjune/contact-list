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
