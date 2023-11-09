'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, 'Please enter the first name.'),
  last_name: z.string().min(1, 'Please enter the last name.'),
  job: z.string().min(1, 'Please enter the job.'),
  description: z.string().min(1, 'Please enter the description.'),
});

export type State = {
  errors?: {
    first_name?: string[];
    last_name?: string[];
    job?: string[];
    description?: string[];
  };
  message?: string | null;
  success?: boolean;
};

const AddContact = FormSchema.omit({ id: true });

export async function addContact(prevState: State, formData: FormData) {
  const validatedFields = AddContact.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    job: formData.get('job'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to add contact.',
    };
  }

  const { first_name, last_name, job, description } = validatedFields.data;

  try {
    await sql`INSERT INTO contacts (first_name, last_name, job, description)
    VALUES (${first_name}, ${last_name}, ${job}, ${description})`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create contact.',
    };
  }

  revalidatePath('/');
  return { success: true, message: 'New contact added.' };
}

const UpdateContact = FormSchema.omit({ id: true });

export async function updateContact(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateContact.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    job: formData.get('job'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update contact.',
    };
  }

  const { first_name, last_name, job, description } = validatedFields.data;

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
  return { success: true, message: 'Successfully updated contact.' };
}

export async function deleteContact(id: string) {
  try {
    await sql`DELETE FROM contacts WHERE id = ${id}`;
    revalidatePath('/');
    return { success: true, message: 'Deleted contact.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete contact.',
    };
  }
}
