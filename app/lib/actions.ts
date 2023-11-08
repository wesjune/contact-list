'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ContactSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  job: z.string(),
  description: z.string(),
});

const AddContact = ContactSchema.omit({ id: true });

export async function addContact(formData: FormData) {
  const { first_name, last_name, job, description } = AddContact.parse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    job: formData.get('job'),
    description: formData.get('description'),
  });

  try {
    await sql`INSERT INTO contacts (first_name, last_name, job, description)
    VALUES (${first_name}, ${last_name}, ${job}, ${description})`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create contact.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

const UpdateContact = ContactSchema.omit({ id: true });

export async function updateContact(id: string, formData: FormData) {
  const { first_name, last_name, job, description } = UpdateContact.parse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    job: formData.get('job'),
    description: formData.get('description'),
  });

  try {
    await sql`
    UPDATE contacts
    SET first_name = ${first_name}, 
        last_name = ${last_name}, 
        job = ${job}, 
        description = ${description}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update contact.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function deleteContact(id: string) {
  try {
    await sql`DELETE FROM contacts WHERE id = ${id}`;
    revalidatePath('/');
    return { message: 'Deleted contact.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete contact.',
    };
  }
}
