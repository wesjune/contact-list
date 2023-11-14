# Contact List

This is a simple contact list application that allows users to perform basic CRUD (Create, Read, Update, Delete) operations on a list of contacts. The application is built using Next.js, and it is responsive for both desktop and mobile devices. It includes features such as sorting contacts, confirmation messages for CRUD operations, and form data validation.

For project details, please see: [Introduction](./introduction.md)

## Getting Started

To run this application locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/wesjune/contact-list.git
```

Navigate to the project directory:

```bash
cd contact-list
```

Install the project dependencies:

```bash
npm install
```

Add a `.env` file to the root of the project:

```
POSTGRES_URL="************"
POSTGRES_PRISMA_URL="************"
POSTGRES_URL_NON_POOLING="************"
POSTGRES_USER="************"
POSTGRES_HOST="************"
POSTGRES_PASSWORD="************"
POSTGRES_DATABASE="************"
```

Start the development server:

```bash
npm run dev
```

Open your web browser and access the application at [http://localhost:3000](http://localhost:3000).
