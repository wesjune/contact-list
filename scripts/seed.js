const { db } = require('@vercel/postgres');
const dummyContacts = require('../app/lib/dummy-contacts.json');

async function seedContacts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        job VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "contacts" table`);

    const contacts = await Promise.all(
      dummyContacts.map(async user => {
        const { id, first_name, last_name, job, description } = user;

        return client.sql`
        INSERT INTO contacts (id, first_name, last_name, job, description)
        VALUES (${id}, ${first_name}, ${last_name}, ${job}, ${description})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${contacts.length} contacts`);

    return { createTable, contacts };
  } catch (error) {
    console.error('Error seeding contacts:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedContacts(client);
  await client.end();
}

main().catch(err => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
