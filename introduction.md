# Introduction

Introduction and challenges.

## Tech stack

- **Next.js 14** - framework
- **React 18** - user interfaces
- **CSS Modules** - styling
- **TypeScript** - programming language
- **Zod** - validation
- **React Testing Library** - testing
- **PostgreSQL** - database

## Forms and mutations

### Mutating data

Typically, we would create a new file in the `api/` directory.

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const id = await addContact(data);
  res.status(200).json({ id });
}
```

Then, on the client side, we could use an event handler like `onSubmit` to make a `fetch` to our API route.

```typescript
import { FormEvent } from 'react';

export default function Form() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    // ...
  }

  return <form onSubmit={onSubmit}>...</form>;
}
```

With Server Actions, we don't need to manually create API endpoints. Instead, we define asynchronous server functions that can be called directly from our components.

```typescript
export default function Form() {
  // Action
  async function action(formData: FormData) {
    'use server';

    // Logic to mutate data...
  }

  // Invoke the action using the "action" attribute
  return <form action={action}>...</form>;
}
```

For the complete code, please see: [app/ui/form/index.tsx](./app/ui/form/index.tsx)

An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript is disabled on the client.

### Validating data

To handle type validation, we'll use [Zod](https://zod.dev/), a TypeScript-first validation library that can simplify this task for us.

We define a schema that matches the shape of our form object. This schema will validate the `formData` before saving it to the database.

```typescript
'use server';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, 'Please enter the first name.'),
  last_name: z.string().min(1, 'Please enter the last name.'),
  job: z.string().min(1, 'Please enter the job.'),
  description: z.string().min(1, 'Please enter the description.'),
});

const AddContact = FormSchema.omit({ id: true });

export async function addContact(formData: FormData) {
  const validatedFields = AddContact.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    job: formData.get('job'),
    description: formData.get('description'),
  });

  // ...
}
```

The code can be found at: [app/lib/actions.ts](./app/lib/actions.ts)

### Revalidating cached data

When a form is submitted, the Server Action can update cached data and revalidate any cache keys that should change. Further, the browser does not need to refresh on form submission. In a single network roundtrip, Next.js can return both the updated UI and the refreshed data.

```typescript
'use server';

import { revalidatePath } from 'next/cache';

export default async function submit() {
  await submitForm();
  revalidatePath('/');
}
```

## Challenges

### Displaying loading state

Use the `useFormStatus` hook to show a loading state when a form is submitting on the server. The `useFormStatus` hook can only be used as a child of a `form` element using a Server Action.

```typescript
'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Save
    </button>
  );
}
```

### Displaying messages

```typescript
'use server';

export async function addContact(prevState: State, formData: FormData) {
  // ...

  try {
    await sql``;
    revalidatePath('/');
    return { success: true, message: 'New contact added.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to create contact.',
    };
  }
}
```

Use the `useFormState` hook to read the state and display messages.

```typescript
'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/app/hooks/useToast';

export default function Form({ action }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success && state.message) {
      toast({ message: state.message });
    }
  }, [state.message, state.success, toast]);

  return <form action={dispatch}>...</form>;
}
```
